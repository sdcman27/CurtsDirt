const express = require('express');
const mysql = require('mysql')
const cors = require('cors')

const app = express()
app.use(cors())


const db = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "software",
   database: "crud"

})

app.get('/', (re, res)=>{
    return res.json("From backend")
})


app.get('/users', (req, res)=>{
    const sql = 
})

app.listen(5173, ()=> {
    console.log("listening")
})