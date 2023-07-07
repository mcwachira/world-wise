import React, {useState} from 'react'
import {MapContainer, Marker, Popup, TileLayer, useMap} from 'react-leaflet'
import styles from './Map.module.css'
import {useNavigate, useSearchParams} from "react-router-dom";
import {useCities} from "../context/CitiesContext.tsx";
const Map = () => {

    const [mapPosition, setMapPosition] = useState([40, 0])
        const {cities} = useCities()
    console.log(cities)

    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();

    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');

    console.log(lat)
    return (
        <div className={styles.mapContainer} onClick={() => navigate('form')}>
            <MapContainer center={[lat, lng]} zoom={23} scrollWheelZoom={true} className={styles.map}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities.map((city) => (    <Marker position={[city.position.lat, city.position.lng]}  key={city.id}>
                    <Popup>
                        <span>
                            {city.emoji}
                        </span>
                        <span>

                                {city.cityName}
                        </span>

                    </Popup>
                </Marker>))}

            </MapContainer>
        </div>
    )
}
export default Map
