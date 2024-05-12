import { useState } from 'react'
import CustomForm from './components/CustomForm'
import EditForm from './components/EditForm'
import TaskList from './components/TaskList'
import UseLocalStorage from "./hooks/UseLocalStorage"
import ThemeSwitcher from './components/ThemeSwitcher'

function App() {
  const [tasks, setTasks] = UseLocalStorage("Todo-List.tasks", []);
  const [editedTask, setEditedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [previousElementFocused, setPreviousElementFocused] = useState(null);

  const addTask = (task) => {
    setTasks(prevState => [...prevState, task]);
  }

  const deleteTask = (id) => {
    setTasks(prevState => prevState.filter(t => t.id !== id));
  }

  const toggleTask = (id) => {
    // not updating UI, only needed to update state
    setTasks(prevState => prevState.map(t => (
      t.id === id ? {...t, checked: !t.checked} : t
    )))
  }

  const updateTask = (task) => {
    setTasks(prevState => prevState.map(t => (
      t.id === task.id ? {...t, name: task.name} : t
    )))
    
    closeEditingMode()
  }

  const closeEditingMode = () => {
    setIsEditing(false);
    previousElementFocused.focus();
  }

  const enterEditMode = (task) => {
    setEditedTask(task);
    setIsEditing(true);
    setPreviousElementFocused(document.activeElement);
  }

  return (
      <div className="container">
        <header> 
          <h1> My Task List </h1>
        </header>
        <CustomForm addTask={addTask}></CustomForm>
        {
          isEditing && 
          <EditForm editedTask={editedTask} updateTask={updateTask} closeEditMode={closeEditingMode}/> 
        }

        {
          tasks && 
          <TaskList tasks={tasks} deleteTask={deleteTask} toggleTask={toggleTask} enterEditMode={enterEditMode}/>
        }
        <ThemeSwitcher />
      </div>
  )
}

export default App
