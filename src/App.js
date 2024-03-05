import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './page/AuthContext';
import { DepartamentoProvider } from './components/DepartamentoContext';
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
import { Organizacion } from './components/Organizacion';
import LandingPage from './landing/LandingPage';
import Pricing from './landing/Pricing';
import AñadirDepartamento from './components/AñadirDepartamento';
import FormularioNombre from './inicio/FormularioNombre';
import AñadirColaborador from './components/AñadirColaborador';

function App() {
  return (
    <AuthProvider>
      <DepartamentoProvider>
        <Router>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/procesos' element={<Procesos />} />
            <Route path='/AñadirProceso' element={<AñadirProcesos />} />
            <Route path='/organizacion' element={<Organizacion />} />
            <Route path='/añadir-departamento' element={<AñadirDepartamento />} />
            <Route path='/añadir-colaborador' element={<AñadirColaborador />} />

            {/* Perfil y Configuración */}
            <Route path='/rol' element={<Rol />} />
            <Route path='/editar-perfil' element={<Editarperfil />} />
            <Route path='/settings' element={<Configuracion />} />
            <Route path='/notificaciones' element={<Notificaciones />} />

            {/* Inicio y Empresa */}
            <Route path='/inicio' element={<Inicio />} />
            <Route path='/empresas' element={<FormularioEmpresa />} />
            <Route path='/nombre' element={<FormularioNombre />} />

            {/* Landing y Pricing */}
            <Route path='/pricing' element={<Pricing />} />
          </Routes>
        </Router>
      </DepartamentoProvider>
    </AuthProvider>
  );
}

export default App;
