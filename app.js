const express = require("express");
const morgan = require("morgan");

const app = express();

//init MiddleWare
app.use(express.json({ extended: false }));
app.use(morgan("dev"));
app.use;

app.get("/", (req, res) => res.send("API running"));

//Define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

module.exports = app;
