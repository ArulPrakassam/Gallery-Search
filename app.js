require("dotenv").config();

//security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const express = require("express");
const app = express();
const photosRouter = require("./Routes/photosRoute");

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(cors());

app.get("/", async (req, res) => {
  res.send("<h1>Gallery search App</h1>");
});
app.use("/photos", photosRouter);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
