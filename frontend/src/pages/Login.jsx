import React, {useState} from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      nav('/menu');
    } catch (err) { alert(err.response?.data?.message || err.message); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={submit} className="p-6 bg-white rounded shadow w-full max-w-md">
        <h2 className="text-xl mb-4">Login</h2>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border mb-3"/>
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="w-full p-2 border mb-3"/>
        <button className="w-full p-2 bg-blue-600 text-white rounded">Login</button>
      </form>
    </div>
  )
}
