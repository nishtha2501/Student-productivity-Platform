import {useState, useEffect} from "react";
import './App.css'
import Navbar from "./components/Navbar";
import TaskCard from "./components/TaskCard";
function App() {
        const [newTask, setNewTask] = useState(" ");
        const [tasks, setTasks]= useState(()=> {const savedTasks = localStorage.getItem("tasks");
        return savedTasks
          ? JSON.parse(savedTasks)
          :[
            {
              id: 1,
              title: "Learn React",
              status: "In Progress"
            },
            {
              id: 2,
              title:"Solve 5 DSA Questions",
              status:"Pending"
            },
            {
              id: 3,
              title:"Build Backend",
              status:"Not Started"
            }
          ];
        
      });

        useEffect(()=> { localStorage.setItem("tasks", JSON.stringify(tasks));}, [tasks]);

        function addTask(){
          const task={
            id: Date.now(),
            title: newTask,
            status: "Pending"
          };
          setTasks([...tasks, task]);
          setNewTask(" ");
        }

        function deleteTask(id){
          setTasks(tasks.filter((task)=>task.id !==id));
        }
  
  return (
    <>
        <Navbar/>
        <div ClassName="container">
          <h1>Nishtha's Productivity Platform</h1>
          <p>I am building my first full-stack project</p>
          <h2>{newTask}</h2>
          <input
            type="text"
            value={newTask}
            onChange={(event)=> setNewTask(event.target.value)}
          />
          <button onClick={addTask}>Add Task</button>
         {
          tasks.map((task)=>(
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              status={task.status}
              onDelete={deleteTask}
            />
          ))
         }
        </div>       
    </>
  )
}

export default App
