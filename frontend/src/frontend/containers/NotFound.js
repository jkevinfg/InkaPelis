import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <>
    <h1>No encontrado</h1>
    <Link to="/">
      <button type="submit" className="button">Regresa al Home</button>
    </Link>
  </>
);

export default NotFound;
