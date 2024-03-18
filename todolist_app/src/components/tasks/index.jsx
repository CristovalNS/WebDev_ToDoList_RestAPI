import { Task } from '../task';
import styles from './tasks.module.css';
import { useState } from 'react';

export function Tasks({ tasks, onDelete, onComplete }) {
  const [showCompleted, setShowCompleted] = useState(false);

  const tasksQuantity = tasks.length;
  const completedTasks = tasks.filter(task => task.isCompleted).length;
  const currentTasks = tasks.filter(task => !task.isCompleted);

  function handleShowCompleted() {
    setShowCompleted(true);
  }

  function handleShowCurrent() {
    setShowCompleted(false);
  }

  return (
    <section className={styles.tasks}>
      <header className={styles.header}>
        <div onClick={handleShowCurrent}>
          <button className={styles.currTaskBtn}>Current Tasks</button>
          <span>{currentTasks.length}</span>
        </div>

        <div onClick={handleShowCompleted}>
          <button className={styles.completedTaskBtn}>Completed tasks </button>
          <span>{completedTasks} of {tasksQuantity}</span>
        </div>
      </header>

      <div className={styles.list}>
        {(showCompleted ? tasks.filter(task => task.isCompleted) : currentTasks).map((task) => (
          <Task key={task.id} task={task} onDelete={onDelete} onComplete={onComplete} />
        ))}
      </div>
    </section>
  )
}
