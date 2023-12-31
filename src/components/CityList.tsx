import React from 'react'
import styles from './CityList.module.css'
import Spinner from "./Spinner.tsx";
import CityItem from "./CityItem.tsx";
import Message from "./Message.tsx";
import {useCities} from "../context/CitiesContext.tsx";

type CityListProps  ={
    cities:[],
    isLoading:boolean,


}
const CityList = () => {

    const {cities, isLoading}:CityListProps = useCities()


    if(isLoading) return <Spinner/>;

    if(!cities.length) return (
        <Message message='Add your first city by clicking a city on the map'/>
    )
    return (
        <div className={styles.cityList}>

            {cities.map((city) => <CityItem key={city.id} city={city} />)}

        </div>
    )
}
export default CityList
