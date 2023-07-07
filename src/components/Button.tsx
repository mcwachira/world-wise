import React from 'react'
import styles from './Button.module.css'


type Button = {
    children:ReactNode,
    onClick:MouseEvent,
    type:string


}
const Button = ({children, onClick, type}) => {



    return (
        <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>


            {children}
        </button>
    )
}
export default Button
