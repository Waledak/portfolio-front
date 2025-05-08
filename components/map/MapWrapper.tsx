'use client'

import dynamic from 'next/dynamic'

// Dynamically import the Map component with SSR disabled
// This is necessary because Leaflet uses browser-specific APIs
const Map = dynamic(() => import('@/components/map/Map'), { ssr: false })

/**
 * Wrapper component for the Map to handle dynamic loading
 * and disable server-side rendering
 */
export default function MapWrapper() {
  return <Map />
}