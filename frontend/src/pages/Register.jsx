import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({ email: '', phone: '', password: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerUser = async () => {
    try {
      await axios.post('https://your-backend-url/register', form);
      alert('Registered successfully');
      window.location.href = '/login';
    } catch (err) {
      alert('Error during registration');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="phone" placeholder="Phone Number" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <button onClick={registerUser}>Register</button>
    </div>
  );
};

export default Register;
