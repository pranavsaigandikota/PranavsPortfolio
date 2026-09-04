import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Environment, Float, Sparkles } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AnimatedBubble = ({ isHovered }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <Sphere args={[1, 100, 100]} ref={meshRef} scale={isHovered ? 1.3 : 1.1}>
        <MeshDistortMaterial
          color={isHovered ? "#ff0a16" : "#e50914"}
          attach="material"
          distort={isHovered ? 0.7 : 0.4}
          speed={isHovered ? 6 : 3}
          roughness={0.1}
          metalness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </Sphere>
      <Sparkles count={60} scale={3} size={3} speed={0.4} opacity={isHovered ? 1 : 0.4} color="#ffcccc" />
    </Float>
  );
};

export const FlixBubble = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative flex flex-col items-center justify-center cursor-pointer group"
      style={{ width: '250px', height: '250px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate('/flix')}
    >
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 3.5] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
          <directionalLight position={[-10, -10, -5]} intensity={1} color="#ff0000" />
          <Environment preset="city" />
          <AnimatedBubble isHovered={isHovered} />
        </Canvas>
      </div>
      
      {/* Glow Effect */}
      <div className={`absolute inset-0 z-[-1] rounded-full transition-opacity duration-500 blur-2xl ${isHovered ? 'bg-red-600/50 opacity-100' : 'bg-red-800/20 opacity-0'}`} />

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative z-10 px-4 py-2 mt-48 text-sm font-bold text-white transition-all duration-300 border-2 rounded-full border-netflix-red bg-black/70 backdrop-blur-md group-hover:bg-netflix-red group-hover:shadow-[0_0_20px_rgba(229,9,20,0.8)]"
      >
        Click for Flix Version
      </motion.button>
    </div>
  );
};
