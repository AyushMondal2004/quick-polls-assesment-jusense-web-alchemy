import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { Link } from 'react-router-dom';


export default function Dashboard() {
const [polls, setPolls] = useState([]);


useEffect(() => {
async function fetchMine() {
try {
const res = await API.get('/polls/mine');
setPolls(res.data);
} catch (e) {
console.error(e);
}
}
fetchMine();
}, []);


return (
<div>
<h2>Your polls</h2>
<Link to="/create">Create new poll</Link>
<ul>
{polls.map((p) => (
<li key={p._id}>
<Link to={`/poll/${p._id}`}>{p.title}</Link>
</li>
))}
</ul>
</div>
);
}