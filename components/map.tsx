'use client'

import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

import iconUrl        from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl  from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl      from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl });

export default function Map() {
    return (
        <div className=" w-48 h-48 rounded-3xl overflow-hidden">
            <MapContainer center={[43.600839, 1.444058]} zoom={13} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[43.600839, 1.444058]}>
                </Marker>
            </MapContainer>
        </div>
    )
}
