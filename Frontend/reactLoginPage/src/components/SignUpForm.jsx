import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const selector = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let error = '';
    if (name === 'name' && !value.trim()) {
      error = 'Name is required.';
    }
    if (name === 'email') {
      if (!value.trim()) {
        error = 'Email is required.';
      } else if (
        !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)
      ) {
        error = 'Enter a valid email address.';
      }
    }
    if (name === 'password') {
      if (!value) {
        error = 'Password is required.';
      } else if (value.length < 6) {
        error = 'Password must be at least 6 characters.';
      }
    }
    if (name === 'confirmPassword') {
      if (!value) {
        error = 'Confirm password is required.';
      } else if (value !== formData.password) {
        error = 'Passwords do not match.';
      }
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
      console.log('Sign up:', formData);
      axios.post('http://localhost:5000/api/auth/register',formData)
      navigate('/signin');
    }
  };

  return (
    <div className="card shadow-lg border-0">
      <div className="card-body p-5">
        <h2 className="text-center mb-4">Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <div className="input-group">
              <span className="input-group-text">
                <User size={18} />
              </span>
              <input
                type="text"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                placeholder="Full name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>
          </div>
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
          <div className="mb-3">
            <div className="input-group">
              <span className="input-group-text">
                <Lock size={18} />
              </span>
              <input
                type="password"
                className={`form-control ${
                  errors.confirmPassword ? 'is-invalid' : ''
                }`}
                placeholder="Confirm password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <div className="invalid-feedback">
                  {errors.confirmPassword}
                </div>
              )}
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">
            Sign Up
          </button>
          <p className="text-center mb-0">
            Already have an account?{' '}
            <Link to="/signin" className="text-decoration-none">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
