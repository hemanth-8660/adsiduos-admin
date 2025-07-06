import React, { useState } from 'react';
import axios from '../../api/axios';

const Register = () => {
    const [form, setForm] = useState({ userName: '', email: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/register', form);
            alert('Registered successfully');
        } catch (err) {
            alert('Registration failed');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" onChange={e => setForm({ ...form, userName: e.target.value })} />
                <input type="email" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
                <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
                <button type="submit">Register</button>
            </form>
        </div>

    );
}

export default Register;