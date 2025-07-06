import React, { useState } from 'react';
import axios from '../../api/axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/login', form);
      if (res.data) {
          localStorage.setItem('token', res.data.token);
          navigate('/home')
      }
      dispatch(setUser(res.data));
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
        <button type="submit">Login</button>
        </form>
    </div>
  );
};

export default Login;