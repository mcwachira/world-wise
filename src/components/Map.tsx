import React, {useEffect, useState} from 'react'
import {MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents} from 'react-leaflet'
import styles from './Map.module.css'
import {useNavigate, useSearchParams} from "react-router-dom";
import {useCities} from "../context/CitiesContext.tsx";
import {post} from "axios";
import {useGeoLocation} from "../hooks/useGeolocation.ts";
import Button from "./Button.tsx";
const Map = () => {

    const [mapPosition, setMapPosition] = useState([40, 0])
        const {cities} = useCities()
    console.log(cities)

    const navigate = useNavigate()

    const [searchParams] = useSearchParams();

    const {  isLoading:isLoadingPosition,
        position:geoLocationPosition,
        getPosition} = useGeoLocation()

    const mapLat = searchParams.get('lat');
    const mapLng = searchParams.get('lng');



    useEffect(() => {
        if(mapLat && mapLng) setMapPosition([mapLat, mapLng])
    },[mapLat, mapLng])

    useEffect(() => {
        if(geoLocationPosition) setMapPosition([geoLocationPosition.lat,  geoLocationPosition.lng])
    },[geoLocationPosition])
    return (
        <div className={styles.mapContainer} onClick={() => navigate('form')}>

            {!geoLocationPosition && <Button type='position' onClick={getPosition}>
                {isLoadingPosition ? 'Loading ...' : 'Use your Position'}
            </Button>}
            <MapContainer center={mapPosition} zoom={6} scrollWheelZoom={true} className={styles.map}>
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
<ChangeCenter position={mapPosition}/>

                <DetectClick/>
            </MapContainer>
        </div>
    )
}


interface PositionProps{
    position:[string, string]
}
const ChangeCenter =({position}) => {
const map =useMap()
map.setView(position);
return null
}

const DetectClick = () => {
    const navigate = useNavigate()

    useMapEvents({
        click:(e) =>navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    })

}
export default Map
