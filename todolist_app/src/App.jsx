import { useEffect, useState } from "react";
import { db, auth } from "./PasswordLoginFirebase/firebase.js"; 
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import LogIn from './components/auth/login';
import Register from "./components/auth/register";
import AuthDetails from "./components/auth/authdetails";
import { Header } from "./components/header";
import { Tasks } from "./components/tasks";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setIsAuthenticated(true);
        setUserEmail(user.email);
        loadTasks(); // Load tasks when user is authenticated
      } else {
        setIsAuthenticated(false);
        setUserEmail('');
        setTasks([]); // Clear tasks when user is not authenticated
      }
    });

    return () => unsubscribe();
  }, []);

  async function loadTasks() {
    const user = auth.currentUser;
    if (user) {
      const tasksQuery = query(collection(db, "tasks"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(tasksQuery);
      const loadedTasks = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(loadedTasks);
    }
  }

  async function addTask(taskTitle) {
    const user = auth.currentUser;
    if (user) {
      await addDoc(collection(db, "tasks"), {
        title: taskTitle,
        isCompleted: false,
        userId: user.uid
      });
      loadTasks(); 
    }
  }

  async function deleteTaskById(taskId) {
    await deleteDoc(doc(db, "tasks", taskId));
    loadTasks(); 
  }

  async function toggleTaskCompletedById(taskId) {
    const taskRef = doc(db, "tasks", taskId);
    const task = tasks.find(task => task.id === taskId);
    if (task) {
      await updateDoc(taskRef, {
        isCompleted: !task.isCompleted
      });
      loadTasks(); 
    }
  }

  return (
    <>
      {!isAuthenticated ? (
        <>
          <LogIn />
          {/* <Register /> */}
          {/* <AuthDetails /> */}
        </>
      ) : (
        <>
          <Header 
            handleAddTask={addTask} 
            userEmail={userEmail} 
            handleLogout={() => signOut(auth)} />
          <Tasks
            tasks={tasks}
            onDelete={deleteTaskById}
            onComplete={toggleTaskCompletedById}
          />
        </>
      )}
    </>
  )
}

export default App;