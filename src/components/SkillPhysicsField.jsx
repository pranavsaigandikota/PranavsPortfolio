import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { RotateCcw, LayoutGrid, Crosshair } from 'lucide-react';
import skillLogos from '../data/skillLogos.json';
import { POOL, pockets, createPoolBalls, ballsMoving, shootCue, stepPool } from './poolPhysics';

export function SkillPhysicsField({ groups, children }) {
  const hostRef = useRef(null), apiRef = useRef(null);
  const [desktop,setDesktop] = useState(false), [cards,setCards] = useState(false);
  const [ready,setReady] = useState(false), [failed,setFailed] = useState(false);
  const [collected,setCollected] = useState([]), [shots,setShots] = useState(0);
  const [power,setPower] = useState(0), [message,setMessage] = useState('Every pocket sorts the skill into its category.');
  const [moving,setMoving] = useState(false);
  useEffect(() => {
    const query=window.matchMedia('(min-width: 801px) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    const update=()=>setDesktop(query.matches); update();
    query.addEventListener('change',update); return()=>query.removeEventListener('change',update);
  },[]);
  const enabled=desktop && !cards && !failed;
  useEffect(() => {
    if(!enabled) return;
    const host=hostRef.current;
    let cancelled=false, inView=false, started=false, dispose=null;
    setReady(false); setCollected([]); setShots(0); setPower(0); setMoving(false);
    const initialize=async()=>{
      let renderer;
      const resources=[];
      try {
        const THREE=await import('three');
        await Promise.race([document.fonts.load('600 64px "Space Grotesk"').catch(()=>{}),new Promise(resolve=>setTimeout(resolve,1500))]);
        if(cancelled) return;
        renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});
        renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));
        renderer.domElement.setAttribute('role','img');
        renderer.domElement.setAttribute('aria-label','Skill pool table. Drag back from the white cue ball and release to shoot. Arrow keys aim and Space shoots.');
        renderer.domElement.tabIndex=0; host.appendChild(renderer.domElement);
        const scene=new THREE.Scene(), camera=new THREE.OrthographicCamera(-POOL.width/2,POOL.width/2,POOL.height/2,-POOL.height/2,.1,100);
        camera.position.z=20;
        scene.add(new THREE.HemisphereLight(0xffffff,0x111118,2.2));
        const light=new THREE.DirectionalLight(0xffffff,3); light.position.set(-5,8,10); scene.add(light);
        const own=resource=>{resources.push(resource);return resource;};
        const plane=own(new THREE.PlaneGeometry(22,11));
        const rail=new THREE.Mesh(plane,own(new THREE.MeshBasicMaterial({color:0x281117}))); rail.position.z=-1; scene.add(rail);
        const felt=new THREE.Mesh(own(new THREE.PlaneGeometry(20.2,9.2)),own(new THREE.MeshBasicMaterial({color:0x152125}))); felt.position.z=-.9; scene.add(felt);
        const trimMaterial=own(new THREE.MeshBasicMaterial({color:0x8b3545}));
        [[0,4.98,20.8,.08],[0,-4.98,20.8,.08],[-10.49,0,.08,9.95],[10.49,0,.08,9.95]].forEach(([x,y,w,h])=>{
          const trim=new THREE.Mesh(own(new THREE.PlaneGeometry(w,h)),trimMaterial); trim.position.set(x,y,-.85); scene.add(trim);
        });
        const holeGeometry=own(new THREE.CircleGeometry(.67,40)), holeMaterial=own(new THREE.MeshBasicMaterial({color:0x050609}));
        const rimGeometry=own(new THREE.RingGeometry(.67,.76,40)), rimMaterial=own(new THREE.MeshBasicMaterial({color:0x845365}));
        pockets.forEach(([x,y])=>{
          const hole=new THREE.Mesh(holeGeometry,holeMaterial); hole.position.set(x,y,-.5); scene.add(hole);
          const rim=new THREE.Mesh(rimGeometry,rimMaterial); rim.position.set(x,y,-.51); scene.add(rim);
        });
        // Quiet rail diamonds and a crimson center mark keep the theme restrained.
        const diamondGeometry=own(new THREE.CircleGeometry(.055,4)), diamondMaterial=own(new THREE.MeshBasicMaterial({color:0xb69b94}));
        [-7,-3.5,3.5,7].forEach(x=>[-5.17,5.17].forEach(y=>{const mark=new THREE.Mesh(diamondGeometry,diamondMaterial);mark.position.set(x,y,-.4);scene.add(mark);}));
        const centerMark=new THREE.Mesh(own(new THREE.RingGeometry(.25,.28,4)),own(new THREE.MeshBasicMaterial({color:0x783442,transparent:true,opacity:.45}))); centerMark.position.set(-3,0,-.7); scene.add(centerMark);
        let balls=createPoolBalls(groups);
        const geometry=own(new THREE.SphereGeometry(.4,24,16)), plateGeometry=own(new THREE.CircleGeometry(.17,32));
        const plateMaterial=own(new THREE.MeshBasicMaterial({color:0xfffaf2})), textureLoader=new THREE.TextureLoader(), textures=new Map();
        const spriteFromCanvas=(canvas,width,height)=>{
          const texture=own(new THREE.CanvasTexture(canvas)); texture.colorSpace=THREE.SRGBColorSpace;
          const sprite=new THREE.Sprite(own(new THREE.SpriteMaterial({map:texture,depthTest:false})));
          sprite.scale.set(width,height,1); sprite.renderOrder=3; scene.add(sprite); return sprite;
        };
        const visuals=balls.map(ball=>{
          const material=own(new THREE.MeshPhysicalMaterial({color:ball.cue ? '#f8f4ec' : ball.color,roughness:.2,metalness:.05,clearcoat:1}));
          const mesh=new THREE.Mesh(geometry,material); scene.add(mesh);
          if(ball.cue) return {mesh};
          const plate=new THREE.Mesh(plateGeometry,plateMaterial); scene.add(plate);
          let logo;
          const logoPath=ball.title==='SQL' ? null : skillLogos[ball.title];
          if(logoPath){
            if(!textures.has(logoPath)){
              const texture=own(textureLoader.load(logoPath)); texture.colorSpace=THREE.SRGBColorSpace; textures.set(logoPath,texture);
            }
            logo=new THREE.Sprite(own(new THREE.SpriteMaterial({map:textures.get(logoPath),depthTest:false})));
            logo.scale.set(.27,.27,1); logo.renderOrder=4; scene.add(logo);
          }
          const canvas=document.createElement('canvas');canvas.width=512;canvas.height=256;
          const context=canvas.getContext('2d');context.textAlign='center';context.textBaseline='middle';
          const lines=[''];ball.title.split(' ').forEach(word=>{const last=lines.length-1;if((lines[last]+' '+word).trim().length>12&&lines[last]) lines.push(word);else lines[last]=(lines[last]+' '+word).trim();});
          context.fillStyle='#fffaf4';context.shadowColor='#08090c';context.shadowBlur=12;context.shadowOffsetY=3;
          lines.forEach((line,row)=>{context.font='700 110px "Space Grotesk",sans-serif';const size=Math.min(110,110*490/Math.max(1,context.measureText(line).width));context.font=`700 ${size}px "Space Grotesk",sans-serif`;context.fillText(line,256,128+(row-(lines.length-1)/2)*95);});
          const label=spriteFromCanvas(canvas,.92,.46);
          if(!logo){scene.remove(plate);}
          return {mesh,plate,logo,label};
        });
        const aim=new THREE.Line(own(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(),new THREE.Vector3()])),own(new THREE.LineDashedMaterial({color:0xf3c2b1,dashSize:.13,gapSize:.13,transparent:true,opacity:.8})));
        aim.visible=false;scene.add(aim);
        const cueStick=new THREE.Line(own(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(),new THREE.Vector3()])),own(new THREE.LineBasicMaterial({color:0xc79875}))); cueStick.visible=false;scene.add(cueStick);
        const raycaster=new THREE.Raycaster(), pointer=new THREE.Vector2(), point=new THREE.Vector3(), dragPlane=new THREE.Plane(new THREE.Vector3(0,0,1),0);
        let dragging=false,pull={x:0,y:0},keyboardAngle=0;
        const getPoint=event=>{
          const rect=renderer.domElement.getBoundingClientRect();pointer.set((event.clientX-rect.left)/rect.width*2-1,-(event.clientY-rect.top)/rect.height*2+1);
          raycaster.setFromCamera(pointer,camera);raycaster.ray.intersectPlane(dragPlane,point);return point;
        };
        const launch=vector=>{
          if(ballsMoving(balls)||balls[0].pocketed) return;
          if(shootCue(balls[0],vector)){setShots(value=>value+1);setMoving(true);setMessage('Shot in play. Skills collect automatically when pocketed.');host.dataset.shots=String(Number(host.dataset.shots||0)+1);}
        };
        const down=event=>{
          if(event.button!==0 || ballsMoving(balls) || balls[0].pocketed) return;
          getPoint(event);
          if(Math.hypot(point.x-balls[0].x,point.y-balls[0].y)>.65){setMessage('Start your shot on the white cue ball.');return;}
          dragging=true;pull={x:0,y:0};renderer.domElement.focus();renderer.domElement.setPointerCapture(event.pointerId);host.style.cursor='grabbing';
        };
        const move=event=>{if(!dragging) return;getPoint(event);pull={x:point.x-balls[0].x,y:point.y-balls[0].y};setPower(Math.round(Math.min(Math.hypot(pull.x,pull.y)/4,1)*100));};
        const finish=event=>{
          if(!dragging) return;dragging=false;if(event.type==='pointerup') launch(pull);setPower(0);host.style.cursor='crosshair';
          if(renderer.domElement.hasPointerCapture(event.pointerId)) renderer.domElement.releasePointerCapture(event.pointerId);
        };
        const keyboard=event=>{
          if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();keyboardAngle+=(event.key==='ArrowLeft'?1:-1)*Math.PI/18;setMessage(`Aim: ${Math.round(keyboardAngle*180/Math.PI)}°. Press Space to shoot.`);}
          if(event.code==='Space'){event.preventDefault();launch({x:-Math.cos(keyboardAngle)*3,y:-Math.sin(keyboardAngle)*3});}
        };
        const events=[['pointerdown',down],['pointermove',move],['pointerup',finish],['pointercancel',finish],['lostpointercapture',finish],['keydown',keyboard]];
        events.forEach(([name,listener])=>renderer.domElement.addEventListener(name,listener));
        const resize=()=>renderer.setSize(host.clientWidth,host.clientHeight);
        const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(host);resize();
        apiRef.current={break:()=>launch({x:-4,y:0}),reset:()=>{balls=createPoolBalls(groups);dragging=false;setCollected([]);setShots(0);setPower(0);setMoving(false);setMessage('Fresh rack. Drag back from the white cue ball to shoot.');host.dataset.pocketCount='0';host.dataset.shots='0';}};
        let previous=0,accumulator=0,frame=0,wasMoving=false;
        const animate=time=>{
          frame=requestAnimationFrame(animate);const dt=previous?Math.min((time-previous)/1000,.05):0;previous=time;
          if(!inView||document.hidden) return;
          accumulator+=dt;const pocketed=[],cueWasPocketed=balls[0].pocketed;
          while(accumulator>=1/120){stepPool(balls,1/120,ball=>pocketed.push(ball));accumulator-=1/120;}
          if(pocketed.length){
            const skills=pocketed.filter(ball=>!ball.cue);if(skills.length){setCollected(old=>[...old,...skills.map(ball=>ball.title)]);setMessage(`${skills.at(-1).title} collected in ${skills.at(-1).category}.`);host.dataset.lastPocket=skills.at(-1).title;}
            else setMessage('Cue ball pocketed. It returns when the table settles.');
          }
          if(cueWasPocketed&&!balls[0].pocketed) setMessage('Cue ball returned. Ready for your next shot.');
          balls.forEach((ball,index)=>{
            const visual=visuals[index];Object.values(visual).filter(Boolean).forEach(item=>{item.visible=!ball.pocketed;});
            visual.mesh.position.set(ball.x,ball.y,0);
            // Logos are separate camera-facing sprites: motion never spins them away.
            visual.plate?.position.set(ball.x,ball.y+.15,.41);visual.logo?.position.set(ball.x,ball.y+.15,.45);visual.label?.position.set(ball.x,ball.y-(visual.logo ? .14 : 0),.46);
          });
          host.dataset.pocketCount=String(balls.filter(ball=>!ball.cue&&ball.pocketed).length);const isMoving=ballsMoving(balls);host.dataset.moving=String(isMoving);if(wasMoving!==isMoving){wasMoving=isMoving;setMoving(isMoving);}
          aim.visible=cueStick.visible=dragging&&Math.hypot(pull.x,pull.y)>.1;
          if(aim.visible){
            const length=Math.hypot(pull.x,pull.y),x=pull.x/length,y=pull.y/length,cue=balls[0];
            aim.geometry.attributes.position.setXYZ(0,cue.x,cue.y,.45);aim.geometry.attributes.position.setXYZ(1,cue.x-x*4,cue.y-y*4,.45);aim.geometry.attributes.position.needsUpdate=true;aim.computeLineDistances();
            cueStick.geometry.attributes.position.setXYZ(0,cue.x+x*.5,cue.y+y*.5,.45);cueStick.geometry.attributes.position.setXYZ(1,cue.x+x*(1.6+Math.min(length,3)),cue.y+y*(1.6+Math.min(length,3)),.45);cueStick.geometry.attributes.position.needsUpdate=true;
          }
          renderer.render(scene,camera);
        };
        host.dataset.mode='pool';host.dataset.ballCount=String(balls.length-1);host.dataset.logoCount=String(balls.filter(ball=>skillLogos[ball.title]&&ball.title!=='SQL').length);host.dataset.ready='true';
        frame=requestAnimationFrame(animate);setReady(true);
        const contextLost=event=>{event.preventDefault();setFailed(true);};renderer.domElement.addEventListener('webglcontextlost',contextLost);
        dispose=()=>{cancelAnimationFrame(frame);resizeObserver.disconnect();events.forEach(([name,listener])=>renderer.domElement.removeEventListener(name,listener));renderer.domElement.removeEventListener('webglcontextlost',contextLost);resources.forEach(resource=>resource.dispose());renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();apiRef.current=null;};
      } catch { resources.forEach(resource=>resource.dispose());renderer?.dispose();renderer?.domElement.remove();if(!cancelled) setFailed(true); }
    };
    const observer=new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;if(inView&&!started){started=true;initialize();}},{rootMargin:'150px'});
    observer.observe(host);return()=>{cancelled=true;observer.disconnect();dispose?.();};
  },[enabled,groups]);
  const total=groups.reduce((sum,group)=>sum+group.items.length,0);
  return <div className="sp-skills-interactive">
    {desktop&&!failed&&<div className="sp-physics-toolbar"><div><p>{cards?'Your toolkit, organized by discipline.':'Drag back from the white cue ball. Release to shoot.'}</p>{!cards&&<span className="sp-pool-meta">{collected.length} / {total} collected · {shots} {shots===1?'shot':'shots'} · Arrow keys aim, Space shoots</span>}</div><div>{!cards&&<><button disabled={!ready||moving} onClick={()=>apiRef.current?.break()}><Crosshair size={14}/> Break</button><button onClick={()=>apiRef.current?.reset()}><RotateCcw size={14}/> Reset</button></>}<button onClick={()=>setCards(!cards)}><LayoutGrid size={14}/>{cards?'Pool table':'Skill cards'}</button></div></div>}
    {enabled?<><div ref={hostRef} className="sp-physics-field sp-pool-table">{!ready&&<span className="sp-physics-loading">Preparing the skill table…</span>}</div><div className="sp-pool-status"><p aria-live="polite">{collected.length===total?'Table cleared. Your full toolkit, collected.':message}</p><span>POWER <meter min="0" max="100" value={power} aria-label="Shot power"/></span></div><div className="sp-pool-collections">{groups.map(group=><article key={group.genre} style={{'--skill-color':group.themeColor}}><h3><i/>{group.genre}<span>{group.items.filter(item=>collected.includes(item.title)).length}/{group.items.length}</span></h3><div>{group.items.filter(item=>collected.includes(item.title)).map(item=><div key={item.title} className="sp-collected-skill"><span className="sp-collected-ball">{skillLogos[item.title]&&item.title!=='SQL'&&<img src={skillLogos[item.title]} alt=""/>}</span><span>{item.title}</span></div>)}{!group.items.some(item=>collected.includes(item.title))&&<p className="sp-pool-empty">Pocket a ball to collect its skill.</p>}</div></article>)}</div></>:children}
  </div>;
}
SkillPhysicsField.propTypes={groups:PropTypes.array.isRequired,children:PropTypes.node.isRequired};
