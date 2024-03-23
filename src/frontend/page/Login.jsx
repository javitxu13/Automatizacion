import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from './../../backend/context/AuthContext'; // Ensure this path matches your file structure
import GoogleLogo from '../img/Google.png'; // Ensure the path is correct


const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error('Invalid email or password');
        }

        const data = await response.json();
        navigate("/inicio"); // Ensure the route is correctly defined in your React Router setup
        setUser(data.user); // Make sure the `setUser` function correctly handles the user state
      } catch (error) {
        alert(error.message);
      }
    },
  });

  return (
    <main className="main-container">
      <section className="login-section">
        <div className="login-container">
          <p className="app-title">FocusApp</p>
          <form className="login-form" onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="form-input"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error">{formik.errors.email}</div>
              ) : null}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="form-input"
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error">{formik.errors.password}</div>
              ) : null}
            </div>

            <div className="button-group">
              <button type="submit" className="login-button">Login</button>
              {/* Implement the Google login functionality within this button's onClick handler */}
              <button type="button" className="google-signup-button">
                <img src={GoogleLogo} alt="Google" className="google-logo" />
                Login con Google
              </button>
            </div>
          </form>
          <p className="signup-prompt">
            No account yet? <NavLink to="/" className="signup-link">Sign up</NavLink>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;
