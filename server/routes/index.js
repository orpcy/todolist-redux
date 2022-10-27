const express = require("express");
const {
  addToDo,
  deleteToDo,
  markAsComplete,
  getUserTodos,
} = require("../controllers/todoController");
const { addUser, login } = require("../controllers/userController");
const app = express();

app.post("/user", addUser);
app.post("/user/login", login);

app.get("/todo/:_id", getUserTodos);
app.post("/todo", addToDo);
app.delete("/todo/:_id", deleteToDo);
app.put("/todo/:_id", markAsComplete);

module.exports = app;
