import express, { json } from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import cors from 'cors';
import routerUsuarios from './rutas/usuario.js';
import routerCodigos from './rutas/codigo.js';

config();
const app = express();

app.use(cors());
app.use(json()); // Esto debe estar antes de las rutas

// Rutas de la API
app.use('/api/usuario', routerUsuarios); // Esto debe contener las rutas para usuarios
app.use('/api/codigos', routerCodigos); // Agrega las rutas para códigos

app.get('/', (req, res) => {
    res.end('Servidor prendido');
});

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conectado a MongoDB');
    })
    .catch(err => console.error('No se pudo conectar a MongoDB', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`El servidor está corriendo en el puerto ${PORT}`);
});
