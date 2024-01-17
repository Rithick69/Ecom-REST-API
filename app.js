const express = require("express");

const { port } = require("./config");

const app = express();

const PORT =  port;

const product_routes = require("./routes/products");
const user_routes = require("./routes/user");

const connectDB = require("./db/connect");

const errorMiddleware = require("./middleware/error-middleware");

app.get("/", (req, res) => {
    res.send("Hi I am Alive!!");
});

// middleware or to set up router

app.use(express.json());

app.use("/auth", user_routes);

app.use("/api/products", product_routes);

// Error middleware should be used last

app.use(errorMiddleware);

const start = async () => {
    try {
        await connectDB();
        app.listen(PORT, ()=> {
            console.log(`${PORT} I am connected`);
        });
    } catch(e) {
        console.log(e);
        const message = "Connection Failed";
        const details = e;
        next({message, details});
    }
}

start();