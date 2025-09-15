import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


export default function Navbar() {
const navigate = useNavigate();
const token = localStorage.getItem('token');


function logout() {
localStorage.removeItem('token');
localStorage.removeItem('user');
navigate('/');
}


return (
<nav className="nav">
<div className="nav-left">
<Link to="/">QuickPolls</Link>
</div>
<div className="nav-right">
<Link to="/">Polls</Link>
<Link to="/create">Create</Link>
{token ? (
<>
<Link to="/dashboard">Dashboard</Link>
<button onClick={logout}>Logout</button>
</>
) : (
<>
<Link to="/login">Login</Link>
<Link to="/signup">Signup</Link>
</>
)}
</div>
</nav>
);
}