import React from 'react';
import SignUpForm from '../components/SignUpForm';

const SignUp = () => {
  return (
    <div className="container">
      <div className="row min-vh-100 align-items-center justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default SignUp;