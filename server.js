const express = require("express");
const cors = require("cors");
const connectDB = require("./config");
const routes = require("./routes");
const dotenv = require("dotenv");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);
});