import React, {ReactNode} from 'react'
import styles from './Button.module.css'


type ButtonPropTypes = {
    children:ReactNode,
    onClick:MouseEvent,
    type:string


}
const Button = ({children, onClick, type}:ButtonPropTypes) => {



    return (
        <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>


            {children}
        </button>
    )
}
export default Button
