import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import routerUsuarios from './rutas/usuario.js';
import cors from 'cors'; // Importa CORS

config();
const app = express();

// Middleware para CORS
app.use(cors()); // Esto habilita CORS para todas las rutas

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json()); // Para datos JSON
app.use(express.urlencoded({ extended: true })); // Para datos de formularios URL-encoded

// Usar la ruta importada
app.use('/api/usuario', routerUsuarios);

app.get('/', (req, res) => {
    res.end('Servidor prendido');
});

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB - parcialdb'))
  .catch(err => console.error('No se pudo conectar a MongoDB', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`El servidor está corriendo en el puerto ${PORT}`);
});
