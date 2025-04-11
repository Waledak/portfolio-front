"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

export default function ParticleBackground() {
    return (
        <div className="fixed inset-0 -z-10 bg-neutral-100">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <ParticleTetrahedrons />
                <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
            </Canvas>
        </div>
    )
}

function ParticleTetrahedrons() {

    // Create particles
    const count = 100 // Total number of particles
    const tetrahedronCount = 12 // Number of tetrahedrons to create
    const particlesRef = useRef(null)
    const lineRef = useRef(null)

    // Generate random positions for particles
    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 10
            const y = (Math.random() - 0.5) * 10
            const z = (Math.random() - 0.5) * 10
            temp.push({
                x,
                y,
                z,
                vx: Math.random() * 0.01 - 0.005,
                vy: Math.random() * 0.01 - 0.005,
                vz: Math.random() * 0.01 - 0.005,
            })
        }
        return temp
    }, [count])

    // Create tetrahedrons - each with exactly 4 particles
    const tetrahedrons = useMemo(() => {
        const temp = []
        // Create tetrahedrons by selecting 4 random particles that are somewhat close to each other
        for (let t = 0; t < tetrahedronCount; t++) {
            // Pick a random starting particle
            const startIdx = Math.floor(Math.random() * count)
            const startParticle = particles[startIdx]

            // Find 3 closest particles to this one
            const distances = []
            for (let i = 0; i < count; i++) {
                if (i === startIdx) continue

                const dist = Math.sqrt(
                    Math.pow(particles[i].x - startParticle.x, 2) +
                    Math.pow(particles[i].y - startParticle.y, 2) +
                    Math.pow(particles[i].z - startParticle.z, 2),
                )

                distances.push({ index: i, distance: dist })
            }

            // Sort by distance and take the 3 closest
            distances.sort((a, b) => a.distance - b.distance)
            const closestIndices = distances.slice(0, 3).map((d) => d.index)

            // Create a tetrahedron with these 4 particles
            temp.push([startIdx, ...closestIndices])
        }
        return temp
    }, [particles, count, tetrahedronCount])

    // Update particle positions on each frame
    useFrame(() => {
        if (!particlesRef.current || !lineRef.current) return

        // Update particle positions
        for (let i = 0; i < count; i++) {
            particles[i].x += particles[i].vx
            particles[i].y += particles[i].vy
            particles[i].z += particles[i].vz

            // Boundary check and bounce
            if (Math.abs(particles[i].x) > 5) particles[i].vx *= -1
            if (Math.abs(particles[i].y) > 5) particles[i].vy *= -1
            if (Math.abs(particles[i].z) > 5) particles[i].vz *= -1

            // Update particle positions in the buffer
            particlesRef.current.geometry.attributes.position.array[i * 3] = particles[i].x
            particlesRef.current.geometry.attributes.position.array[i * 3 + 1] = particles[i].y
            particlesRef.current.geometry.attributes.position.array[i * 3 + 2] = particles[i].z
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true

        // Update line positions
        const positions = lineRef.current.geometry.attributes.position.array
        let index = 0

        tetrahedrons.forEach(([i, j, k, l]) => {
            // Edge 1: i to j
            positions[index++] = particles[i].x
            positions[index++] = particles[i].y
            positions[index++] = particles[i].z
            positions[index++] = particles[j].x
            positions[index++] = particles[j].y
            positions[index++] = particles[j].z

            // Edge 2: j to k
            positions[index++] = particles[j].x
            positions[index++] = particles[j].y
            positions[index++] = particles[j].z
            positions[index++] = particles[k].x
            positions[index++] = particles[k].y
            positions[index++] = particles[k].z

            // Edge 3: k to l
            positions[index++] = particles[k].x
            positions[index++] = particles[k].y
            positions[index++] = particles[k].z
            positions[index++] = particles[l].x
            positions[index++] = particles[l].y
            positions[index++] = particles[l].z

            // Edge 4: l to i
            positions[index++] = particles[l].x
            positions[index++] = particles[l].y
            positions[index++] = particles[l].z
            positions[index++] = particles[i].x
            positions[index++] = particles[i].y
            positions[index++] = particles[i].z

            // Edge 5: i to k
            positions[index++] = particles[i].x
            positions[index++] = particles[i].y
            positions[index++] = particles[i].z
            positions[index++] = particles[k].x
            positions[index++] = particles[k].y
            positions[index++] = particles[k].z

            // Edge 6: j to l
            positions[index++] = particles[j].x
            positions[index++] = particles[j].y
            positions[index++] = particles[j].z
            positions[index++] = particles[l].x
            positions[index++] = particles[l].y
            positions[index++] = particles[l].z
        })

        lineRef.current.geometry.attributes.position.needsUpdate = true
    })

    // Create initial positions for particles
    const particlePositions = useMemo(() => {
        const positions = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            positions[i * 3] = particles[i].x
            positions[i * 3 + 1] = particles[i].y
            positions[i * 3 + 2] = particles[i].z
        }
        return positions
    }, [particles, count])

    // Create initial positions for lines
    const linePositions = useMemo(() => {
        // Each tetrahedron has 6 edges, each edge has 2 points, each point has 3 coordinates
        const positions = new Float32Array(tetrahedrons.length * 6 * 2 * 3)
        let index = 0

        tetrahedrons.forEach(([i, j, k, l]) => {
            // Edge 1: i to j
            positions[index++] = particles[i].x
            positions[index++] = particles[i].y
            positions[index++] = particles[i].z
            positions[index++] = particles[j].x
            positions[index++] = particles[j].y
            positions[index++] = particles[j].z

            // Edge 2: j to k
            positions[index++] = particles[j].x
            positions[index++] = particles[j].y
            positions[index++] = particles[j].z
            positions[index++] = particles[k].x
            positions[index++] = particles[k].y
            positions[index++] = particles[k].z

            // Edge 3: k to l
            positions[index++] = particles[k].x
            positions[index++] = particles[k].y
            positions[index++] = particles[k].z
            positions[index++] = particles[l].x
            positions[index++] = particles[l].y
            positions[index++] = particles[l].z

            // Edge 4: l to i
            positions[index++] = particles[l].x
            positions[index++] = particles[l].y
            positions[index++] = particles[l].z
            positions[index++] = particles[i].x
            positions[index++] = particles[i].y
            positions[index++] = particles[i].z

            // Edge 5: i to k
            positions[index++] = particles[i].x
            positions[index++] = particles[i].y
            positions[index++] = particles[i].z
            positions[index++] = particles[k].x
            positions[index++] = particles[k].y
            positions[index++] = particles[k].z

            // Edge 6: j to l
            positions[index++] = particles[j].x
            positions[index++] = particles[j].y
            positions[index++] = particles[j].z
            positions[index++] = particles[l].x
            positions[index++] = particles[l].y
            positions[index++] = particles[l].z
        })

        return positions
    }, [particles, tetrahedrons])

    return (
        <group>
            <points ref={particlesRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={particlePositions.length / 3}
                        array={particlePositions}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial size={0.05} color="#871cd9" sizeAttenuation={true} transparent opacity={0.8} />
            </points>
            <lineSegments ref={lineRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={linePositions.length / 3}
                        array={linePositions}
                        itemSize={3}
                    />
                </bufferGeometry>
                <lineBasicMaterial color="#871cd9" transparent opacity={0.2} />
            </lineSegments>
        </group>
    )
}
