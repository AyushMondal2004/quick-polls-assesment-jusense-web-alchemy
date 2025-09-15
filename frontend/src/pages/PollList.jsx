import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { Link } from 'react-router-dom';


export default function PollList() {
const [polls, setPolls] = useState([]);


useEffect(() => {
async function fetchPolls() {
const res = await API.get('/polls');
setPolls(res.data);
}
fetchPolls();
}, []);


return (
<div>
<h2>Recent Polls</h2>
<ul>
{polls.map((p) => (
<li key={p._id} className="poll-item">
<Link to={`/poll/${p._id}`}>{p.title}</Link>
</li>
))}
</ul>
</div>
);
}