import {useSearchParams} from "react-router-dom";
import {useGeoLocation} from "./useGeolocation.ts";

export  const useUrlPosition = () => {

    const [searchParams] = useSearchParams();

console.log(searchParams)

    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');

    console.log(lat, lng)

    return [lat, lng]
}