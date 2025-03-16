import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function LoadingScreen() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
