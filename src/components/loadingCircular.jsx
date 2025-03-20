import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function LoadingCircular() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="spinner-border text-primary" role="status" />
    </div>
  );
}
