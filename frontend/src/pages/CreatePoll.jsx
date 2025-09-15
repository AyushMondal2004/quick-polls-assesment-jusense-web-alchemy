import React, { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';


export default function CreatePoll() {
const [title, setTitle] = useState('');
const [options, setOptions] = useState(['', '']);
const [err, setErr] = useState('');
const navigate = useNavigate();


function setOptionValue(i, v) {
const arr = [...options];
arr[i] = v;
setOptions(arr);
}


function addOption() {
setOptions([...options, '']);
}


function removeOption(i) {
setOptions(options.filter((_, idx) => idx !== i));
}


async function handleSubmit(e) {
e.preventDefault();
setErr('');
const cleanOptions = options.map((o) => o.trim()).filter(Boolean);
if (!title.trim() || cleanOptions.length < 2) return setErr('Provide title and at least two options');


try {
const res = await API.post('/polls', { title: title.trim(), options: cleanOptions });
navigate(`/poll/${res.data._id}`);
} catch (e) {
setErr(e.response?.data?.msg || 'Create poll failed');
}
}


return (
<div className="card">
<h2>Create Poll</h2>
{err && <div className="error">{err}</div>}
<form onSubmit={handleSubmit}>
<input placeholder="Poll title" value={title} onChange={(e) => setTitle(e.target.value)} />
<div className="options">
{options.map((o, i) => (
<div key={i} className="option-row">
<input value={o} onChange={(e) => setOptionValue(i, e.target.value)} placeholder={`Option ${i + 1}`} />
{options.length > 2 && <button type="button" onClick={() => removeOption(i)}>Remove</button>}
</div>
))}
</div>
<button type="button" onClick={addOption}>Add option</button>
<button type="submit">Create Poll</button>
</form>
</div>
);
}