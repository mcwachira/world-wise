import {createContext, ReactNode, useContext, useEffect, useState} from 'react'
import axios from "axios";

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
    const [isLoading, setIsLoading]= useState(false)



    const fetchCities = async() => {

        try{
            setIsLoading(true)
            const res =  await axios.get('  http://localhost:8000/cities')
            setCities(res.data)
            setIsLoading(false)

            //console.log(res.data)

        }catch(error){
            console.log('error', error)
            setIsLoading(false)
        }


    }
    useEffect(() => {

        fetchCities()
    },[])

    const value ={
cities,
        setCities,
        isLoading,
        setIsLoading
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