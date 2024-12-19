// auth.js
export const isAuthenticated = () => {
    // Example: Check for a valid token in localStorage or Redux state
    return !localStorage.getItem("authToken");
  };
  
  export const redirectToSignIn = () => {
    window.location.href = "/auth/signin";
  };
  