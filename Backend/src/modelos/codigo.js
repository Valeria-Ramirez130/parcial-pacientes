import { model, Schema } from 'mongoose';

const codigoSchema = new Schema({
    codigo: { type: String, required: true, unique: true },
    premio: { type: Number, required: true },
    estado: { type: String, enum: ['libre', 'registrado'], default: 'libre' } // Estado del código
});

const Codigo = model('Codigo', codigoSchema);
export default Codigo;
