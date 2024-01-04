const express = require("express");

const { port } = require("./config");

const app = express();

const PORT =  port;

const product_routes = require("./routes/products");

const connectDB = require("./db/connect");

app.get("/", (req, res) => {
    res.send("Hi I am Alive!!");
});

// middleware or to set up router

app.use("/api/products", product_routes);

const start = async () => {
    try {
        await connectDB();
        app.listen(PORT, ()=> {
            console.log(`${PORT} I am connected`);
        });
    } catch(e) {
        console.log(e);
    }
}

start();