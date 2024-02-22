import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './page/AuthContext';
import Signup from './page/Signup';
import Login from './page/Login';
import Dashboard from './components/Dashboard';
import Procesos from './components/Procesos';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth(); // useAuth hook from AuthContext

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <section>
            <Routes>
              <Route path='/' element={<Signup />} />
              <Route path='/login' element={<Login />} />
              <Route path='/procesos' element={<Procesos />} />
              <Route 
                path='/dashboard' 
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                } 
              />
            </Routes>
          </section>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
