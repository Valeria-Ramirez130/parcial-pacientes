const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware para analizar el cuerpo de las solicitudes
app.use(express.json());

// Conectar a la base de datos
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB - parcialdb'))
  .catch(err => console.error('No se pudo conectar a MongoDB', err));

// Definir una ruta de ejemplo
app.get('/', (req, res) => {
  res.send('¡Servidor en funcionamiento!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
