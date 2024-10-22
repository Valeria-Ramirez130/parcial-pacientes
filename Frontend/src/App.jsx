import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListaUsuario from './ListaUsuarios/ListaUsuarios';
import CrearUsuarios from './CrearUsuario/CrearUsuario';
import EditarUsuario from './EditarUsuario/EditarUsuario';
import './App.css';

function App() {
  return (
    <div className='App'>
      <h1>Parcial</h1>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<h2>Página de inicio</h2>} />
          <Route path='/crearUsuario' element={<CrearUsuarios />} />
          <Route path='/editarUsuario' element={<EditarUsuario />} />
          <Route path='/listaUsuarios' element={<ListaUsuario />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
