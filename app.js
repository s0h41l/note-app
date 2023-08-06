require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 8090;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
