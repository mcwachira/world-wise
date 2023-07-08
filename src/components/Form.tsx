// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import {useEffect, useState} from "react";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import styles from "./Form.module.css";
import Button from "./Button.tsx";
import {useNavigate} from "react-router-dom";
import BackButton from "./BackButton.tsx";
import {useUrlPosition} from "../hooks/useUrlPosition.ts";
import axios from "axios";
import Message from "./Message.tsx";
import Spinner from "./Spinner.tsx";
import {useCities} from "../context/CitiesContext.tsx";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {

const {createCity, isLoading} = useCities()
    const [lat, lng] = useUrlPosition()
    console.log(lat)
    const [isLoadingGeoLocation, setIsLoadingGeoLocation] = useState(false);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [geocodingError, setGeocodingError] = useState("");

    const navigate = useNavigate()

    const BaseUrl = "https://api.bigdatacloud.net/data/reverse-geocode-client"

    const fetchCityData = async() => {
      try{
          setIsLoadingGeoLocation(true)
          setGeocodingError("")
          const res = await axios.get(`${BaseUrl}?latitude=${lat}&longitude=${lng}`)

          console.log(res.data)
          const{city, continent, countryName, locality,countryCode} = res.data
          if(!countryCode) throw new Error('That does not seem to be a city click somewhere else')

          setCityName(city)
          setCountry(country)
          setEmoji(convertToEmoji(countryCode))


      }catch(error){

       setGeocodingError(error.message)
      }finally {
          setIsLoadingGeoLocation(false)
      }


    }
    useEffect(() => {
        if(!lat && !lng) return;
        fetchCityData()
    }, [lat, lng]);


    const handleSubmit =async (e) =>{
        e.preventDefault()

        if(!cityName ||!date)return;

        const newCity ={
            cityName,
            country,
            emoji,
            date,
            notes,
            position:{lat, lng}
        }

        await createCity(newCity)
        navigate('/app/cities')
    }


    if(isLoadingGeoLocation) return <Spinner/>



 if(!lat && !lng) return <Message message='Start By clicking somewhere on the map'/>


    if(geocodingError) return <Message message={geocodingError}/>
  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ''}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
         <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/*<input*/}
        {/*  id="date"*/}
        {/*  onChange={(e) => setDate(e.target.value)}*/}
        {/*  value={date}*/}
        {/*/>*/}

          <DatePicker id='date' selected={date} onChange={(date) => setDate(date)} dateFormat='dd/MM/yyyy'/>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type='primary'>Add</Button>
       <BackButton/>
      </div>
    </form>
  );
}

export default Form;
