const cors = require("cors");
const express = require("express");

const app = express();
app.use(cors());
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

app.get("/tasks", (req, res) => {
    console.log("Sending 3 tasks");
    res.json([
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
            title: "Build backend",
            status: "Not Started"
        }
    ]);
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
