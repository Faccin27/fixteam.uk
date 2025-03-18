"use client"

import { useState, useEffect, useRef } from "react"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { OrbitControls, Environment, useAnimations } from "@react-three/drei"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import type { Group } from "three"

function AstroBot() {
  const group = useRef<Group>(null)

  const gltf = useLoader(GLTFLoader, "/models/walle.glb")

  const { animations } = gltf
  const { actions, names } = useAnimations(animations, group)

  useEffect(() => {
    if (names.length > 0) {
      actions[names[0]]?.reset().fadeIn(0.5).play()
    }
  }, [actions, names])

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.3
    }
  })

  return (
    <group ref={group} position={[0, -1, 0]} scale={1.5}>
      <primitive object={gltf.scene} />
    </group>
  )
}

export default function Hero3DElement() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full h-full">
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-blue-400">Carregando modelo 3D...</div>
        </div>
      ) : (
        <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
          <ambientLight intensity={0.7} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <AstroBot />
          <OrbitControls enableZoom={false} enablePan={false} />
          <Environment preset="city" />
        </Canvas>
      )}
    </div>
  )
}

