import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreatePoll from './pages/CreatePoll';
import PollPage from './pages/PollPage';
import PollList from './pages/PollList';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
return (
<div>
<Navbar />
<main className="container">
<Routes>
<Route path="/" element={<PollList />} />
<Route path="/signup" element={<Signup />} />
<Route path="/login" element={<Login />} />
<Route path="/poll/:id" element={<PollPage />} />
<Route
path="/create"
element={
<PrivateRoute>
<CreatePoll />
</PrivateRoute>
}
/>
<Route
path="/dashboard"
element={
<PrivateRoute>
<Dashboard />
</PrivateRoute>
}
/>
</Routes>
</main>
</div>
);
}