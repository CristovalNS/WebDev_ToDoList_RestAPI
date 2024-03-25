import { useEffect, useState } from "react";
import LogIn from './components/auth/login'
import Register from "./components/auth/register";
import AuthDetails from "./components/auth/authdetails";
import { Header } from "./components/header";
import { Tasks } from "./components/tasks";

const LOCAL_STORAGE_KEY = 'todo:tasks';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [tasks, setTasks] = useState([]);
  

  function loadSavedTasks() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if(saved) {
      setTasks(JSON.parse(saved));
    }
  }

  function setTasksAndSave(newTasks) {
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  }

  useEffect(() => {
    loadSavedTasks();
  }, [])

  function addTask(taskTitle) {
    setTasksAndSave([...tasks, {
      id: crypto.randomUUID(),
      title: taskTitle,
      isCompleted: false
    }]);
  }

  function deleteTaskById(taskId) {
    const newTasks = tasks.filter(task => task.id !== taskId);
    setTasksAndSave(newTasks);
  }

  function toggleTaskCompletedById(taskId) {
    const newTasks = tasks.map(task => {
      if(task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted
        }
      }
      return task;
    });
    setTasksAndSave(newTasks);
  }

  function handleLoginSuccess(email) {
    setIsAuthenticated(true);
    setUserEmail(email); 
  }

  function handleLogout() {
    setIsAuthenticated(false);
    setUserEmail(''); 
  }

  return (
    <>
      {!isAuthenticated ? (
        <>
          <LogIn onLoginSuccess={handleLoginSuccess} />
          <Register />
          <AuthDetails />
        </>
      ) : (
        <>
          <Header 
            handleAddTask={addTask} 
            userEmail={userEmail} 
            handleLogout={handleLogout} />
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