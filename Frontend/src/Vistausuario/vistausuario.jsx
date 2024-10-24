// import React, { useState } from 'react';

// export function VistaUsuario() {
//     const [codigo, setCodigo] = useState('');
//     const [mensaje, setMensaje] = useState('');

//     const handleConsultarCodigo = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await fetch('http://localhost:5000/api/codigos/verificarCodigo', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ codigo }),
//             });

//             const data = await response.json();
//             if (response.ok) {
//                 setMensaje(data.message); // Mostrar el mensaje del premio
//             } else {
//                 setMensaje(data.message); // Mensaje de error si el código no es válido
//             }
//         } catch (error) {
//             console.error("Error al consultar el código:", error);
//             setMensaje('Hubo un error al consultar el código.');
//         }
//     };

//     return (
//         <div>
//             <h1>Registrar y consultar código</h1>
//             <form onSubmit={handleConsultarCodigo}>
//                 <label htmlFor="codigo">Introduce tu código:</label>
//                 <input
//                     type="text"
//                     id="codigo"
//                     value={codigo}
//                     onChange={(e) => setCodigo(e.target.value)}
//                     required
//                 />
//                 <button type="submit">Consultar</button>
//             </form>
//             {mensaje && <p>{mensaje}</p>}
//         </div>
//     );
// }

// export default VistaUsuario;
