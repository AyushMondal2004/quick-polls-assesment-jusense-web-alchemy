import React, { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';


export default function Signup() {
const [form, setForm] = useState({ name: '', email: '', password: '' });
const [err, setErr] = useState('');
const navigate = useNavigate();


async function handleSubmit(e) {
e.preventDefault();
setErr('');
try {
const res = await API.post('/auth/register', form);
localStorage.setItem('token', res.data.token);
localStorage.setItem('user', JSON.stringify(res.data.user));
navigate('/');
} catch (error) {
setErr(error.response?.data?.msg || 'Signup failed');
}
}
return (
<div className="card">
<h2>Signup</h2>
{err && <div className="error">{err}</div>}
<form onSubmit={handleSubmit}>
<input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
<input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
<input placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
<button type="submit">Signup</button>
</form>
</div>
);
}
