import React, { useState } from 'react';
import axios from 'axios';

function CrearUsuario() {
    // Definir el estado para cada campo del formulario
    const [nombre, setNombre] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [cedula, setCedula] = useState('');
    const [celular, setCelular] = useState('');
    const [email, setEmail] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [contrasena, setContrasena] = useState('');

    // Función para agregar el usuario
    const agregarUsuario = () => {
        const nuevoUsuario = {
            nombre,
            fechaNacimiento,
            cedula,
            celular,
            email,
            ciudad,
            contrasena
        };

        // Aquí puedes manejar el envío del nuevo usuario a tu API
        console.log(nuevoUsuario);

        axios.post('http://localhost:5000/api/usuario/agregarusuario', nuevoUsuario)
            .then(res => {
                alert(res.data.message); // Mostrar mensaje de éxito
            })
            .catch(err => {
                console.error('Error al agregar usuario:', err);
                alert('Error al agregar usuario. Intenta nuevamente.'); // Manejar error
            });
    };

    return (
        <div className='container'>
            <div className="row">
                <h2 className='mt-4'>Crear Usuario</h2>
            </div>

            <div className="row">
                <div className='col-sm-6 offset-3'>
                    {/* Nombre */}
                    <div className='mb-3'>
                        <label htmlFor='nombre' className='form-label'>Nombre</label>
                        <input
                            type='text'
                            id='nombre'
                            className='form-control'
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)} // Actualiza el estado
                            placeholder='Nombre completo'
                        />
                    </div>

                    {/* Fecha de Nacimiento */}
                    <div className='mb-3'>
                        <label htmlFor='fechaNacimiento' className='form-label'>Fecha de Nacimiento</label>
                        <input
                            type='date'
                            id='fechaNacimiento'
                            className='form-control'
                            value={fechaNacimiento}
                            onChange={(e) => setFechaNacimiento(e.target.value)} // Actualiza el estado
                        />
                    </div>

                    {/* Cédula */}
                    <div className='mb-3'>
                        <label htmlFor='cedula' className='form-label'>Cédula</label>
                        <input
                            type='text'
                            id='cedula'
                            className='form-control'
                            value={cedula}
                            onChange={(e) => setCedula(e.target.value)} // Actualiza el estado
                            placeholder='Número de cédula'
                        />
                    </div>

                    {/* Celular */}
                    <div className='mb-3'>
                        <label htmlFor='celular' className='form-label'>Celular</label>
                        <input
                            type='tel'
                            id='celular'
                            className='form-control'
                            value={celular}
                            onChange={(e) => setCelular(e.target.value)} // Actualiza el estado
                            placeholder='Número de celular'
                        />
                    </div>

                    {/* Email */}
                    <div className='mb-3'>
                        <label htmlFor='email' className='form-label'>Email</label>
                        <input
                            type='email'
                            id='email'
                            className='form-control'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Actualiza el estado
                            placeholder='Correo electrónico'
                        />
                    </div>

                    {/* Ciudad */}
                    <div className='mb-3'>
                        <label htmlFor='ciudad' className='form-label'>Ciudad</label>
                        <input
                            type='text'
                            id='ciudad'
                            className='form-control'
                            value={ciudad}
                            onChange={(e) => setCiudad(e.target.value)} // Actualiza el estado
                            placeholder='Ciudad de residencia'
                        />
                    </div>

                    {/* Contraseña */}
                    <div className='mb-3'>
                        <label htmlFor='contrasena' className='form-label'>Contraseña</label>
                        <input
                            type='password'
                            id='contrasena'
                            className='form-control'
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)} // Actualiza el estado
                            placeholder='Contraseña'
                        />
                    </div>

                    {/* Botón Guardar */}
                    <button onClick={agregarUsuario} className='btn btn-success'>Guardar Usuario</button>
                </div>
            </div>
        </div>
    );
}

export default CrearUsuario;
