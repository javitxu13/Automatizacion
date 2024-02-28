import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './page/AuthContext';
import Signup from './page/Signup';
import Login from './page/Login';
import Dashboard from './components/Dashboard';
import Procesos from './components/Procesos';
import Editarperfil from './perfil/Editarperfil';
import Configuracion from './perfil/Configuracion';
import Notificaciones from './perfil/Notificaciones';
import Inicio from './inicio/Inicio';
import Rol from './inicio/Rol';
import FormularioEmpresa from './inicio/FormularioEmpresa';
import AñadirProcesos from './components/AñadirProcesos';



function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <section>
            <Routes>
              <Route path='/' element={<Signup />} />
              <Route path='/rol' element={<Inicio />} />
              <Route path='/editar-perfil' element={<Editarperfil />} />
              <Route path='/notificaciones' element={<Notificaciones />} />     
              <Route path='/login' element={<Login />} />
              <Route path='/inicio' element={<Rol />} />
              <Route path='/settings' element={<Configuracion />} />
              <Route path='/dashboard' element={<Dashboard />}/>
              <Route path='/procesos' element={<Procesos />}/>
              <Route path='/empresas' element={<FormularioEmpresa />}/>
              <Route path='/AñadirProceso' element={<AñadirProcesos />}/>


            </Routes>
          </section>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
