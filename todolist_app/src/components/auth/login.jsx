import React, { useState } from 'react';
import { auth } from "../../PasswordLoginFirebase/firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import styles from './auth.module.css';

const LogIn = ({ onLoginSuccess }) => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const logIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
                onLoginSuccess(); 
            }).catch((error) => {
                console.log(error);
            });
    };

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log(result);
                onLoginSuccess();
            }).catch((error) => {
                console.log(error);
            });
    };

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
        <div className={styles['login-container']}>
            <form onSubmit={logIn}>
                <h1>Log In to your Account</h1>
                <input
                    type="email"
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles['input']}
                />
                <input
                    type="password"
                    placeholder='Enter your password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles['input']}
                />
                <button type="submit" className={styles['button']}> 
                    Log In
                </button>

                <button onClick={signInWithGoogle} className={styles['button']}> 
                    Log In with Google
                </button>
            </form>

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
    );
    

};

export default LogIn;
