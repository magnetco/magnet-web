'use client'

import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function AbstractSparkle() {
  const groupRef = useRef<THREE.Group>(null)
  const particlesRef = useRef<THREE.Points>(null)
  
  // Create abstract geometric form
  const geometry = useMemo(() => {
    const shape = new THREE.Shape()
    // Create a stylized diamond/star shape
    const points = []
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2
      const radius = i % 2 === 0 ? 1.2 : 0.6
      points.push(new THREE.Vector2(Math.cos(angle) * radius, Math.sin(angle) * radius))
    }
    shape.setFromPoints(points)
    return new THREE.ShapeGeometry(shape)
  }, [])

  // Particle system
  const particlePositions = useMemo(() => {
    const count = 50
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 0.5 + Math.random() * 1.5
      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2
      positions[i * 3 + 2] = Math.sin(angle) * radius
    }
    return positions
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
    }
    
    if (particlesRef.current) {
      particlesRef.current.rotation.y = -state.clock.elapsedTime * 0.3
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < positions.length; i += 3) {
        const angle = Math.atan2(positions[i], positions[i + 2])
        const baseRadius = Math.sqrt(positions[i] ** 2 + positions[i + 2] ** 2)
        const newRadius = baseRadius + Math.sin(state.clock.elapsedTime * 3 + i * 0.1) * 0.3
        positions[i] = Math.cos(angle) * newRadius
        positions[i + 2] = Math.sin(angle) * newRadius
        positions[i + 1] += Math.sin(state.clock.elapsedTime * 2 + i) * 0.01
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <group ref={groupRef}>
      {/* Abstract geometric form */}
      <mesh geometry={geometry} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#F9432B"
          emissive="#F9432B"
          emissiveIntensity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Particle system */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlePositions.length / 3}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#F9432B"
          size={0.12}
          sizeAttenuation={true}
          transparent
          opacity={0.8}
        />
      </points>
      
      {/* Radial lines for sparkle effect */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(angle) * 0.8, Math.sin(angle) * 0.8, 0]} rotation={[0, 0, angle]}>
            <boxGeometry args={[0.4, 0.02, 0.02]} />
            <meshStandardMaterial
              color="#F9432B"
              emissive="#F9432B"
              emissiveIntensity={0.3}
            />
          </mesh>
        )
      })}
    </group>
  )
}

export function SparklesIconAnimated({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div className={clsx('relative size-12 flex items-center justify-center', className)} {...props}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[2, 2, 2]} intensity={0.8} color="#F9432B" />
        <pointLight position={[-2, -2, -2]} intensity={0.4} />
        <AbstractSparkle />
      </Canvas>
    </div>
  )
}
