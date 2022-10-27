const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const routes = require("./server/routes");

const PORT = process.env.PORT || 9000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((success) => console.log("Database connected succesfully!"))
  .catch((err) => console.log("error connecting to database", err));

const app = express();

app.use(express.json());
app.use(cors());

app.use(routes);

app.get("/test", (req, res) => {
  res.send("app is running just fine");
});

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "client/build")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.listen(PORT, () => console.log(`app is running on port ${PORT}`));
