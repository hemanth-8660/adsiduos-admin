import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from "./components/Auth/Login"; 
import Register from "./components/Auth/Register"
import Home from "./pages/Home";
import React,{useEffect, useState} from "react";
import { jwtDecode } from 'jwt-decode';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const AuthToggle = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-container container">
      <div className="auth-toggle-buttons">
        <button
          className={isLogin ? 'active' : ''}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={!isLogin ? 'active' : ''}
          onClick={() => setIsLogin(false)}
        >
          Register
        </button>
      </div>
      <div className="auth-form">
          {isLogin ? <Login /> : <Register />}
      </div>
    </div>
  );
};

function App() {
    const token = localStorage.getItem('token');
    if (token) {
        useEffect(() => {
        const decode = jwtDecode(token);
        const now = Date.now()/1000;
        
        if (decode.exp < now) {
          localStorage.removeItem(token);
          alert('session expired, please login ....');
          <Login/>
        }
      }, []);
    } 
  
    return (
      <Router>
        <Routes>
          <Route path='/' element={<AuthToggle />}/>
          <Route path='/home' element={<Home />}/>
        </Routes>
      </Router>
    )
}

export default App
