import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import { useEffect, useMemo, useRef, useState } from 'react';
import './editorial-effects.css';

const waveColors = ['#ff3d71', '#36e0ff', '#ffd166'];

function usePointer() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (event) => {
      setPointer({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  return pointer;
}

function Wave({ index, pointer }) {
  const lineRef = useRef(null);
  const points = useMemo(() => Array.from({ length: 96 }, () => new THREE.Vector3()), []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    points.forEach((point, pointIndex) => {
      const x = (pointIndex / 95) * 15 - 7.5;
      point.set(
        x + pointer.x * 0.12 * (index - 1),
        Math.sin(x * 0.82 + time * 0.38 + index * 0.45) * 0.34 + pointer.y * 0.18 + (index - 1) * 0.13,
        -1.5 + index * 0.08,
      );
    });
    lineRef.current?.geometry.setFromPoints(points);
  });

  return <Line ref={lineRef} points={points} color={waveColors[index]} lineWidth={index === 1 ? 1.1 : 0.7} transparent opacity={0.24} />;
}

function CursorTrail({ pointer }) {
  const lines = [useRef(null), useRef(null), useRef(null)];
  const trail = useRef(Array.from({ length: 22 }, () => new THREE.Vector3()));

  useFrame(() => {
    const target = new THREE.Vector3(pointer.x * 6.8, pointer.y * 3.8, 0);
    trail.current[0].lerp(target, 0.12);
    for (let index = 1; index < trail.current.length; index += 1) {
      trail.current[index].lerp(trail.current[index - 1], 0.16);
    }
    lines.forEach((line, lineIndex) => {
      const offset = (lineIndex - 1) * 0.045;
      const points = trail.current.map((point) => new THREE.Vector3(point.x + offset, point.y - offset, point.z));
      line.current?.geometry.setFromPoints(points);
    });
  });

  return (
    <>
      <Line ref={lines[0]} points={trail.current} color="#ff3d71" lineWidth={1.1} transparent opacity={0.3} />
      <Line ref={lines[1]} points={trail.current} color="#ffffff" lineWidth={0.8} transparent opacity={0.24} />
      <Line ref={lines[2]} points={trail.current} color="#36e0ff" lineWidth={1.1} transparent opacity={0.3} />
    </>
  );
}

function Scene() {
  const pointer = usePointer();
  return (
    <>
      {waveColors.map((_, index) => <Wave key={waveColors[index]} index={index} pointer={pointer} />)}
      <CursorTrail pointer={pointer} />
    </>
  );
}

function Poster({ texture, index, row }) {
  const ref = useRef(null);
  const baseX = (index - 3) * 2.1;
  const baseY = row * 1.65 - 0.8;

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const offset = ((time * 0.32 + index * 0.7 + row * 0.3) % 8) - 4;
    if (ref.current) {
      ref.current.position.x = baseX + offset;
      ref.current.rotation.y = Math.sin(time * 0.25 + index) * 0.08;
      ref.current.rotation.z = Math.sin(time * 0.2 + row) * 0.025;
    }
  });

  return (
    <mesh ref={ref} position={[baseX, baseY, -1.5 - row * 0.15]}>
      <planeGeometry args={[1.65, 2.35]} />
      <meshBasicMaterial map={texture} transparent opacity={0.2} toneMapped={false} />
    </mesh>
  );
}

function PosterScene({ images }) {
  const textures = useLoader(TextureLoader, images);
  return (
    <>
      {textures.map((texture, index) => (
        [0, 1].map((row) => <Poster key={`${index}-${row}`} texture={texture} index={index} row={row} />)
      ))}
    </>
  );
}

function EffectsCanvas({ className, children }) {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lowPower = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
    setEnabled(!reduced && !lowPower);
  }, []);

  if (!enabled) return null;

  return (
    <div className={className} aria-hidden="true">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 8], fov: 42 }} gl={{ antialias: true, alpha: true }}>
        {children}
      </Canvas>
    </div>
  );
}

export function EditorialEffects() {
  return <EffectsCanvas className="editorial-effects"><Scene /></EffectsCanvas>;
}

export function PosterWall({ images }) {
  return <EffectsCanvas className="poster-wall-effects"><PosterScene images={images} /></EffectsCanvas>;
}
