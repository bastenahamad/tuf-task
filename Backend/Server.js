const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log(process.env.DB_PASSWORD)

const db = mysql.createConnection({
  host: "bnibenmymuw9exgept14-mysql.services.clever-cloud.com",
  user: "u5gl1tkiycboaray",
  password: `${process.env.DB_PASSWORD}`,
  database: "bnibenmymuw9exgept14",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

app.post("/create", (req, res) => {
  console.log(req);
  const options = {
    timeZone: "Asia/Kolkata",
    hour12: false,
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
    const username = req.body.username;
    const lang = req.body.lang;
    const code = req.body.code;
    const stdin = req.body.stdin;
    const time = new Date().toLocaleString("en-IN", options);

    db.query("INSERT INTO submit_db (time, username, language, code, stdin) VALUES (?,?,?,?,?)", [time, username, lang, code, stdin], (err, data) => {
      if(err) console.log(err);
      else return res.json(data);
    });
})

app.get("/", (req, res)=> {
  const q = "SELECT * FROM submit_db";
  db.query(q, (err, data) => {
    if(err) console.log(err);
    else return res.json(data);
  })
});

app.listen(8081, ()=> {
  console.log("Listening at port 8081");
})
