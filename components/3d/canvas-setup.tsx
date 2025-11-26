"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { ReactNode } from "react"

interface CanvasSetupProps {
  children?: ReactNode
  cameraPosition?: [number, number, number]
  enableControls?: boolean
}

export function CanvasSetup({
  children,
  cameraPosition = [0, 0, 5],
  enableControls = true,
}: CanvasSetupProps) {
  return (
    <Canvas
      gl={{ antialias: true, alpha: true }}
      className="w-full h-full"
    >
      <PerspectiveCamera makeDefault position={cameraPosition} />
      {/* @ts-expect-error - React Three Fiber types */}
      <ambientLight intensity={0.5} />
      {/* @ts-expect-error - React Three Fiber types */}
      <pointLight position={[10, 10, 10]} />
      {enableControls && <OrbitControls enableZoom={false} />}
      {children}
    </Canvas>
  )
}

