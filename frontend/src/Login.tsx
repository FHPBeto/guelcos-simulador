import { useState } from 'react';
import { Lock, Mail, ArrowRight, ShieldCheck, UserPlus } from 'lucide-react';
import { supabase } from './supabaseClient';

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        alert('Erro no cadastro: ' + error.message);
      } else {
        alert('Cadastro realizado! Agora você pode entrar.');
        setIsSignUp(false);
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        alert('Acesso negado: ' + error.message);
      } else {
        onLogin();
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Luzes de fundo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-red-900/10 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-md w-full relative">
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100">
          <div className="p-10">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-2xl mb-4">
                {isSignUp ? <UserPlus className="text-red-600" size={32} /> : <ShieldCheck className="text-red-600" size={32} />}
              </div>
              <h1 className="text-4xl font-black text-slate-900 italic uppercase tracking-tighter leading-none">
                Guelcos<span className="text-red-600">.</span>
              </h1>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-3">
                {isSignUp ? 'Criar Nova Conta' : 'Intelligence SaaS'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block ml-1">E-mail Corporativo</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-red-500/20 transition-all font-medium" 
                    placeholder="email@empresa.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block ml-1">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-red-500/20 transition-all font-medium" 
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-red-600 transition-all flex items-center justify-center gap-3 shadow-xl disabled:opacity-70 group mt-4"
              >
                {loading ? 'Processando...' : (
                  <>
                    {isSignUp ? 'Criar Minha Conta' : 'Entrar no Sistema'} 
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <div className="text-center mt-6">
                <button 
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-[10px] font-black text-slate-400 uppercase hover:text-red-600 transition-colors tracking-widest"
                >
                  {isSignUp ? 'Já tem uma conta? Faça Login' : 'Não tem conta? Cadastre-se aqui'}
                </button>
              </div>
            </form>
          </div>
        </div>
        <p className="text-center mt-8 text-slate-500 text-[10px] font-bold uppercase tracking-widest leading-none">
          Sistema Restrito • Guelcos Consultoria <br />
          <span className="text-slate-400 italic lowercase font-medium mt-1 inline-block text-[9px]">v1.0.4-beta</span>
        </p>
      </div>
    </div>
  );
}