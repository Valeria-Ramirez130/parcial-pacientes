import express from 'express';
import { crearCodigo, listarCodigos, verificarCodigo } from '../controladores/codigoControlador.js';

const routerCodigos = express.Router();

// Ruta para crear códigos
routerCodigos.post('/crear', crearCodigo);

// Ruta para listar códigos
routerCodigos.get('/', listarCodigos);

// Ruta para verificar un código
routerCodigos.post('/verificar', verificarCodigo);

export default routerCodigos;
