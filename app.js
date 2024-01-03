const express = require("express");

const app = express();

const PORT = process.env.PORT || 5000;

const product_routes = require("./routes/products");

app.get("/", (req, res) => {
    res.send("Hi I am Alive!!");
});

// middleware or to set up router

app.use("/api/products", product_routes);

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