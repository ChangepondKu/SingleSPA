import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import Root from "./root.component";
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS
import axios from "axios";
import Cookies from 'js-cookie';
import { navigateToUrl } from 'single-spa';

const App = () => {
  const formData = {
    email: process.env.REACT_APP_USER_EMAIL,
    password: process.env.REACT_APP_USER_PASSWORD,
  };

  const [isAuthenticated, setIsAuthenticated] = useState(
    JSON.parse(localStorage.getItem('isAuthenticated')) ?? false
  );
  const [isStandAloneMode] = useState(
    JSON.parse(localStorage.getItem('isStandAloneMode')) ?? true
  );

  useEffect(() => {
    const authenticate = async () => {
      console.log('Standalone mode:', isStandAloneMode);
      console.log('Is authenticated:', isAuthenticated);

      // If the app is not in standalone mode and the user is not authenticated, redirect to sign-in
      if (!isStandAloneMode && !isAuthenticated) {
        console.log('Not in standalone mode and not authenticated, redirecting to sign-in...');
        navigateToUrl('/auth/signin');
        return;
      }

      // If the user is authenticated, no need to log in again
      if (isAuthenticated) {
        console.log('User already authenticated.');
        return;
      }

      // If the app is in standalone mode, attempt to log in
      if (isStandAloneMode) {
        console.log('Attempting login in standalone mode...');
        try {
          const res = await axios.post('http://localhost:5000/api/auth/login', formData);
          Cookies.set('authToken', res.data.token);
          // localStorage.setItem('isAuthenticated', JSON.stringify(true));
          setIsAuthenticated(true);
          console.log('Login successful, token saved.');
        } catch (err) {
          console.error('Login failed:', err.message);
        }
      }
    };

    authenticate();
  }, [isAuthenticated, isStandAloneMode, formData]);

  return (
    <>
      {isAuthenticated ? <Root /> : null}
    </>
  );
};

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: App,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
