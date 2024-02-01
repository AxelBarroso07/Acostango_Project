import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import '../MapView/MapView.css'

export const MapView = () => {
    return (
        <div>
            <MapContainer center={[48.190493718277075, 16.353333125430908]} zoom={17} scrollWheelZoom={true} className='mapa'>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[48.190493718277075, 16.353333125430908]}>
                    <Popup>
                        Acostango Studio.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}
