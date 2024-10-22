import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ListaUsuario from './ListaUsuarios/ListaUsuarios';
import CrearUsuarios from './CrearUsuario/CrearUsuario';
import EditarUsuario from './EditarUsuario/EditarUsuario';
import './App.css';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container">
            <Link className="navbar-brand" to="/">Parcial</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/crearUsuario">Agregar Usuario</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/listaUsuarios">Listado Usuario</Link>
                </li>
              </ul>
            </div>    
          </div>
        </nav>

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
