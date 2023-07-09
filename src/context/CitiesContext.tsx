import {createContext, ReactNode, useCallback, useContext, useEffect, useReducer, useState} from 'react'
import axios from "axios";
import {useUrlPosition} from "../hooks/useUrlPosition.ts";

const CitiesContext = createContext()

const initialState = {
    cities:[],
    isLoading:false,
    currentCity: {},
    error:""
}

const reducer = (state,action) => {

    switch(action.type){
        case 'loading':
            return {
                ...state,
                isLoading:true
            }
        case 'cities/loaded':
            return {
                ...state,
                isLoading:false,
                cities:action.payload
            }

        case 'city/loaded':
            return {
                ...state,
                isLoading:false,
                currentCity:action.payload
            }



        case 'city/created':
            return {
                ...state,
                isLoading:false,
                cities:[...state.cities, action.payload],
                currentCity:action.payload
            }
        case 'cities/deleted':
            return {
                ...state,
                isLoading:false,
                cities:state.cities.filter((city) => city.id !== action.payload),
                currentCity:{}

            }


        case 'rejected':
            return {...state, isLoading:false, error:action.payload}
        default :
             throw new Error('dispatch method wrong')
    }

}


type CityListProps  ={
    cities:[],
    isLoading:boolean,


}

type CitiesProviderProps ={
    children:ReactNode,

}
export const CitiesProvider = ({children}:CitiesProviderProps) => {

const [{cities, isLoading, currentCity,error},  dispatch] = useReducer(reducer, initialState)






    // const [cities , setCities] = useState([])
    // const [currentCity, setCurrentCity] = useState({})
    // const [isLoading, setIsLoading]= useState(false)

   const fetchCurrentCity = useCallback(
 async function fetchCurrentCity(id:string) {
        if(Number(id) === currentCity.id) return;


        try {
            dispatch({type: 'loading'})
            const res = await axios.get(`http://localhost:8000/cities/${id}`)
            dispatch({type: 'city/loaded', payload: res.data})


        } catch (error) {
            console.log('error', error)
            dispatch({type: 'rejected', payload: 'Therer wass an error loading data...'})


        }
    },
       [currentCity.id],
   );


    const fetchCities = async() => {

        try{
            dispatch({type:'loading'})
            const res =  await axios.get('  http://localhost:8000/cities')

            dispatch({type:'cities/loaded', payload:res.data})


            //console.log(res.data)

        }catch(error){
            console.log('error', error)
            dispatch({type:'rejected', payload:'Therer wass an error loading data...'})


        }

    }

    const createCity = async(newCity:object) => {
        console.log(newCity)

        try{
            dispatch({type:'loading'})

            const url = 'http://localhost:8000/cities';

            // Specifying headers in the config object
            const config = { 'content-type': 'application/json' };

            const res =  await axios.post(url, newCity, config)
            console.log(res)
            dispatch({type:'city/created', payload:res.data})

            //console.log(res.data)

        }catch(error){
            console.log('error', error)
            dispatch({type:'rejected', payload:'Therer wass an error creating city...'})


        }


    }
    useEffect(() => {

        fetchCities()
    },[])


    const deleteCity= async(id) => {

        try{
            dispatch({type:'loading'})
            const res =  await axios.delete(`http://localhost:8000/cities/${id}`)

            dispatch({type:'cities/deleted', payload:id})

            //setCities((cities) => cities.filter((city) => city.id !== id))


            //console.log(res.data)

        }catch(error){
        console.log('error', error)
        dispatch({type:'rejected', payload:'Therer wass an error deleting data...'})


    }


}

    const value ={
cities,

        currentCity,
        isLoading,
        fetchCurrentCity,
        createCity,
        deleteCity,
        error
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