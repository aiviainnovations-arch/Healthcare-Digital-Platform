import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { usePointer } from '../../hooks/usePointer'

/**
 * An architectural sculpture rather than a medical illustration:
 * two frosted apertures, a stone fin, a medical-blue glass panel, and a single
 * cardiac line that draws itself through the composition.
 */

const IVORY = '#f7f5f0'
const SAGE = '#8ea9a2'
const SAGE_LIGHT = '#c7d8d1'
const SLATE_BLUE = '#6e8790'
const SAND = '#d8c8a8'
const STONE = '#ded9d0'

function Aperture({
  radius,
  tube,
  position,
  rotation,
  color,
}: {
  radius: number
  tube: number
  position: [number, number, number]
  rotation: [number, number, number]
  color: string
}) {
  return (
    <mesh position={position} rotation={rotation} castShadow={false}>
      <torusGeometry args={[radius, tube, 24, 96]} />
      <meshPhysicalMaterial
        color={color}
        transmission={0.92}
        thickness={0.6}
        roughness={0.22}
        ior={1.35}
        transparent
        opacity={0.95}
        clearcoat={0.5}
        clearcoatRoughness={0.4}
      />
    </mesh>
  )
}

/** The ECG line, drawn progressively then held before looping. */
function PulseLine() {
  const { line, material } = useMemo(() => {
    const count = 220
    const points: THREE.Vector3[] = []
    for (let i = 0; i < count; i += 1) {
      const t = i / (count - 1)
      const x = (t - 0.5) * 7.2
      // Flat baseline with two clinical spikes and a soft recovery curve.
      const spike =
        Math.exp(-Math.pow((t - 0.38) * 46, 2)) * 0.95 -
        Math.exp(-Math.pow((t - 0.44) * 60, 2)) * 0.42 +
        Math.exp(-Math.pow((t - 0.62) * 22, 2)) * 0.22
      const drift = Math.sin(t * Math.PI * 2) * 0.05
      points.push(new THREE.Vector3(x, spike + drift, Math.sin(t * Math.PI) * 0.25))
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const material = new THREE.LineBasicMaterial({
      color: new THREE.Color(SLATE_BLUE),
      transparent: true,
      opacity: 0.75,
    })
    const object = new THREE.Line(geometry, material)
    object.geometry.setDrawRange(0, 0)
    object.position.set(0, -0.15, 0.9)
    return { line: object, material }
  }, [])

  useFrame(({ clock }) => {
    const cycle = 9
    const t = (clock.getElapsedTime() % cycle) / cycle
    const drawn = Math.min(1, t / 0.55)
    const total = line.geometry.attributes.position.count
    line.geometry.setDrawRange(0, Math.floor(drawn * total))
    material.opacity = t > 0.82 ? 0.75 * (1 - (t - 0.82) / 0.18) : 0.75
    line.position.y = -0.15 + Math.sin(clock.getElapsedTime() * 0.3) * 0.04
  })

  return <primitive object={line} />
}

/** Sparse diagnostic points suspended in the volume. */
function DataField() {
  const positions = useMemo(() => {
    const count = 90
    const array = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      array[i * 3] = (Math.random() - 0.5) * 9
      array[i * 3 + 1] = (Math.random() - 0.5) * 5.5
      array[i * 3 + 2] = (Math.random() - 0.5) * 4 - 1
    }
    return array
  }, [])

  const ref = useRef<THREE.Points>(null)
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.018
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color={SAGE} transparent opacity={0.55} sizeAttenuation />
    </points>
  )
}

function Sculpture() {
  const group = useRef<THREE.Group>(null)
  const pointer = usePointer()

  useFrame(({ clock }, delta) => {
    if (!group.current) return
    const t = clock.getElapsedTime()
    // Slow cinematic drift, with a very shallow lean toward the pointer.
    const targetY = Math.sin(t * 0.12) * 0.16 + pointer.current.x * 0.13
    const targetX = Math.cos(t * 0.1) * 0.06 - pointer.current.y * 0.07
    group.current.rotation.y += (targetY - group.current.rotation.y) * Math.min(1, delta * 1.4)
    group.current.rotation.x += (targetX - group.current.rotation.x) * Math.min(1, delta * 1.4)
    group.current.position.y = Math.sin(t * 0.25) * 0.08
  })

  return (
    <group ref={group}>
      <Aperture radius={2.15} tube={0.08} position={[0.2, 0.1, 0]} rotation={[0.22, -0.3, 0.1]} color={SAGE_LIGHT} />
      <Aperture radius={1.45} tube={0.055} position={[-0.35, -0.2, 0.7]} rotation={[-0.3, 0.4, -0.15]} color={IVORY} />

      {/* Stone fin — the architectural anchor behind the glass. */}
      <mesh position={[1.9, -0.5, -1.6]} rotation={[0, -0.5, 0.06]}>
        <boxGeometry args={[0.35, 5.4, 1.6]} />
        <meshStandardMaterial color={STONE} roughness={0.92} metalness={0.02} />
      </mesh>

      {/* Medical-blue glass panel. */}
      <mesh position={[-1.85, 0.35, -0.6]} rotation={[0, 0.42, 0.04]}>
        <boxGeometry args={[2.6, 3.4, 0.07]} />
        <meshPhysicalMaterial
          color={SLATE_BLUE}
          transmission={0.88}
          thickness={0.9}
          roughness={0.18}
          ior={1.4}
          transparent
          opacity={0.75}
        />
      </mesh>

      {/* Brushed metal spine. */}
      <mesh position={[0.15, 0, -0.9]} rotation={[0, 0, 0.04]}>
        <cylinderGeometry args={[0.035, 0.035, 5.2, 16]} />
        <meshStandardMaterial color="#b9b6ae" roughness={0.35} metalness={0.7} />
      </mesh>

      {/* Ceramic disc catching the key light. */}
      <mesh position={[1.05, 1.35, 0.5]} rotation={[1.2, 0.2, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 0.06, 48]} />
        <meshStandardMaterial color={SAND} roughness={0.55} metalness={0.08} />
      </mesh>

      <PulseLine />
      <DataField />
    </group>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0.2, 7.4], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop="always"
    >
      <fog attach="fog" args={[IVORY, 8, 17]} />
      <hemisphereLight args={[IVORY, '#cfc9bd', 0.85]} />
      <directionalLight position={[4, 6, 5]} intensity={1.25} color="#fffaf2" />
      <directionalLight position={[-5, 2, -3]} intensity={0.35} color={SAGE_LIGHT} />
      <pointLight position={[-2, -2, 3]} intensity={0.5} color="#ffffff" />
      <Sculpture />
    </Canvas>
  )
}
