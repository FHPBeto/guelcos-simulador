import { useState } from 'react';
import api from '../services/api'; // Importa a nossa ponte com o backend

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      // Aqui o frontend chama o backend que você fez no NestJS!
      await api.post('/auth/login', { email, password });
      onLogin(); // Se deu certo, avisa o App para entrar no Dashboard
    } catch (error) {
      alert('E-mail ou senha incorretos!');
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Guelcos SaaS</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="email" 
            placeholder="Seu e-mail"
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white outline-none focus:ring-2 focus:ring-emerald-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Sua senha"
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white outline-none focus:ring-2 focus:ring-emerald-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg transition-all">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}