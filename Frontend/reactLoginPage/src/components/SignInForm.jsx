import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { navigateToUrl } from 'single-spa';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';



const SignInForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();


  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = '';
    if (name === 'email') {
      if (!value.trim()) {
        error = 'Email is required.';
      } else if (
        !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)
      ) {
        error = 'Enter a valid email address.';
      }
    }
    if (name === 'password' && !value) {
      error = 'Password is required.';
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update the field's value
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate the field and update errors
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Sign in:', formData);
      axios.post('http://localhost:5000/api/auth/login', formData).then((res) => {
        console.log(res.data.user)
        dispatch({
          type: 'user/setUserDetails',
          payload: res.data.user,
        });
        Cookies.set('authToken', JSON.stringify(res.data.token))
        sessionStorage.setItem('isAuthToken', JSON.stringify(res.data.token));
        localStorage.setItem('isStandAloneMode', false);
        localStorage.setItem('isAuthenticated', true);
        // Proceed with sign-in logic
        navigateToUrl('/home')
      })
        .catch((err) => {
          console.log('Login error', err);
        })

    }
  };

  return (
    <div className="card shadow-lg border-0">
      <div className="card-body p-5">
        <h2 className="text-center mb-4">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <div className="input-group">
              <span className="input-group-text">
                <Mail size={18} />
              </span>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                placeholder="Email address"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
          </div>
          <div className="mb-3">
            <div className="input-group">
              <span className="input-group-text">
                <Lock size={18} />
              </span>
              <input
                type="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">
            Sign In
          </button>
          <p className="text-center mb-0">
            Don't have an account?{' '}
            <Link to="/signup" className="text-decoration-none">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
