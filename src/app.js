import express, { query } from 'express';
import {pool}from './db.js'
import {PORT} from './config.js'
const app =express();


app.get('/', async(req, res) => {
    const [rows]= await pool.query('Select * FROM Usuarios')
    res.json(rows);
});

app.get('/ping', async (req, res) => {
    const [Result] =await pool.query('SELECT "hello world " as RESULT')
    console.log (Result);
    res.json(Result[0]);
})

app.post('/createuser', async (req, res)=>{
    const Result = await pool.query('INSERT INTO Usuarios(NombreUsuario,Password,NombreCompleto,Email) VALUES ("Saint","123456","Anthony Saint Hernandez","anthony@gmail.com")')
    res.json(Result);
})

app.listen(PORT)
console.log('server on port 3000 ',PORT);

//logging, morgan, winston