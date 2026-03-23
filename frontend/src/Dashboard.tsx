import React, { useState } from 'react';
import { supabase } from './supabaseClient';

export default function Dashboard() {
  const [mercadoria, setMercadoria] = useState(0);
  const [cambio, setCambio] = useState(5.20);
  const [loading, setLoading] = useState(false);

  const salvarCalculo = async () => {
    setLoading(true);
    const resultado = mercadoria * cambio;

    const { data, error } = await supabase
      .from("calculos")
      .insert([
        { 
          descricao: 'Simulação de Importação',
          valor_mercadoria: mercadoria,
          resultado_final: resultado
        }
      ]);

    if (error) {
      alert('Erro ao salvar: ' + error.message);
    } else {
      alert('calculo salvo com sucesso no banco!');
    }
    setLoading(false);
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Simulador de Importação</h1>
      <div className="bg-white p-6 rounded-xl shadow-sm max-w-md">
        <label className="block mb-2">Mercadoria (USD)</label>
        <input 
          type="number" 
          className="border p-2 w-full mb-4 rounded"
          onChange={(e) => setMercadoria(Number(e.target.value))}
        />
        
        <label className="block mb-2">Câmbio (BRL)</label>
        <input 
          type="number" 
          className="border p-2 w-full mb-6 rounded"
          defaultValue={cambio}
          onChange={(e) => setCambio(Number(e.target.value))}
        />

        <button 
          onClick={salvarCalculo}
          disabled={loading}
          className="bg-red-600 text-white p-3 w-full rounded-lg font-bold hover:bg-red-700 transition"
        >
          {loading ? 'Salvando...' : 'CALCULAR E SALVAR NO BANCO'}
        </button>
      </div>
    </div>
  );
}