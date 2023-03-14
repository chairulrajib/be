const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const PORT = process.env.PORT;
const app = express();
const cors = require("cors");
const { dbConf } = require("./src/config/db");
const bearerToken = require("express-bearer-token");

app.use(express.json());
app.use(cors());
app.use(bearerToken());

app.get("/", (req, res) => {
  res.status(200).send("<h1>Comfy</h1>");
});

//testing mysql connection
dbConf.getConnection((err, connection) => {
  if (err) {
    console.log(`Error mySQL Connection`, err.message);
  }

  console.log(`Connect MySQL ✅ : ${connection.threadId}`);
});

//config route

const { usersRouter, ordersRouter } = require("./src/routers");
app.use("/users", usersRouter);

app.use("/orders", ordersRouter);

app.listen(PORT, () => console.log(`RUNNING API ${PORT}`));
