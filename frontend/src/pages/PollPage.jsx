import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/axios';


export default function PollPage() {
const { id } = useParams();
const [poll, setPoll] = useState(null);
const [err, setErr] = useState('');


useEffect(() => {
async function fetchPoll() {
try {
const res = await API.get(`/polls/${id}`);
setPoll(res.data);
} catch (e) {
setErr('Could not load poll');
}
}
fetchPoll();
}, [id]);


async function vote(optionId) {
try {
const res = await API.post(`/polls/${id}/vote`, { optionId });
setPoll(res.data.poll);
} catch (e) {
setErr(e.response?.data?.msg || 'Vote failed');
}
}


if (!poll) return <div>{err || 'Loading...'}</div>;


const total = poll.options.reduce((s, o) => s + (o.votes || 0), 0);


return (
<div className="card">
<h2>{poll.title}</h2>
{err && <div className="error">{err}</div>}
<ul>
{poll.options.map((opt) => (
<li key={opt._id} className="option-row">
<button onClick={() => vote(opt._id)}>{opt.text}</button>
<span className="meta">{opt.votes} votes</span>
<div className="bar" style={{ width: `${total ? (opt.votes / total) * 100 : 0}%` }} />
</li>
))}
</ul>
</div>
);
}