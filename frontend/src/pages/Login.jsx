import React, { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';


export default function Login() {
const [form, setForm] = useState({ email: '', password: '' });
const [err, setErr] = useState('');
const navigate = useNavigate();


async function handleSubmit(e) {
e.preventDefault();
setErr('');
try {
const res = await API.post('/auth/login', form);
localStorage.setItem('token', res.data.token);
localStorage.setItem('user', JSON.stringify(res.data.user));
navigate('/');
} catch (error) {
setErr(error.response?.data?.msg || 'Login failed');
}
}
return (
<div className="card">
<h2>Login</h2>
{err && <div className="error">{err}</div>}
<form onSubmit={handleSubmit}>
<input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
<input placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
<button type="submit">Login</button>
</form>
</div>
);
}