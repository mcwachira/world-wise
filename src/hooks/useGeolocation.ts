import {useState} from "react";


export const useGeoLocation = (defaultPosition =null) =>{

    const [isLoading, setIsLoading] = useState(false);
    const [position, setPosition] = useState(defaultPosition);
    const [error, setError] = useState(null);
    const getPosition = () => {
        if(!navigator.geolocation) return setError("Your Browser does not return geolocation")

        setIsLoading(true)

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setPosition({
                    lat:pos.coords.latitude,
                    lng:pos.coords.longitude
                });
                setIsLoading(false)
            },
            (error) => {
                setError(error.message);
                setIsLoading(false)
            }
        )
    }

    return {
        isLoading,
        error,
        position,
        getPosition,
    }
}
