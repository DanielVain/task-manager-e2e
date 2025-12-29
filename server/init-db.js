const sqlite3 =  require('sqlite3').verbose();
const path = require('path');

const DB_FILE = path.join(__dirname, "tasks.db");
const db = new sqlite3.Database(DB_FILE);

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS tasks (
        id TEXT primary key, 
        title TEXT not null,
        done INTEGER NOT NULL,
        updatedAt TEXT NOT NULL
            )`);
    console.log("Database created, ", DB_FILE);
})

db.close();