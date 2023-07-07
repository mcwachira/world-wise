import styles from "./City.module.css";
import {useParams, useSearchParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useCities} from "../context/CitiesContext.tsx";
import Spinner from "./Spinner.tsx";
import BackButton from "./BackButton.tsx";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));


function City() {

    const {currentCity, fetchCurrentCity, isLoading} = useCities()

    const {id} = useParams()

  // // TEMP DATA
  // const currentCity = {
  //   cityName: "Lisbon",
  //   emoji: "🇵🇹",
  //   date: "2027-10-31T15:59:59.138Z",
  //   notes: "My favorite city so far!",
  // };



    useEffect(() => {


        fetchCurrentCity(id)
    }, [id])
  const { cityName, emoji, date, notes } = currentCity;

    // const [searchParams, setSearchParams] = useSearchParams();
    // const lat = searchParams.get('lat');
    // const lng = searchParams.get('lng');


    if(isLoading) return <Spinner/>;
  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
    <BackButton/>
      </div>
    </div>
  );
}

export default City;
