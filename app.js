const express = require("express");

const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Hi I am ALive!!");
});

const start = async () => {
    try {
        app.listen(PORT, ()=> {
            console.log(`${PORT} I am connected`);
        });
    } catch(e) {
        console.log(e);
    }
}

start();