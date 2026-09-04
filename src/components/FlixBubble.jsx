import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Sparkles, Text3D, Center, shaderMaterial } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor1: new THREE.Color('#228b22'), // Base green (was looking black)
    uColor2: new THREE.Color('#32cd32'), // Mid green
    uColor3: new THREE.Color('#7cfc00'), // Light green / edge
  },
  // vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment shader
  `
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    varying vec2 vUv;

    // 2D Noise
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1; i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ; m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5; vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g; g.x  = a0.x  * x0.x  + h.x  * x0.y; g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 center = vec2(0.5);
      vec2 uv = vUv - center;
      float dist = length(uv);
      
      // Swirling Angle
      float angle = atan(uv.y, uv.x);
      
      // We perturb the uv to create the vortex
      float noiseVal = snoise(uv * 4.0 - uTime * 0.5);
      float swirl = angle + dist * 12.0 - uTime * 3.0 + noiseVal * 1.5;
      
      // Radial rings based on swirl and distance
      float rings = sin(swirl) * 0.5 + 0.5;
      
      // Sharp color bands like Rick and Morty (posterize/step)
      float band1 = step(0.6, rings + noiseVal * 0.2);
      float band2 = step(0.3, rings + noiseVal * 0.2);

      // Create jagged edge mask
      float maskNoise = snoise(uv * 12.0 + uTime * 1.5);
      float alpha = smoothstep(0.5, 0.45, dist + maskNoise * 0.08);
      
      // Small scattered dots outside the main portal
      float specks = smoothstep(0.9, 0.95, snoise(uv * 20.0 - uTime)) * smoothstep(0.4, 0.55, dist);
      alpha = max(alpha, specks);

      // Colors: Dark Red, Mid Red, Bright Red
      vec3 color = uColor1; // Base dark red
      color = mix(color, uColor2, band2); // Mid red blobs
      color = mix(color, uColor3, band1); // Light red highlights

      // Add a bit of noise to color
      color += noiseVal * 0.05;

      gl_FragColor = vec4(color, alpha);
    }
  `
);

extend({ PortalMaterial });

const AnimatedBubble = ({ isHovered }) => {
  const materialRef = useRef();
  
  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uTime += delta * (isHovered ? 4.0 : 1.0);
      materialRef.current.uColor2.lerp(
        new THREE.Color(isHovered ? "#3dfa3d" : "#2db92d"), 
        0.1
      );
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh scale={[1, 1.4, 1]} position={[0, 0, -0.5]}>
        <planeGeometry args={[3.2, 3.2]} />
        <portalMaterial ref={materialRef} transparent={true} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Text positioned below the portal */}
      <group position={[0, -1.8, 1]}>
        <Center position={[0, 0.4, 0]}>
          <Text3D 
            font="https://threejs.org/examples/fonts/helvetiker_bold.typeface.json"
            size={0.25}
            height={0.1}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.015}
            bevelSize={0.01}
            bevelOffset={0}
            bevelSegments={5}
          >
            CLICK TO
            <meshStandardMaterial color="#f5f5f1" roughness={0.2} metalness={0.8} emissive="#f5f5f1" emissiveIntensity={0.1} />
          </Text3D>
        </Center>
        <Center position={[0, -0.1, 0]}>
          <Text3D 
            font="https://threejs.org/examples/fonts/helvetiker_bold.typeface.json"
            size={0.35}
            height={0.1}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.015}
            bevelSize={0.01}
            bevelOffset={0}
            bevelSegments={5}
          >
            ENTER
            <meshStandardMaterial color="#f5f5f1" roughness={0.2} metalness={0.8} emissive="#f5f5f1" emissiveIntensity={0.1} />
          </Text3D>
        </Center>
      </group>
      <Sparkles count={150} scale={4} size={3} speed={1.5} opacity={isHovered ? 1 : 0.6} color="#ccffcc" />
    </Float>
  );
};

export const FlixBubble = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative flex flex-col items-center justify-center cursor-pointer group mb-12 w-full max-w-[450px] aspect-square"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate('/flix')}
    >


      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 4.5] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
          <directionalLight position={[-10, -10, -5]} intensity={1} color="#00ff00" />
          <Environment preset="city" />
          <AnimatedBubble isHovered={isHovered} />
        </Canvas>
      </div>
      
      {/* Glow Effect */}
      <div className={`absolute inset-0 z-[-1] rounded-full transition-opacity duration-500 blur-3xl ${isHovered ? 'bg-green-500/60 opacity-100' : 'bg-green-700/30 opacity-0'}`} />
    </div>
  );
};
