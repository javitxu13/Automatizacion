import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Context Providers
import { AuthProvider } from './backend/context/AuthContext';
import { DepartamentoProvider } from './frontend/components/DepartamentoContext';

// Pages & Components
import LandingPage from './frontend/landing/LandingPage';
import Signup from './frontend/page/Signup';
import Login from './frontend/page/Login';
import Dashboard from './frontend/components/Dashboard';
import Procesos from './frontend/components/Procesos';
import AñadirProcesos from './frontend/components/AñadirProcesos';
import {Departamentos} from './frontend/components/Departamentos';
import AñadirDepartamento from './frontend/components/AñadirDepartamento';
import AñadirColaborador from './frontend/components/AñadirColaborador';
import Editarperfil from './frontend/perfil/Editarperfil';
import Configuracion from './frontend/perfil/Configuracion';
import Notificaciones from './frontend/perfil/Notificaciones';
import Inicio from './frontend/inicio/Inicio';
import FormularioEmpresa from './frontend/inicio/FormularioEmpresa';
import FormularioNombre from './frontend/inicio/FormularioNombre';
import Rol from './frontend/inicio/Rol';
import EmailVerificationPrompt from './frontend/page/EmailVerificationPrompt';
import Pricing from './frontend/landing/Pricing';

function App() {
  return (
    <AuthProvider>
      <DepartamentoProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/procesos" element={<Procesos />} />
            <Route path="/Añadirproceso" element={<AñadirProcesos />} />
            <Route path="/departamentos" element={<Departamentos />} />
            <Route path="/añadir-departamento" element={<AñadirDepartamento />} />
            <Route path="/añadir-colaborador" element={<AñadirColaborador />} />
            <Route path="/rol" element={<Rol />} />
            <Route path="/editar-perfil" element={<Editarperfil />} />
            <Route path="/settings" element={<Configuracion />} />
            <Route path="/notificaciones" element={<Notificaciones />} />
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/empresas" element={<FormularioEmpresa />} />
            <Route path="/nombre" element={<FormularioNombre />} />
            <Route path="/email-verification" element={<EmailVerificationPrompt />} />
            <Route path="/pricing" element={<Pricing />} />
          </Routes>
        </Router>
      </DepartamentoProvider>
    </AuthProvider>
  );
}

export default App;
