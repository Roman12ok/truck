const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const port = 9000;

require('dotenv').config();

const db = mysql.createPool({
    host: process.env.DB_HOST_NAME,
    user: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM `trucks_detail`";
    db.query(sqlSelect, (err, result) => {
            console.log(err);
            res.send(result);
        });
});

app.post('/api/add', (req, res) => {
    const { Card, Concessionario, Targa, Adr, Carico, Scarico, Concarico, Nome, Telefono } = req.body;
    const sqlInsert = "INSERT INTO `trucks_detail` (Card, Concessionario, Targa, Adr, Carico, Scarico, Concarico, Nome, Telefono) VALUES (?,?,?,?,?,?,?,?,?)";
    db.query(sqlInsert, [Card, Concessionario, Targa, Adr, Carico, Scarico, Concarico, Nome, Telefono], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error while adding post to database');
      } else {
        res.send(result);
      }
    });
  });
  
app.delete('/api/remove/:id', (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM `trucks_detail` WHERE id =?";
  db.query(sqlRemove, [id], (err, result) => {
    if (err) {
      console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.get('/api/get/:id', (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM `trucks_detail` WHERE id =?";
  db.query(sqlGet, [id], (err, result) => {
    if (err) {
      console.log(err);
      } else {
        res.send(result);
      }
  });
});
  
app.put('/api/update/:id', (req, res) => {
  const { id } = req.params;
  const { Card, Concessionario, Targa, Adr, Carico, Scarico, Concarico, Nome, Telefono } = req.body;
  const sqlUpdate = "UPDATE `trucks_detail` SET Card =?, Concessionario =?, Targa =?, Adr =?, Carico =?, Scarico =?, Concarico =?, Nome =?, Telefono =? WHERE id = ?";
  db.query(sqlUpdate, [Card, Concessionario, Targa, Adr, Carico, Scarico, Concarico, Nome, Telefono, id], (err, result) => {
    if (err) {
      console.log(err);
      } else {
        res.send(result);
      }
  });
});
  


app.listen(port, () => console.log(`Example app listening on port ${port}!`));