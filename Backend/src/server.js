import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import verifyToken from './middleware/verifyToken.js';

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/', authRoutes);
app.use('/users', userRoutes);


app.get('/', (req, res) => {
    res.json({
        message: 'Servidor funcionando!',
        practice: 'Laboratorio 8 - UCA'
    });
});

app.get('/protected', verifyToken, (req, res) => {
    res.json({
        message: '¡Has accedido a la ruta protegida!',
        user: req.user
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log('Rutas disponibles:');
    console.log('GET  /');
    console.log('POST /signin');
    console.log('GET  /protected');
    console.log('GET  /users');
    console.log('POST /users');
});