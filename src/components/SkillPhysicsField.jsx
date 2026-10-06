import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Pause, Play, RotateCcw, LayoutGrid } from 'lucide-react';
import { clamp, createCategoryCenters, createSkillBodies, slingshotVelocity, stepSkillBodies } from './skillPhysics';
import reactLogo from '../assets/skills/react.png';
import typescriptLogo from '../assets/skills/typescript.png';
import htmlLogo from '../assets/skills/html.png';
import cssLogo from '../assets/skills/css.png';
import figmaLogo from '../assets/skills/figma.png';

const skillLogos = { React: reactLogo, 'React Native': reactLogo, TypeScript: typescriptLogo, HTML: htmlLogo, CSS: cssLogo, Figma: figmaLogo };

export function SkillPhysicsField({ groups, children }) {
  const hostRef = useRef(null);
  const apiRef = useRef(null);
  const [desktop, setDesktop] = useState(false);
  const [cards, setCards] = useState(false);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(min-width: 801px) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    const update = () => setDesktop(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  useEffect(() => { apiRef.current?.pause(paused); }, [paused, ready]);
  const enabled = desktop && !cards && !failed;
  useEffect(() => {
    if (!enabled) return;
    const host = hostRef.current;
    let dispose = null;
    let cancelled = false;
    let inView = false;
    setReady(false);
    const initialize = async () => {
      try {
        const THREE = await import('three');
        await Promise.race([
          document.fonts.load('600 80px "Space Grotesk"').catch(() => {}),
          new Promise(resolve => setTimeout(resolve, 1500)),
        ]);
        if (cancelled) return;
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
        renderer.setClearColor(0x0c0c10, 0);
        renderer.domElement.setAttribute('aria-label', 'Interactive 3D skills: pull and release ninja stars around five category gravity centers');
        renderer.domElement.setAttribute('role', 'img');
        host.appendChild(renderer.domElement);
        const scene = new THREE.Scene();
        const bounds = { width: 22, height: 10 };
        const camera = new THREE.OrthographicCamera(-11, 11, 5, -5, .1, 100);
        camera.position.set(0, 0, 20);
        const ambient = new THREE.HemisphereLight(0xdad7ff, 0x151020, 2.5);
        const keyLight = new THREE.DirectionalLight(0xffffff, 3);
        keyLight.position.set(-4, 7, 10);
        const redLight = new THREE.PointLight(0xff3355, 35, 30);
        redLight.position.set(8, -2, 6);
        scene.add(ambient, keyLight, redLight);
        let bodies = createSkillBodies(groups, bounds);
        let centers = createCategoryCenters(groups, bounds);
        const starShape = new THREE.Shape();
        [[0,1],[.31,.31],[1,.53],[.68,-.31],[1,-1],[.01,-.7],[-.8,-1],[-.53,-.05],[-1,.73],[-.25,.48]].forEach(([x,y],index) => {
          if (index === 0) starShape.moveTo(x,y); else starShape.lineTo(x,y);
        });
        starShape.closePath();
        const hole = new THREE.Path();
        hole.absarc(0,0,.16,0,Math.PI*2,true);
        starShape.holes.push(hole);
        const starGeometry = new THREE.ExtrudeGeometry(starShape,{ depth:.18, bevelEnabled:true, bevelSegments:2, steps:1, bevelSize:.04, bevelThickness:.04 });
        const coreGeometry = new THREE.SphereGeometry(1, 28, 20);
        const resources = [starGeometry, coreGeometry];
        const logoTextures = new Map();
        const textureLoader = new THREE.TextureLoader();
        const meshes = bodies.map((body, index) => {
          const material = new THREE.MeshPhysicalMaterial({ color: body.color, metalness: .45, roughness: .28, clearcoat: .8, emissive: body.color, emissiveIntensity: .08 });
          resources.push(material);
          const mesh = new THREE.Mesh(starGeometry, material);
          mesh.scale.setScalar(body.radius);
          mesh.userData.index = index;
          scene.add(mesh);
          const canvas = document.createElement('canvas');
          canvas.width = 512;
          canvas.height = 256;
          const context = canvas.getContext('2d');
          context.textAlign = 'center';
          context.textBaseline = 'middle';
          context.font = '600 80px "Space Grotesk", sans-serif';
          context.fillStyle = '#fff8f3';
          context.shadowColor = '#08080d';
          context.shadowBlur = 9;
          const words = body.title.split(' ');
          const lines = [''];
          words.forEach(word => {
            const last = lines.length - 1;
            if ((lines[last] + ' ' + word).trim().length > 12 && lines[last]) lines.push(word);
            else lines[last] = (lines[last] + ' ' + word).trim();
          });
          context.shadowBlur = 0;
          context.fillStyle = '#0c0c10e8';
          const labelHeight = lines.length > 1 ? 194 : 110;
          context.beginPath();
          context.roundRect(8, (256 - labelHeight) / 2, 496, labelHeight, 28);
          context.fill();
          context.fillStyle = '#fff8f3';
          lines.forEach((line, row) => {
            context.font = '600 80px "Space Grotesk", sans-serif';
            const fontSize = Math.min(80, 80 * 460 / Math.max(context.measureText(line).width, 1));
            context.font = `600 ${fontSize}px "Space Grotesk", sans-serif`;
            context.fillText(line, 256, 128 + (row - (lines.length - 1) / 2) * 82);
          });
          const texture = new THREE.CanvasTexture(canvas);
          texture.colorSpace = THREE.SRGBColorSpace;
          const labelMaterial = new THREE.SpriteMaterial({ map: texture, depthTest: false });
          const label = new THREE.Sprite(labelMaterial);
          label.scale.set(body.radius * 3, body.radius * 1.5, 1);
          label.renderOrder = 2;
          scene.add(label);
          resources.push(texture, labelMaterial);
          let logo = null;
          const logoPath = skillLogos[body.title];
          if (logoPath) {
            if (!logoTextures.has(logoPath)) {
              const logoTexture = textureLoader.load(logoPath);
              logoTexture.colorSpace = THREE.SRGBColorSpace;
              logoTextures.set(logoPath, logoTexture);
              resources.push(logoTexture);
            }
            const logoMaterial = new THREE.SpriteMaterial({ map: logoTextures.get(logoPath), depthTest: false });
            logo = new THREE.Sprite(logoMaterial);
            logo.scale.set(body.radius * 1.05, body.radius * 1.05, 1);
            logo.renderOrder = 4;
            scene.add(logo);
            resources.push(logoMaterial);
          }
          return { mesh, label, logo };
        });
        const coreMeshes = centers.map(center => {
          const material = new THREE.MeshPhysicalMaterial({ color:center.color, metalness:.35, roughness:.3, clearcoat:.8, emissive:center.color, emissiveIntensity:.12 });
          const mesh = new THREE.Mesh(coreGeometry,material);
          mesh.scale.setScalar(center.radius);
          scene.add(mesh);
          const canvas = document.createElement('canvas');
          canvas.width = 512; canvas.height = 256;
          const context = canvas.getContext('2d');
          context.textAlign = 'center'; context.textBaseline = 'middle';
          context.font = '700 64px "Space Grotesk", sans-serif'; context.fillStyle = '#fff8f4';
          context.shadowColor = '#08080d'; context.shadowBlur = 12;
          const lines = center.title.replace('Frameworks & Libraries','Frameworks|& Libraries').replace('Databases & Auth','Databases|& Auth').replace('Tools & Practices','Tools &|Practices').split('|');
          lines.forEach((line,index) => context.fillText(line,256,128 + (index-(lines.length-1)/2)*72));
          const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace;
          const labelMaterial = new THREE.SpriteMaterial({ map:texture, depthTest:false });
          const label = new THREE.Sprite(labelMaterial);
          label.scale.set(2.3,1.15,1); label.renderOrder = 3;
          scene.add(label);
          const ringGeometry = new THREE.TorusGeometry(center.radius + .14,.025,8,64);
          const ringMaterial = new THREE.MeshBasicMaterial({ color:center.color, transparent:true, opacity:.5 });
          const ring = new THREE.Mesh(ringGeometry,ringMaterial);
          scene.add(ring);
          resources.push(material,texture,labelMaterial,ringGeometry,ringMaterial);
          return {mesh,label,ring};
        });
        const tetherGeometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(),new THREE.Vector3()]);
        const tetherMaterial = new THREE.LineBasicMaterial({color:0xff4259,transparent:true,opacity:.8});
        const tether = new THREE.Line(tetherGeometry,tetherMaterial); tether.visible = false; scene.add(tether);
        resources.push(tetherGeometry,tetherMaterial);
        const raycaster = new THREE.Raycaster();
        const pointer = new THREE.Vector2();
        const worldPointer = new THREE.Vector3();
        const dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
        let dragged = -1;
        let mouse = null;
        let isPaused = false;
        let throwVelocity = { x: 0, y: 0 };
        let lastDragTime = 0;
        let dragOffset = { x: 0, y: 0 };
        let slingOrigin = { x: 0, y: 0 };
        const updatePointer = event => {
          const rect = renderer.domElement.getBoundingClientRect();
          pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1);
          raycaster.setFromCamera(pointer, camera);
          raycaster.ray.intersectPlane(dragPlane, worldPointer);
          mouse = { x: worldPointer.x, y: worldPointer.y };
        };
        const pointerDown = event => {
          if (event.button !== 0) return;
          updatePointer(event);
          // Include the center hole so the logo is also an easy place to grab a star.
          const hit = bodies.map((body, index) => ({ index, distance: Math.hypot(body.x - mouse.x, body.y - mouse.y) }))
            .filter(item => item.distance <= bodies[item.index].radius * 1.15)
            .sort((a, b) => a.distance - b.distance)[0];
          if (!hit) return;
          dragged = hit.index;
          slingOrigin = { x:bodies[dragged].x, y:bodies[dragged].y };
          dragOffset = { x: bodies[dragged].x - mouse.x, y: bodies[dragged].y - mouse.y };
          bodies[dragged].vx = bodies[dragged].vy = 0;
          throwVelocity = { x: 0, y: 0 };
          lastDragTime = performance.now();
          renderer.domElement.setPointerCapture(event.pointerId);
          host.dataset.dragging = bodies[dragged].title;
          host.dataset.interactions = String(Number(host.dataset.interactions || 0) + 1);
          host.style.cursor = 'grabbing';
        };
        const pointerMove = event => {
          updatePointer(event);
          if (dragged < 0) return;
          const body = bodies[dragged];
          const now = performance.now();
          const dt = Math.max((now - lastDragTime) / 1000, 1 / 120);
          const x = clamp(mouse.x + dragOffset.x, -bounds.width / 2 + body.radius, bounds.width / 2 - body.radius);
          const y = clamp(mouse.y + dragOffset.y, -bounds.height / 2 + body.radius, bounds.height / 2 - body.radius);
          throwVelocity = { x: clamp((x - body.x) / dt, -12, 12), y: clamp((y - body.y) / dt, -12, 12) };
          body.x = x;
          body.y = y;
          lastDragTime = now;
        };
        const release = event => {
          if (dragged >= 0) {
            const launch = slingshotVelocity(bodies[dragged],slingOrigin);
            const stretched = Math.hypot(bodies[dragged].x-slingOrigin.x,bodies[dragged].y-slingOrigin.y) > .25;
            const recent = performance.now() - lastDragTime < 140;
            bodies[dragged].vx = stretched ? launch.x : recent ? throwVelocity.x : 0;
            bodies[dragged].vy = stretched ? launch.y : recent ? throwVelocity.y : 0;
            host.dataset.lastReleased = bodies[dragged].title;
            host.dataset.throwSpeed = String(Math.hypot(bodies[dragged].vx, bodies[dragged].vy).toFixed(2));
          }
          dragged = -1;
          delete host.dataset.dragging;
          host.style.cursor = 'grab';
          if (renderer.domElement.hasPointerCapture(event.pointerId)) renderer.domElement.releasePointerCapture(event.pointerId);
        };
        const leave = () => { mouse = null; };
        const events = [['pointerdown', pointerDown], ['pointermove', pointerMove], ['pointerup', release], ['pointercancel', release], ['lostpointercapture', release], ['pointerleave', leave]];
        events.forEach(([name, listener]) => renderer.domElement.addEventListener(name, listener));
        const resize = () => {
          const width = host.clientWidth;
          const height = host.clientHeight;
          if (!width || !height) return;
          bounds.width = 22;
          bounds.height = 22 * height / width;
          const nextCenters = createCategoryCenters(groups,bounds);
          bodies.forEach(body => {
            body.x += nextCenters[body.categoryIndex].x - centers[body.categoryIndex].x;
            body.y += nextCenters[body.categoryIndex].y - centers[body.categoryIndex].y;
          });
          centers = nextCenters;
          camera.left = -bounds.width / 2;
          camera.right = bounds.width / 2;
          camera.top = bounds.height / 2;
          camera.bottom = -bounds.height / 2;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        };
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(host);
        resize();
        bodies = createSkillBodies(groups, bounds);
        centers = createCategoryCenters(groups,bounds);
        apiRef.current = {
          pause: value => { isPaused = value; },
          reset: () => { centers = createCategoryCenters(groups,bounds); bodies = createSkillBodies(groups, bounds); dragged = -1; delete host.dataset.dragging; host.style.cursor = 'grab'; },
        };
        let previousTime = 0;
        let accumulator = 0;
        let frame = 0;
        const animate = time => {
          frame = requestAnimationFrame(animate);
          const dt = previousTime ? Math.min((time - previousTime) / 1000, .05) : 0;
          previousTime = time;
          if (!inView || document.hidden) return;
          if (!isPaused) {
            accumulator += dt;
            while (accumulator >= 1 / 120) {
              stepSkillBodies(bodies, bounds, 1 / 120, { dragged, mouse, centers });
              accumulator -= 1 / 120;
            }
          }
          bodies.forEach((body, index) => {
            meshes[index].mesh.position.set(body.x, body.y, 0);
            meshes[index].label.position.set(body.x, body.y - body.radius * 1.13, .6);
            meshes[index].logo?.position.set(body.x, body.y + body.radius * .06, .8);
            meshes[index].mesh.material.emissiveIntensity = index === dragged ? .4 : .08;
            if (!isPaused && index !== dragged) meshes[index].mesh.rotation.z += dt * (.18 + index % 3 * .08);
          });
          coreMeshes.forEach((core,index) => {
            core.mesh.position.set(centers[index].x,centers[index].y,-.4);
            core.label.position.set(centers[index].x,centers[index].y,.7);
            core.ring.position.set(centers[index].x,centers[index].y,0);
          });
          tether.visible = dragged >= 0;
          if (dragged >= 0) {
            const positions = tether.geometry.attributes.position;
            positions.setXYZ(0,slingOrigin.x,slingOrigin.y,.3);
            positions.setXYZ(1,bodies[dragged].x,bodies[dragged].y,.3);
            positions.needsUpdate = true;
          }
          renderer.render(scene, camera);
        };
        host.dataset.ballCount = String(bodies.length);
        host.dataset.categoryCount = String(centers.length);
        host.dataset.logoCount = String(meshes.filter(item => item.logo).length);
        host.dataset.mode = 'slingshot';
        host.dataset.ready = 'true';
        frame = requestAnimationFrame(animate);
        setReady(true);
        const contextLost = event => { event.preventDefault(); setFailed(true); };
        renderer.domElement.addEventListener('webglcontextlost', contextLost);
        dispose = () => {
          cancelAnimationFrame(frame);
          resizeObserver.disconnect();
          events.forEach(([name, listener]) => renderer.domElement.removeEventListener(name, listener));
          renderer.domElement.removeEventListener('webglcontextlost', contextLost);
          resources.forEach(resource => resource.dispose());
          renderer.dispose();
          renderer.forceContextLoss();
          renderer.domElement.remove();
          apiRef.current = null;
        };
      } catch {
        if (!cancelled) setFailed(true);
      }
    };
    let started = false;
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView && !started) { started = true; initialize(); }
    }, { rootMargin: '150px' });
    observer.observe(host);
    return () => { cancelled = true; observer.disconnect(); dispose?.(); };
  }, [enabled, groups]);

  return <div className="sp-skills-interactive">
    {desktop && !failed && <div className="sp-physics-toolbar"><p>{cards ? 'Your toolkit, organized by discipline.' : 'Pull a ninja star. Release to launch. Each category pulls its skills home.'}</p><div>{!cards && <><button onClick={() => setPaused(!paused)} aria-label={paused ? 'Resume skill physics' : 'Pause skill physics'}>{paused ? <Play size={14} /> : <Pause size={14} />}{paused ? 'Resume' : 'Pause'}</button><button onClick={() => apiRef.current?.reset()}><RotateCcw size={14} /> Reset</button></>}<button onClick={() => setCards(!cards)}><LayoutGrid size={14} /> {cards ? '3D playground' : 'Skill cards'}</button></div></div>}
    {enabled ? <><div ref={hostRef} className="sp-physics-field">{!ready && <span className="sp-physics-loading">Preparing the skill playground…</span>}</div><div className="sp-physics-legend">{groups.map(group => <span key={group.genre}><i style={{ background: group.themeColor }} />{group.genre}</span>)}</div></> : children}
  </div>;
}
SkillPhysicsField.propTypes = { groups: PropTypes.array.isRequired, children: PropTypes.node.isRequired };
