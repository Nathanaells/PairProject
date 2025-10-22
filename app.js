const express = require('express');
const app = express();
const port = 3000;
const mainRouter = require('./routes/home');
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}));



app.use('/', mainRouter);

app.listen(port, ()=> {
    console.log("Server Berjalan")
})