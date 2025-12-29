const express = require("express");
const db = require("./db");

const r = express.Router();


r.get("/tasks", async (req, res) => {
    res.json(await db.getAll());
});

r.get("/tasks/:id", async (req, res) => {
    const task = await db.getById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
});

r.post("/tasks", async (req, res) => {
    const title = req.body?.title.trim();



    if (!title) return res.status(400).json({ error: "title is required" });

    const task = await db.create({
        id: Date.now(),
        title,
        updatedAt: new Date().toISOString()
    });

    res.status(201).json(task);
});

r.put("/tasks/:id", async (req, res) => {
    const id = req.params.id;

    const updates = { updatedAt: new Date().toISOString() };
    if (typeof req.body?.title === "string")
        updates.title = req.body.title.trim();

    const updated = await db.update(id, updates);
    if (!updated) return res.status(404).json({ error: "Task not found" });

    res.json(updated);
});

r.delete("/tasks/:id", async (req, res) => {
    const ok = await db.remove(req.params.id);
    if (!ok) return res.status(404).json({ error: "Task not found" });
    res.status(204).end();
});

module.exports = r;
