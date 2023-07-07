import React from 'react'
import styles from './CityItem.module.css'
import {Link, useParams} from "react-router-dom";


const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "long",
    }).format(new Date(date));



type CityProps ={
    city:object
}

const CityItem = ({city}:CityProps) => {
    const {cityName, emoji, date, id, position} = city;
    return (
       <ul>

           <li>
               <Link to={`${id}?lat=${position.lat}&lng=${position.lng}`} className={styles.cityItem}>

               <span className={styles.emoji}>

                   {cityName}
               </span>

                   <h3 className={styles.name}>

                       {emoji}
                   </h3>

                   <time className={styles.date}>

                       {formatDate(date)}
                   </time>
                   <button className={styles.deleteBtn}>&times;</button>
               </Link>
           </li>

       </ul>
    )
}
export default CityItem
