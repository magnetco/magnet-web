'use client'

import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function AbstractResult({ delay, width, y }: { delay: number; width: number; y: number }) {
  const resultRef = useRef<THREE.Group>(null)
  
  // Create abstract result pattern
  const dots = useMemo(() => {
    const count = Math.floor(width * 4)
    return Array.from({ length: count }).map((_, i) => ({
      x: (i / count - 0.5) * width,
      size: 0.08 + Math.random() * 0.04,
    }))
  }, [width])

  useFrame((state) => {
    if (resultRef.current) {
      const highlight = Math.sin(state.clock.elapsedTime * 2 + delay)
      resultRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh
        const material = mesh.material as THREE.MeshStandardMaterial
        const pulse = Math.sin(state.clock.elapsedTime * 3 + delay + i * 0.3)
        material.opacity = (highlight * 0.2 + 0.3) * (pulse * 0.3 + 0.7)
        material.emissiveIntensity = pulse * 0.2
      })
    }
  })

  return (
    <group ref={resultRef} position={[-width / 2 - 1, y, 0]}>
      {/* Base line */}
      <mesh position={[width / 2, 0, 0]}>
        <boxGeometry args={[width, 0.06, 0.02]} />
        <meshStandardMaterial color="#220002" opacity={0.2} transparent />
      </mesh>
      
      {/* Abstract dot pattern */}
      {dots.map((dot, i) => (
        <mesh key={i} position={[dot.x, 0, 0.01]}>
          <sphereGeometry args={[dot.size, 8, 8]} />
          <meshStandardMaterial
            color="#220002"
            opacity={0.4}
            transparent
            emissive="#220002"
            emissiveIntensity={0.1}
          />
        </mesh>
      ))}
    </group>
  )
}

function AbstractLens() {
  const lensRef = useRef<THREE.Group>(null)
  const innerRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (lensRef.current) {
      // Orbital motion
      const angle = state.clock.elapsedTime * 0.6
      const radius = 0.6
      lensRef.current.position.x = Math.cos(angle) * radius - 0.3
      lensRef.current.position.y = Math.sin(angle * 0.7) * 0.4
      
      // Rotation
      lensRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8) * 0.2
    }
    
    if (innerRef.current) {
      // Inner pattern rotation
      innerRef.current.rotation.z = state.clock.elapsedTime * 1.2
    }
  })

  return (
    <group ref={lensRef} position={[0.5, 0, 0.1]}>
      {/* Outer ring */}
      <mesh>
        <torusGeometry args={[0.7, 0.06, 16, 32]} />
        <meshStandardMaterial color="#220002" />
      </mesh>
      
      {/* Inner abstract pattern */}
      <group ref={innerRef}>
        {/* Radial lines */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2
          return (
            <mesh key={i} position={[Math.cos(angle) * 0.3, Math.sin(angle) * 0.3, 0]} rotation={[0, 0, angle]}>
              <boxGeometry args={[0.3, 0.03, 0.02]} />
              <meshStandardMaterial color="#220002" opacity={0.3} transparent />
            </mesh>
          )
        })}
        
        {/* Central dot */}
        <mesh>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#220002" />
        </mesh>
      </group>
      
      {/* Handle */}
      <mesh position={[0.5, -0.5, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.4, 0.06, 0.06]} />
        <meshStandardMaterial color="#220002" />
      </mesh>
    </group>
  )
}

export function MagnifyingGlassIconAnimated({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div className={clsx('relative size-12 flex items-center justify-center', className)} {...props}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 2, 2]} intensity={0.5} />
        <AbstractResult delay={0} width={1.0} y={0.5} />
        <AbstractResult delay={0.3} width={0.8} y={0.1} />
        <AbstractResult delay={0.6} width={0.9} y={-0.3} />
        <AbstractLens />
      </Canvas>
    </div>
  )
}
