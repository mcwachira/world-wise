import React from 'react'
import Sidebar from "../components/Sidebar.tsx";
import styles from './AppLayout.module.css'
import Map from "../components/Map.tsx";
import User from "../components/User.tsx";
const AppLayout = () => {
    return (
        <div className={styles.app}>

            <Sidebar/>
            <Map/>
            <User/>
        </div>
    )
}
export default AppLayout
