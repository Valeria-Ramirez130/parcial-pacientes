import mongoose from 'mongoose';
import express from 'express';
import {config} from 'dotenv';

config();
const app = express();

app.get('/', (req, res) =>{
    res.end('Servidor prendido');
})

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB - parcialdb'))
  .catch(err => console.error('No se pudo conectar a MongoDB', err));


app.listen(5000, ()=>{
    console.log('El servidor esta corriendo correctamente');
})