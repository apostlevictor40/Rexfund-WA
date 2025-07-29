import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div style={{ padding: '20px', textAlign: 'center' }}>
    <h1>Welcome to Rexfunds</h1>
    <p>Invest and earn in Naira</p>
    <Link to="/register">Get Started</Link>
  </div>
);

export default Home;
