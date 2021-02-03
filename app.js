// const express = require("express");
// const morgan = require("morgan");
// const cors = require("cors");
// const path = require("path");

// const app = express();

// //init MiddleWare
// app.use(express.json({ extended: false }));
// app.use(morgan("dev"));
// app.use(cors());
// app.use;

// //Define routes
// app.use("/api/users", require("./routes/api/users"));
// app.use("/api/auth", require("./routes/api/auth"));
// app.use("/api/profile", require("./routes/api/profile"));
// app.use("/api/posts", require("./routes/api/posts"));

// //SERVE STATIC ASSETS IN PRODUCTION
// if (process.env.NODE_ENV === "production") {
//   //SET static folder
//   app.use(express.static("client/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

// module.exports = app;
