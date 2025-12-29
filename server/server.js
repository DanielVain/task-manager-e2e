require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", routes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`server running on http://localhost:${port}`));