const express = require("express");
const db = require("./db");

const r = express.Router();
//
// r.get('/tasks',async (req, res) => {
//     await res.json(db.getAll());
// })