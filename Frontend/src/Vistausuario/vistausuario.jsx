import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de importar Bootstrap

const VistaUsuario = () => {
    const [codigo, setCodigo] = useState('');
    const [userId, setUserId] = useState(null);
    const [mensaje, setMensaje] = useState('');
    const [codigosRegistrados, setCodigosRegistrados] = useState([]);

    useEffect(() => {
        // Obtén el ID del usuario del almacenamiento local o contexto de tu aplicación
        const id = localStorage.getItem('userId'); // O usa el método que estés usando para obtener el userId
        if (id) {
            setUserId(id);
            obtenerCodigos(id);
        }
    }, []);

    const obtenerCodigos = async (id) => {
        try {
            const response = await axios.get(`/api/codigos/obtenerCodigosUsuario/${id}`);
            setCodigosRegistrados(response.data);
        } catch (error) {
            console.error('Error al obtener códigos:', error);
            setMensaje('Error al obtener los códigos registrados.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userId) {
            setMensaje('No se ha encontrado un ID de usuario. Por favor, inicia sesión nuevamente.');
            return;
        }

        // Verifica que el código no esté vacío
        if (!codigo.trim()) {
            setMensaje('Por favor, ingresa un código válido.');
            return;
        }

        console.log("Código:", codigo);
        console.log("User ID:", userId); // Para verificar los valores

        try {
            const response = await axios.post('/api/codigos/verificarCodigo', { codigo, userId });
            setMensaje(response.data.message);
            // Actualiza la lista de códigos registrados después de verificar uno nuevo
            await obtenerCodigos(userId); // Reutiliza la función para obtener códigos
        } catch (error) {
            if (error.response && error.response.data) {
                setMensaje(error.response.data.error);
            } else {
                setMensaje('Error al verificar el código');
            }
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Verificar Código</h1>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Ingresa tu código"
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary">Verificar</button>
                </div>
            </form>
            {mensaje && <p className="text-danger">{mensaje}</p>}
            <h2 className="mt-4">Códigos Registrados</h2>
            <ul className="list-group">
                {codigosRegistrados.map((codigo) => (
                    <li key={codigo._id} className="list-group-item">
                        {codigo.Codigo} - {codigo.Estado}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VistaUsuario;
