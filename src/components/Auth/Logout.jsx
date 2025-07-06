import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');   // remove token
    dispatch(logout());                 // clear user state
    navigate('/');                      // redirect to login/home
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
