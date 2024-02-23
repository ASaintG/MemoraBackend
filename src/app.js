import express from 'express';
import { pool } from './db.js';
import { PORT } from './config.js';

const app = express();

app.use(express.json()); 

app.get('/', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM Usuarios');
    res.json(rows);
});

app.post('/login', async (req, res) => {
    const { Email, Password } = req.body;

    // Verificar si el usuario existe en la base de datos
    const [rows] = await pool.query('SELECT * FROM Usuarios WHERE Email = ? AND Password = ?', [Email, Password]);

    if (rows.length === 1) {
        // Usuario autenticado
        res.json({ message: 'Login exitoso', usuario: rows[0] });
    } else {
        // Credenciales inválidas
        res.status(401).json({ error: 'Credenciales inválidas' });
    }
});

app.get('/ping', async (req, res) => {
    const [Result] = await pool.query('SELECT "hello world " as RESULT');
    console.log(Result);
    res.json(Result[0]);
});

app.post('/createuser', async (req, res) => {
    const Result = await pool.query('INSERT INTO Usuarios(NombreUsuario,Password,NombreCompleto,Email) VALUES ("Saint","123456","Anthony Saint Hernandez","anthony@gmail.com")');
    res.json(Result);
});

app.listen(PORT);
console.log('server on port 3000 ', PORT);
