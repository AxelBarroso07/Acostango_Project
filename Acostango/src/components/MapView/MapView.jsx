import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'
import '../MapView/MapView.css'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

export const MapView = () => {
    let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow
    });
    
    L.Marker.prototype.options.icon = DefaultIcon;    
    return (
        <div>
            <MapContainer center={[48.1903842, 16.3535917]} zoom={17} scrollWheelZoom={true} className='mapa'>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright" >OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[48.1903842, 16.3535917]}>
                    <Popup>
                        Acostango Studio.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}
