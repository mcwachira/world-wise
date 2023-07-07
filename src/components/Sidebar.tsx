import React from 'react'
import styles from './Sidebar.module.css'
import Logo from "./Logo.tsx";
import AppNav from "./AppNav.tsx";
import {Outlet} from "react-router-dom";
const Sidebar = () => {
    return (
        <div className={styles.sidebar}>
            <Logo/>
            <AppNav/>

 <Outlet/>


            <footer className={styles.footer}>

                <p className={styles.copyright}>
                &copy; copyright {new Date().getFullYear()} by Word Wise Inc
                </p>
            </footer>
</div>
    )
}
export default Sidebar
