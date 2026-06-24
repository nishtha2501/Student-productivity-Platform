import {useState, useEffect} from "react";
import './App.css'
import Navbar from "./components/Navbar";
import TaskCard from "./components/TaskCard";
function App() {
        const [newTask, setNewTask] = useState(" ");
        const [searchTerm, setSearchTerm] = useState(" ");
        const [filterStatus, setFilterStatus] = useState("All");
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

        function updateStatus(id){
          setTasks(
            tasks.map((task) => { if(task.id === id) {
              if (task.status === "Pending") {
                return { ...task, status: "In Progress"};
              }

              if(task.status === "In Progress"){
                return { ...task , status:"Completed"};
              }
              return {...task, status:"Pending"};}
                return task;
       
            })
          );
        }

        const totalTasks = tasks.length;
        const pendingTasks = tasks.filter( (task)=> task.status === "Pending").length;
        const inProgressTasks = tasks.filter( (task)=> task.status === "In Progress").length;
        const completedTasks = tasks.filter((task)=> task.status === "Completed").length;
        const filteredTasks = tasks.filter((task)=> { const matchesSearch = task.title.toLowerCase().includes(searchTerm.trim().toLowerCase());
          const matchesStatus=filterStatus ==="All" || task.status===filterStatus;
          return matchesSearch && matchesStatus;
        });

        const remainingTasks = tasks.filter((task) => task.status !== "Completed").length;
        

        function clearCompleted(){
          setTasks( tasks.filter((task)=> task.status !=="Completed"));
        }
        
        console.log(tasks);
  return (
    <>
        <Navbar/>
        <div ClassName="container">
        <div className="stats">

          {remainingTasks>0? (
          <h2>You have {remainingTasks} tasks remaining</h2>
        ): (
          <h2>All tasks completed</h2>
        )}

          <div className="stat-card">
            <h3>Total</h3>
            <p>{totalTasks}</p>
        </div>

        <div className="stat-card">
          <h3>Pending</h3>
          <p>{pendingTasks}</p>
        </div>

        <div className="stat-card">
          <h3>In Progress</h3>
          <p>{inProgressTasks}</p>
        </div>

        <div className="stat-card">
          <h3>Completed</h3>
          <p>{completedTasks}</p>
        </div>
        </div>
          <h1>Nishtha's Productivity Platform</h1>
          <p>I am building my first full-stack project</p>
          <h2>{newTask}</h2>

          <input 
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(event)=> setSearchTerm(event.target.value)}
          />

          <div>
            <button onClick={()=> setFilterStatus("All")}> All</button>
            <button onClick={()=> setFilterStatus("Pending")}> Pending</button>
            <button onClick={()=> setFilterStatus("In Progress")}> In Progress</button>
            <button onClick={()=> setFilterStatus("Completed")}> Completed</button>
            <button onClick={clearCompleted}>Clear Completed</button>
          </div>
          <input
            type="text"
            value={newTask}
            onChange={(event)=> setNewTask(event.target.value)}
          />
          <button onClick={addTask}>Add Task</button>
         {
          filteredTasks.map((task)=>(
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              status={task.status}
              onDelete={deleteTask}
              onStatusChange={updateStatus}
            />
          ))
         }
        </div>       
    </>
  )
}

export default App
