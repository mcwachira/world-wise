import styles from "./Login.module.css";
import {useEffect, useState} from "react";
import Navbar from "../components/Navbar.tsx";
import {useAuth} from "../context/FakeAuthContext.tsx";
import {useNavigate} from "react-router-dom";

export default function Login() {
    // PRE-FILL FOR DEV PURPOSES
    const [email, setEmail] = useState("jack@example.com");
    const [password, setPassword] = useState("qwerty");

    const {isAuthenticated, login} = useAuth()

    const navigate = useNavigate()



    const handleLogin =(e) => {
        e.preventDefault()
         login(email, password)
        if(isAuthenticated === true) navigate('/app', {replace:true})
    }
    useEffect(() => {

        if(isAuthenticated === true) navigate('/app')


    },[])

    return (
        <main className={styles.login}>
            <Navbar/>
            <form className={styles.form}>
                <div className={styles.row}>
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>

                <div className={styles.row}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>

                <div>
                    <button onClick={handleLogin}>Login</button>
                </div>
            </form>
        </main>
    );
}
