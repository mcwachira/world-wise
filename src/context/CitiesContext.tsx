import {createContext, ReactNode, useContext, useEffect, useState} from 'react'
import axios from "axios";
import {useUrlPosition} from "../hooks/useUrlPosition.ts";

const CitiesContext = createContext()


type CitiesProviderProps ={
    children:ReactNode,

}

type CityListProps  ={
    cities:[],
    isLoading:boolean,


}
export const CitiesProvider = ({children}:CitiesProviderProps) => {


    const [cities , setCities] = useState([])
    const [currentCity, setCurrentCity] = useState({})
    const [isLoading, setIsLoading]= useState(false)

    const fetchCurrentCity = async (id) => {

        const res = await axios.get(`http://localhost:8000/cities/${id}`)
        setCurrentCity(res.data)

    }

    const fetchCities = async() => {

        try{
            setIsLoading(true)
            const res =  await axios.get('  http://localhost:8000/cities')
            setCities(res.data)
            setIsLoading(false)

            //console.log(res.data)

        }catch(error){
            console.log('error', error)

        }finally {
            setIsLoading(false)
        }

    }

    const createCity = async(newCity:object) => {
        console.log(newCity)

        try{
            setIsLoading(true)

            const url = 'http://localhost:8000/cities';

            // Specifying headers in the config object
            const config = { 'content-type': 'application/json' };

            const res =  await axios.post(url, newCity, config)
            console.log(res)
            setCities((cities) => [...cities,res.data])
            setIsLoading(false)

            //console.log(res.data)

        }catch(error){
            console.log('error', error)
            setIsLoading(false)
        }finally {
            setIsLoading(false)
        }


    }
    useEffect(() => {

        fetchCities()
    },[])


    const deleteCity= async(id) => {

        try{
            setIsLoading(true)
            const res =  await axios.delete(`http://localhost:8000/cities/${id}`)
            setCities((cities) => cities.filter((city) => city.id !== id))
            setIsLoading(false)

            //console.log(res.data)

        }catch(error){
            console.log('error', error)

        }finally {
            setIsLoading(false)
        }

    }

    const value ={
cities,

        currentCity,
        setCities,
        isLoading,
        setIsLoading,
        fetchCurrentCity,
        createCity,
        deleteCity
    }
    return (
        <CitiesContext.Provider value={value}>
            {children}
        </CitiesContext.Provider>
    )
}


export const useCities = () => {
    const context =   useContext(CitiesContext)
    if(context  === undefined) throw new Error('Cities Context was used Outside a provider')
    return (
      context
    )
}