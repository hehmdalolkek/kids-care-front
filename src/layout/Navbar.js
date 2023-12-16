import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar py-2" style={{backgroundColor: "#7532FA"}} data-bs-theme="dark">
      <div className="container">
        <Link className="navbar-brand fs-3" to='/'>KidsCare</Link>
        <div>
          <Link className='btn btn-outline-light' to='/addgroup'>Добавить группу</Link>
        </div>
      </div>
    </nav>
  );
};
