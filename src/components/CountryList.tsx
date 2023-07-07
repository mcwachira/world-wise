import React from 'react'
import styles from './CountryList.module.css'
import Spinner from "./Spinner.tsx";
import CityItem from "./CityItem.tsx";
import Message from "./Message.tsx";
import CountryItem from "./CountryItem.tsx";

type CityListProps  ={
    cities:[],
    isLoading:boolean,


}
const CountryList = ({isLoading, cities}:CityListProps ) => {

    if(isLoading) return <Spinner/>;

    if(!cities.length) return (
        <Message message='Add your first city by clicking a city on the map'/>
    )

    console.log(cities)
    const countries = cities?.reduce((arr, city) => {
        if(!arr?.map(element => element.country).includes(city.country)){
            return [...arr, {country:city.country, emoji:city.emoji}]
        }else{
            return arr
        }
    }, [])


    return (
        <div className={styles.countryList}>

            {countries.map((country, index) => <CountryItem key={index} country={country} />)}

        </div>
    )
}
export default CountryList
