import { FaPlusCircle, FaSignOutAlt } from "react-icons/fa"; 
import todoLogo from '../../assets/todoLogo.svg';
import styles from './header.module.css';
import { useState, useEffect } from 'react';
import { auth } from "../../PasswordLoginFirebase/firebase"; 
import { onAuthStateChanged, signOut } from "firebase/auth";

export function Header({ handleAddTask, userEmail, handleLogout }) { // Correctly receive props
  const [title, setTitle] = useState('');
  const [authUser, setAuthUser] = useState(null)

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
        if (user) {
            setAuthUser(user);
        } else {
            setAuthUser(null);
        }
    })

    return () => {
        listen();
    }

}, []);

  function handleLogoutWrapper() {
    signOut(auth).then(() => {
      console.log("Logout successful");
      handleLogout(); // Directly call handleLogout received as a prop
    }).catch((error) => {
      console.error("Logout error", error);
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!title.trim()) {
      alert("Don't leave the task blank!");
      return;
    }
    handleAddTask(title.trim());
    setTitle('');
  }

  function onChangeTitle(event) {
    setTitle(event.target.value);
  } 

  return (
    <header className={styles.header}>
      <img src={todoLogo} alt="ToDo Logo" />

      <div className={styles.userInfoWrapper}> 
      <span className={styles.userInfo}>Logged in as {authUser?.email}</span>
      <button onClick={handleLogoutWrapper} className={styles.logoutButton}>
        <FaSignOutAlt size={20} />
      </button>
    </div>
      
      <form onSubmit={handleSubmit} className={styles.addTask}>
        <input placeholder="Add a new task" type="text" onChange={onChangeTitle} value={title} />
        <button type="submit"> Add task <FaPlusCircle size={20} /></button>
      </form>
    </header>
    
  )
}
