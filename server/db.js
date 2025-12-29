const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const DB_FILE = path.join(__dirname, "tasks.db")
const db = new sqlite3.Database(DB_FILE);

function getAll(query, params) {
    return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
        if (err) reject(err);
        resolve(rows);
    })
    })
}
function get(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

function run(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) return reject(err);
            resolve({ changes: this.changes });
        });
    });
}

exports.getAll = async () => {
    return getAll("SELECT * FROM tasks ORDER BY updatedAt DESC");
}

exports.getById = async (id) => {
    return get('SELECT * FROM tasks WHERE id = ?', [id]);
}

exports.create = async ({id, title, done = 0, updatedAt}) => {
    await run("INSERT INTO tasks (id, title, done, updatedAt) VALUES (?, ?, ?, ?);", [id, title, done, updatedAt]);

    return exports.getById(id);

}

exports.update = async (id,updates) => {
    const current = await exports.getById(id);
    if (!current) return null;
    const title =
        typeof updates.title === "string" ? updates.title : current.title;
    const done =
        typeof updates.done === "string" ? updates.content : current.content;
    await run(
        "UPDATE tasks SET title = ?, done = ?, updatedAt = ? WHERE id = ?",
        [title, done, new Date().toISOString(), id])
}

exports.remove = async (id) => {
    const result = await run("DELETE FROM tasks WHERE id = ?", [id]);
    return result.changes > 0;
};