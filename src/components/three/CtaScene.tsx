import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { usePointer } from '../../hooks/usePointer'

/**
 * A quieter companion to the hero: layered glass and stone planes, read almost
 * edge-on, suggesting care pathways stacking into one record.
 */

const IVORY = '#f7f5f0'
const SAGE_LIGHT = '#c7d8d1'
const SLATE_BLUE = '#6e8790'

const layers = [
  { y: 1.05, rotation: 0.16, width: 7.4, color: SAGE_LIGHT, opacity: 0.6 },
  { y: 0.35, rotation: -0.1, width: 6.2, color: IVORY, opacity: 0.85 },
  { y: -0.35, rotation: 0.06, width: 8.1, color: SLATE_BLUE, opacity: 0.5 },
  { y: -1.05, rotation: -0.18, width: 5.4, color: '#ded9d0', opacity: 0.9 },
]

function Layers() {
  const group = useRef<THREE.Group>(null)
  const pointer = usePointer()

  useFrame(({ clock }, delta) => {
    if (!group.current) return
    const t = clock.getElapsedTime()
    const targetY = Math.sin(t * 0.1) * 0.2 + pointer.current.x * 0.1
    group.current.rotation.y += (targetY - group.current.rotation.y) * Math.min(1, delta * 1.2)
    group.current.rotation.x = 0.14 + Math.sin(t * 0.16) * 0.03
  })

  return (
    <group ref={group}>
      {layers.map((layer, index) => (
        <mesh key={index} position={[0, layer.y, index * -0.35]} rotation={[0, layer.rotation, 0]}>
          <boxGeometry args={[layer.width, 0.05, 2.6]} />
          <meshPhysicalMaterial
            color={layer.color}
            transmission={0.7}
            thickness={0.5}
            roughness={0.25}
            ior={1.3}
            transparent
            opacity={layer.opacity}
          />
        </mesh>
      ))}
      <mesh position={[0, 0, 0.8]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.35, 0.03, 16, 80]} />
        <meshStandardMaterial color="#b9b6ae" roughness={0.4} metalness={0.6} />
      </mesh>
    </group>
  )
}

export default function CtaScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.6, 6.5], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
    >
      <hemisphereLight args={[IVORY, '#cfc9bd', 0.9]} />
      <directionalLight position={[3, 6, 4]} intensity={1.1} color="#fffaf2" />
      <directionalLight position={[-4, 1, -2]} intensity={0.3} color={SAGE_LIGHT} />
      <Layers />
    </Canvas>
  )
}
