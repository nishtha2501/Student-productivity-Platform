import './App.css'
import Navbar from "./components/Navbar";
import TaskCard from "./components/TaskCard";
function App() {
  

  return (
    <>
        <Navbar/>
        <div ClassName="container">
          <h1>Nishtha's Productivity Platform</h1>
          <p>I am building my first full-stack project</p>
          <TaskCard/>
        </div>       
    </>
  )
}

export default App
