import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TextureLoader } from 'three';

function SpinningGlobe() {
  const earthTexture = useLoader(TextureLoader, '/assets/earth.jpg');
  const globeRef = useRef();
  return (
    <mesh ref={globeRef} rotation={[0, 0, 0]}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshStandardMaterial map={earthTexture} />
    </mesh>
  );
}

function ThemedStars({ isDark }) {
  return (
    <Stars
      radius={100}
      depth={20}
      count={5000}
      factor={4}
      saturation={0}
      fade
      color={isDark ? '#ffffff' : '#1f2937'} // white for dark, gray-800 for light
    />
  );
}

export default function Hero() {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center text-white overflow-hidden bg-gradient-to-b from-black via-gray-900 dark:text-white text-gray-900 dark:bg-gradient-to-b dark:from-black dark:via-gray-900">

      {/* Fullscreen Stars Background */}
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ThemedStars isDark={isDark} />
        </Canvas>
      </div>

      {/* Hero Text */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center px-4 z-10 mt-20"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
          🌍 Welcome to <span className="text-indigo-400">GlobeVista</span>
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
        Journey through every nation — explore cultures, regions, and facts from around the world.
        </p>
        <Link to="/countries">
          <button className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white font-medium transition">
            Start Exploring
          </button>
        </Link>
      </motion.div>

      {/* 3D Globe */}
      <div className="absolute bottom-0 w-full h-[70vh] z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 2, 2]} />
          <OrbitControls autoRotate enableZoom={false} />
          <ThemedStars isDark={isDark} />
          <SpinningGlobe />
        </Canvas>
      </div>
    </div>
  );
}
