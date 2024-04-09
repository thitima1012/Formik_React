/* eslint-disable no-unused-vars */
import React from 'react';
import SignupForm from './form';
import 'bootstrap/dist/css/bootstrap.min.css';

function Registration() {
  return (
    <section className="container mt-4">
      <div className="mb-4">
        <div className="card border-0 shadow p-4">
          <h3 className="fw-bolder my-4 text-center">ลงทะเบียน</h3>
          <SignupForm />
        </div>
      </div>
    </section>
  );
}

export default Registration;
