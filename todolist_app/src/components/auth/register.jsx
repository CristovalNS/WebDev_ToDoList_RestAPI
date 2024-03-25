import React, { useState } from 'react';
import { auth } from "../../PasswordLoginFirebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import styles from './auth.module.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const register = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential);
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <div className={styles.loginContainer}>
            <form onSubmit={register} className={styles.form}>
                <h1> Create an Account </h1>
                <input 
                    type="email" 
                    placeholder='Enter your email'
                    className={styles.input} 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder='Enter your password'
                    className={styles.input} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className={styles.button}> Register </button>
            </form>
        </div>
    )
}

export default Register;
