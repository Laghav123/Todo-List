import TaskItem from './TaskItem'
import styles from './TaskList.module.css'

export const TaskList = ({tasks, deleteTask, toggleTask, enterEditMode}) => {
  return (
    <ul
        className={styles.tasks}
        id='taskList'
    >
        {tasks.sort((a,b) => b.id - a.id).map(task => (
            <TaskItem
                key={task.id}
                task = {task}
                deleteTask = {deleteTask}
                toggleTask = {toggleTask}
                enterEditMode={enterEditMode}
            />
        ))}


    </ul>
  )
}

export default TaskList
