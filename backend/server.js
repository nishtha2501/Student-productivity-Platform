const Task = require("./models/Task");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
mongoose
.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB Connected"))
.catch((err)=> console.log(err));
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Backend is running!");
});


app.get("/tasks", async (req, res) => {
    try {
        const tasks = await
        Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(5000).json({ message: 
            error.message });
    }
});

app.post("/tasks", async (req, res)=> {
    try{
        const task=await
        Task.create(req.body);
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message:
            error.message});
    }
});

app.delete("/tasks/:id", async (req, res) => {
    try {
        await
        Task.findByIdAndDelete(req.params.id);
        res.json({
            message: "Task deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

app.put("/tasks/:id", async (req, res) => {
    try {
        const updatedtask = await
        Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );
        req.json(updatedtask);
    } catch(error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
