'use client'

import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function AbstractBar({ delay, width, height, y, index }: { delay: number; width: number; height: number; y: number; index: number }) {
  const barRef = useRef<THREE.Group>(null)
  const segmentsRef = useRef<THREE.Group>(null)
  
  // Create segmented bar geometry
  const segments = useMemo(() => {
    const count = Math.floor(width * 3)
    return Array.from({ length: count }).map((_, i) => ({
      x: (i / count - 0.5) * width,
      width: width / count * 0.8,
    }))
  }, [width])

  useFrame((state) => {
    if (barRef.current) {
      // Wave animation
      const wave = Math.sin(state.clock.elapsedTime * 2 + delay) * 0.05
      barRef.current.position.y = y + wave
      
      // Scale animation
      const scale = Math.sin(state.clock.elapsedTime * 1.5 + delay) * 0.1 + 0.95
      barRef.current.scale.y = scale
    }
    
    if (segmentsRef.current) {
      segmentsRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh
        const material = mesh.material as THREE.MeshStandardMaterial
        const pulse = Math.sin(state.clock.elapsedTime * 3 + delay + i * 0.2)
        material.opacity = pulse * 0.2 + 0.3
        material.emissiveIntensity = pulse * 0.2 + 0.1
      })
    }
  })

  return (
    <group ref={barRef} position={[0, y, 0]}>
      {/* Main bar outline */}
      <mesh>
        <boxGeometry args={[width, height, 0.05]} />
        <meshStandardMaterial
          color="#220002"
          opacity={0.2}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Segmented fill */}
      <group ref={segmentsRef}>
        {segments.map((seg, i) => (
          <mesh key={i} position={[seg.x, 0, 0.01]}>
            <boxGeometry args={[seg.width, height * 0.7, 0.02]} />
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
    </group>
  )
}

function Frame() {
  const frameRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (frameRef.current) {
      // Subtle breathing animation
      const breath = Math.sin(state.clock.elapsedTime * 0.5) * 0.02 + 1
      frameRef.current.scale.setScalar(breath)
    }
  })

  const frameSize = 2.5
  const thickness = 0.08

  return (
    <group ref={frameRef}>
      {/* Frame corners */}
      {[
        [-frameSize / 2, -frameSize / 2],
        [frameSize / 2, -frameSize / 2],
        [frameSize / 2, frameSize / 2],
        [-frameSize / 2, frameSize / 2],
      ].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0]}>
          <boxGeometry args={[thickness, thickness, thickness]} />
          <meshStandardMaterial color="#220002" />
        </mesh>
      ))}
      
      {/* Frame edges */}
      <mesh position={[0, -frameSize / 2, 0]}>
        <boxGeometry args={[frameSize, thickness, thickness]} />
        <meshStandardMaterial color="#220002" />
      </mesh>
      <mesh position={[0, frameSize / 2, 0]}>
        <boxGeometry args={[frameSize, thickness, thickness]} />
        <meshStandardMaterial color="#220002" />
      </mesh>
      <mesh position={[-frameSize / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[frameSize, thickness, thickness]} />
        <meshStandardMaterial color="#220002" />
      </mesh>
      <mesh position={[frameSize / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[frameSize, thickness, thickness]} />
        <meshStandardMaterial color="#220002" />
      </mesh>
    </group>
  )
}

export function CodeSquareIconAnimated({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div className={clsx('relative size-12 flex items-center justify-center', className)} {...props}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 2, 2]} intensity={0.4} />
        <Frame />
        <AbstractBar delay={0} width={1.8} height={0.25} y={0.7} index={0} />
        <AbstractBar delay={0.4} width={1.2} height={0.25} y={0.2} index={1} />
        <AbstractBar delay={0.8} width={1.5} height={0.25} y={-0.3} index={2} />
        <AbstractBar delay={1.2} width={1.0} height={0.25} y={-0.8} index={3} />
      </Canvas>
    </div>
  )
}
