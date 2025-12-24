'use client'

import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function AbstractRing({ radius, delay, segments }: { radius: number; delay: number; segments: number }) {
  const ringRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (ringRef.current) {
      // Breathing pulse
      const pulse = Math.sin(state.clock.elapsedTime * 1.2 + delay) * 0.08 + 1
      ringRef.current.scale.setScalar(pulse)
      
      // Rotation
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.3 * (delay % 2 === 0 ? 1 : -1)
    }
  })

  // Create segmented ring
  const segmentAngle = (Math.PI * 2) / segments

  return (
    <group ref={ringRef}>
      {Array.from({ length: segments }).map((_, i) => {
        const angle = i * segmentAngle
        const startAngle = angle
        const endAngle = angle + segmentAngle * 0.8 // Gap between segments
        
        const points = []
        for (let a = startAngle; a <= endAngle; a += 0.1) {
          points.push(new THREE.Vector2(Math.cos(a) * radius, Math.sin(a) * radius))
        }
        
        return (
          <mesh key={i} rotation={[0, 0, angle]}>
            <torusGeometry args={[radius, 0.06, 8, 16, segmentAngle]} />
            <meshStandardMaterial
              color="#220002"
              opacity={0.4 + Math.sin(i) * 0.2}
              transparent
              emissive="#220002"
              emissiveIntensity={0.1}
            />
          </mesh>
        )
      })}
    </group>
  )
}

function AbstractCenter() {
  const centerRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (centerRef.current) {
      // Pulsing center
      const pulse = Math.sin(state.clock.elapsedTime * 2.5) * 0.15 + 1
      centerRef.current.scale.setScalar(pulse)
      centerRef.current.rotation.z = state.clock.elapsedTime * 1.5
    }
  })

  return (
    <group ref={centerRef}>
      {/* Central form - abstract geometric shape */}
      <mesh>
        <dodecahedronGeometry args={[0.25, 0]} />
        <meshStandardMaterial
          color="#F9432B"
          emissive="#F9432B"
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Surrounding particles */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(angle) * 0.4, Math.sin(angle) * 0.4, 0]}>
            <sphereGeometry args={[0.05, 8, 8]} />
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

function AbstractArrow() {
  const arrowRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (arrowRef.current) {
      const time = state.clock.elapsedTime
      
      if (time < 2) {
        // Wobbling approach phase
        const progress = time / 2
        const easeProgress = 1 - Math.pow(1 - progress, 3) // Ease out cubic
        
        const wobbleX = Math.sin(time * 10) * (1 - progress) * 0.4
        const wobbleY = Math.cos(time * 9) * (1 - progress) * 0.3
        const wobbleRot = Math.sin(time * 8) * (1 - progress) * 0.4
        
        arrowRef.current.position.x = -1.8 + easeProgress * 1.8 + wobbleX
        arrowRef.current.position.y = 1.8 - easeProgress * 1.8 + wobbleY
        arrowRef.current.rotation.z = -Math.PI / 4 + easeProgress * Math.PI / 4 + wobbleRot
        
        // Scale animation
        arrowRef.current.scale.setScalar(0.8 + easeProgress * 0.2)
      } else {
        // Settled with subtle movement
        arrowRef.current.position.x = 0
        arrowRef.current.position.y = 0
        arrowRef.current.rotation.z = Math.sin(time * 1.5) * 0.08
        arrowRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.05)
      }
    }
  })

  return (
    <group ref={arrowRef} position={[-1.8, 1.8, 0]} rotation={[0, 0, -Math.PI / 4]} scale={0.8}>
      {/* Abstract arrow head - geometric form */}
      <mesh position={[0.4, 0, 0]}>
        <coneGeometry args={[0.12, 0.3, 6]} />
        <meshStandardMaterial
          color="#F9432B"
          emissive="#F9432B"
          emissiveIntensity={0.4}
        />
      </mesh>
      
      {/* Shaft with abstract segments */}
      <group position={[-0.15, 0, 0]}>
        {Array.from({ length: 3 }).map((_, i) => (
          <mesh key={i} position={[-i * 0.15, 0, 0]}>
            <boxGeometry args={[0.12, 0.04, 0.04]} />
            <meshStandardMaterial
              color="#220002"
              opacity={0.8 - i * 0.1}
              transparent
            />
          </mesh>
        ))}
      </group>
      
      {/* Trail particles */}
      {Array.from({ length: 4 }).map((_, i) => (
        <mesh key={i} position={[-0.3 - i * 0.1, 0, 0]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial
            color="#F9432B"
            opacity={0.4 - i * 0.1}
            transparent
            emissive="#F9432B"
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  )
}

export function TargetIconAnimated({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div className={clsx('relative size-12 flex items-center justify-center', className)} {...props}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[2, 2, 2]} intensity={0.8} />
        <pointLight position={[-2, -2, -2]} intensity={0.4} color="#F9432B" />
        <AbstractRing radius={1.3} delay={0} segments={12} />
        <AbstractRing radius={0.9} delay={0.5} segments={8} />
        <AbstractCenter />
        <AbstractArrow />
      </Canvas>
    </div>
  )
}
