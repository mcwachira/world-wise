import styles from "./CountryItem.module.css";


type CountryProps = {
    country:string
}
function CountryItem({ country }:CountryProps) {
    console.log(country)
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
