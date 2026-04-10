import { useEffect, useState } from 'react'
import { Wallet, LogOut, CreditCard, LayoutDashboard, Loader2 } from 'lucide-react'
import api from '../services/api' // Garante que esse caminho está certo

interface DashboardProps {
  onLogout: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const [credits, setCredits] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  // 🔄 Essa é a função que busca os dados REAIS
  useEffect(() => {
    async function loadUserData() {
      try {
        // Use o e-mail que você alterou para 999 no Supabase para testar agora
        const response = await api.get('/users/profile/seguro0.6022178006069884@teste.com') 
        setCredits(response.data.credits)
      } catch (error) {
        console.error("Erro ao carregar saldo:", error)
      } finally {
        setLoading(false)
      }
    }
    loadUserData()
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6">
      <header className="max-w-6xl mx-auto flex justify-between items-center mb-12">
        <div className="flex items-center gap-2">
          <div className="bg-emerald-500 p-2 rounded-lg">
            <LayoutDashboard className="text-slate-950" size={24} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Guelcos<span className="text-emerald-500">SaaS</span></h1>
        </div>
        
        <button onClick={onLogout} className="flex items-center gap-2 bg-slate-900 border border-slate-800 hover:bg-red-900/20 px-4 py-2 rounded-full transition-all">
          <LogOut size={18} />
          <span>Sair</span>
        </button>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card de Saldo */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
          <p className="text-slate-400 text-sm font-medium uppercase mb-2">Saldo Disponível</p>
          <div className="flex items-center gap-3 mb-6">
            <Wallet className="text-emerald-500" size={20} />
            {loading ? (
              <Loader2 className="animate-spin text-emerald-500" />
            ) : (
              <h2 className="text-4xl font-bold">{credits} <span className="text-lg text-slate-500 font-normal">créditos</span></h2>
            )}
          </div>
          <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all">
            <CreditCard size={18} />
            Comprar Mais
          </button>
        </div>

        {/* Área do Simulador */}
        <div className="md:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
          <h3 className="text-xl font-semibold mb-2">Bem-vindo ao Simulador</h3>
          <p className="text-slate-500 text-sm max-w-sm">Seu ambiente de simulação está pronto. Comece a processar seus dados agora.</p>
          <div className="mt-8 w-full h-32 border-2 border-dashed border-slate-800 rounded-2xl flex items-center justify-center text-slate-600">
             [ AREA_DE_SIMULACAO_ATIVA ]
          </div>
        </div>
      </main>
    </div>
  )
}