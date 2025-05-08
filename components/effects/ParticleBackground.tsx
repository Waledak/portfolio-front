"use client"

import { useRef, useState, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Custom shader material for round particles
 */
const ParticleMaterial = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  // Custom shader for circular particles
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color("#332664") },
        uColor2: { value: new THREE.Color("#6E3BFF") }
      },
      vertexShader: `
        uniform float uTime;
        varying vec3 vColor;
        
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = 4.0;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        varying vec3 vColor;
        
        void main() {
          // Calculate distance from center of point
          float dist = length(gl_PointCoord - vec2(0.5));
          
          // Discard fragments outside of circle
          if (dist > 0.5) discard;
          
          // Mix the two colors based on vColor
          float mixFactor = vColor.x;
          vec3 finalColor = mix(uColor1, uColor2, mixFactor);
          
          gl_FragColor = vec4(finalColor, 0.8);
        }
      `,
      transparent: true,
      depthWrite: false,
      vertexColors: true
    })
  }, [])

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  return <primitive ref={materialRef} object={shaderMaterial} attach="material" />
}

/**
 * Custom material for connecting lines
 */
const LineMaterial = () => {
  const materialRef = useRef<THREE.LineBasicMaterial>(null)

  const lineMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: new THREE.Color("#6E3BFF"),
      transparent: true,
      opacity: 0.2,
      linewidth: 1
    })
  }, [])

  return <primitive ref={materialRef} object={lineMaterial} attach="material" />
}

interface Particle {
  x: number;
  y: number;
  z: number;
}

interface ParticleSystemProps {
  count?: number;
  mouseX?: number;
  mouseY?: number;
}

/**
 * 3D particle system with connecting lines
 */
function ParticleSystem({ count = 1000, mouseX = 0, mouseY = 0 }: ParticleSystemProps) {
  const particlesRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)

  // Generate random particles
  const particles = useMemo<Particle[]>(() => {
    const temp: Particle[] = []
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 10
      const y = (Math.random() - 0.5) * 10
      const z = (Math.random() - 0.5) * 10
      temp.push({ x, y, z })
    }
    return temp
  }, [count])

  // Create geometry with particles
  const particlesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = particles[i].x
      positions[i * 3 + 1] = particles[i].y
      positions[i * 3 + 2] = particles[i].z

      // Color mixing factor
      const mixFactor = Math.random()
      colors[i * 3] = mixFactor
      colors[i * 3 + 1] = 0
      colors[i * 3 + 2] = 0
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return geometry
  }, [particles, count])

  // Find closest particles and create connections
  const lineGeometry = useMemo(() => {
    // Calculate distances between particles and find closest neighbors
    const connections: number[] = []

    // Adjust this value to balance performance and visual density
    const connectionDensity = 9

    for (let i = 0; i < count; i += connectionDensity) {
      // Calculate distances to all other particles
      const distances: { index: number; distance: number }[] = []

      for (let j = 0; j < count; j++) {
        if (i !== j) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dz = particles[i].z - particles[j].z
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)

          distances.push({ index: j, distance })
        }
      }

      // Sort by distance and take the closest 3
      distances.sort((a, b) => a.distance - b.distance)
      const closestThree = distances.slice(0, 3)

      // Add lines for each connection
      closestThree.forEach(neighbor => {
        connections.push(particles[i].x, particles[i].y, particles[i].z)
        connections.push(particles[neighbor.index].x, particles[neighbor.index].y, particles[neighbor.index].z)
      })
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(connections, 3))
    return geometry
  }, [particles, count])

  // Animation
  useFrame((state) => {
    const time = state.clock.getElapsedTime() * 0.2

    if (particlesRef.current && linesRef.current) {
      particlesRef.current.rotation.x = time * 0.05 + mouseY * 0.01
      particlesRef.current.rotation.y = time * 0.07 + mouseX * 0.01

      // Keep lines in sync with particles
      linesRef.current.rotation.x = particlesRef.current.rotation.x
      linesRef.current.rotation.y = particlesRef.current.rotation.y
    }
  })

  return (
    <>
      <points ref={particlesRef}>
        <primitive object={particlesGeometry} attach="geometry" />
        <ParticleMaterial />
      </points>

      <lineSegments ref={linesRef}>
        <primitive object={lineGeometry} attach="geometry" />
        <LineMaterial />
      </lineSegments>
    </>
  )
}

/**
 * Interactive 3D particle background
 * Creates a responsive background with particles that react to mouse movement
 */
export default function ParticleBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position to range [-1, 1]
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 bg-gradient-to-b from-gray-50 to-gray-200">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 60 }} 
        dpr={[1, 2]} // Optimize for device pixel ratio
        gl={{ antialias: true, alpha: true }}
      >
        <ParticleSystem mouseX={mousePosition.x} mouseY={mousePosition.y} />
      </Canvas>
    </div>
  )
}