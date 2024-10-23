import React, { useState } from 'react';
import './CrearUsuario.css'; 
import axios from 'axios';

function CrearUsuario() {
    const [nombre, setNombre] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [cedula, setCedula] = useState('');
    const [celular, setCelular] = useState('');
    const [email, setEmail] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [contrasena, setContrasena] = useState('');

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

        axios.post('http://localhost:5000/api/usuario/agregarusuario', nuevoUsuario)
            .then(res => {
                alert(res.data.message);
                // Restablecer los campos del formulario
            setNombre('');
            setFechaNacimiento('');
            setCedula('');
            setCelular('');
            setEmail('');
            setCiudad('');
            setContrasena('');
            })
            .catch(err => {
                console.error('Error al agregar usuario:', err);
                alert('Error al agregar usuario. Intenta nuevamente.');
            });
    };

    return (
        <div className='container'>
            <h2 className='mt-4'>Crear Usuario</h2>
            <form>
                <div className="row">
                    <div className="col-sm-6">
                        <div className='mb-3'>
                            <label htmlFor='nombre' className='form-label'>Nombre</label>
                            <input
                                type='text'
                                id='nombre'
                                className='form-control'
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                placeholder='Nombre completo'
                            />
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <div className='mb-3'>
                            <label htmlFor='fechaNacimiento' className='form-label'>Fecha de Nacimiento</label>
                            <input
                                type='date'
                                id='fechaNacimiento'
                                className='form-control'
                                value={fechaNacimiento}
                                onChange={(e) => setFechaNacimiento(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-6">
                        <div className='mb-3'>
                            <label htmlFor='cedula' className='form-label'>Cédula</label>
                            <input
                                type='text'
                                id='cedula'
                                className='form-control'
                                value={cedula}
                                onChange={(e) => setCedula(e.target.value)}
                                placeholder='Número de cédula'
                            />
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <div className='mb-3'>
                            <label htmlFor='celular' className='form-label'>Celular</label>
                            <input
                                type='tel'
                                id='celular'
                                className='form-control'
                                value={celular}
                                onChange={(e) => setCelular(e.target.value)}
                                placeholder='Número de celular'
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-6">
                        <div className='mb-3'>
                            <label htmlFor='email' className='form-label'>Email</label>
                            <input
                                type='email'
                                id='email'
                                className='form-control'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Correo electrónico'
                            />
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <div className='mb-3'>
                            <label htmlFor='ciudad' className='form-label'>Ciudad</label>
                            <input
                                type='text'
                                id='ciudad'
                                className='form-control'
                                value={ciudad}
                                onChange={(e) => setCiudad(e.target.value)}
                                placeholder='Ciudad de residencia'
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <div className='mb-3'>
                            <label htmlFor='contrasena' className='form-label'>Contraseña</label>
                            <input
                                type='password'
                                id='contrasena'
                                className='form-control'
                                value={contrasena}
                                onChange={(e) => setContrasena(e.target.value)}
                                placeholder='Contraseña'
                            />
                        </div>
                    </div>
                </div>

                <button type="button" onClick={agregarUsuario} className='btn btn-success'>Guardar Usuario</button>
                </form>
        </div>
    );
}

export default CrearUsuario;
