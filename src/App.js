import React, { useState, useEffect } from "react";
import Signup from "./page/Signup";
import Login from "./page/Login";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./page/Firebase";
import Dashboard from "./components/Dashboard";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // User is not signed in
        setUser(null);
      }
    });
  }, []);

  return (
    <Router>
      <div>
        <section>
          <Routes>
            <Route path='/' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Routes>
        </section>
      </div>
    </Router>
  );
}

export default App;
