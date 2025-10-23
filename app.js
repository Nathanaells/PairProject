const express = require("express");
const app = express();
const port = 3000;
const mainRouter = require("./routes/mainRoutes");
const session = require('express-session')
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "MandateSession",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      sameSite: true,
    },
  })
);

app.use("/", mainRouter);

app.listen(port, () => {
  console.log("Server Berjalan");
});
