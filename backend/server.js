const cors = require("cors");
const express = require("express");

const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

let tasks = [
    {
        id: 1,
        title: "Learn React",
        status: "In Progress"
    },
    {
        id: 2,
        title: "Solve 5 DSA Questions",
        status: "Pending"
    },
    {
        id: 3,
        title: "Build Backend",
        status: "Not Started"
    },
];

app.get("/tasks", (req, res)=> {
    res.json(tasks);
});

app.post("/tasks", (req, res)=> {
    const newTask = req.body;

    tasks.push(newTask);

    res.json({
        message: "Task added successfully",
        tasks,
    });
});

app.delete("/tasks/:id" , (req, res) =>{const id= Number(req.params.id);
    tasks = tasks.filter(task =>
        task.id !==id);

        res.json({
            message: "Task deleted successfully",
            tasks,
        });
});

app.put("/tasks/:id" , (req, res) => {
    console.log("Put route reached!");
    console.log(req.params.id);
    const id = Number(req.params.id);

    tasks = tasks.map((task) => {
        if(task.id === id){
            return req.body;
        }
        return task;
    });
    res.json({
        message: "Task updated successfully",
        tasks,
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
