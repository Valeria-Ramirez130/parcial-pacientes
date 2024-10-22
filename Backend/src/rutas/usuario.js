import express from 'express';
import mongoose from 'mongoose';

const routerUsuarios = express.Router();
const eschema = mongoose.Schema;

const eschemausuario = new eschema({
    nombre: String, 
    fechaNacimiento: Date,
    cedula: String,
    celular: String, 
    email: String, 
    ciudad: String, 
    contrasena: String,
    idusuario: { type: String, default: () => new mongoose.Types.ObjectId() } // Agregar un ID único por defecto
});

const ModeloUsuario = mongoose.model('usuarios', eschemausuario);

routerUsuarios.post('/agregarusuario', (req, res) => {
    const nuevousuario = new ModeloUsuario({
        nombre: req.body.nombre,
        fechaNacimiento: req.body.fechaNacimiento,
        cedula: req.body.cedula,
        celular: req.body.celular,
        email: req.body.email,
        ciudad: req.body.ciudad,
        contrasena: req.body.contrasena
    });

    // Guardar el nuevo usuario en la base de datos
    nuevousuario.save()
        .then(usuarioGuardado => {
            res.status(201).json({
                message: 'Usuario agregado con éxito',
                usuario: usuarioGuardado
            });
        })
        .catch(err => {
            console.error('Error al agregar usuario:', err);
            res.status(500).json({
                message: 'Error al agregar usuario',
                error: err.message
            });
        });
});

export default routerUsuarios;
