'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { buscarTodasTemperaturasTTN } from '../components/services/temperaturaService';
import type { LeituraTTN } from '../components/services/temperaturaService';

interface TemperaturaContextType {
  historico: LeituraTTN[];
}

const TemperaturaContext = createContext<TemperaturaContextType>({ historico: [] });

export function TemperaturaProvider({ children }: { children: React.ReactNode }) {
  const [historico, setHistorico] = useState<LeituraTTN[]>([]);

useEffect(() => {
  let mounted = true;

  const carregar = async () => {
    const dados = await buscarTodasTemperaturasTTN(); // retorna LeituraTTN[]

    if (mounted && dados && dados.length > 0) {
      setHistorico(prev => {
        const novos = [...dados, ...prev]; // concatena arrays

        // Ordena do mais recente para o mais antigo
        novos.sort((a, b) => b.timestamp - a.timestamp);

        // Limita a 50 registros
        return novos.slice(0, 50);  
      });
    }
  };

  carregar();
  const intervalo = setInterval(carregar, 60_000);

  return () => {
    mounted = false;
    clearInterval(intervalo);
  };
}, []);


  return (
    <TemperaturaContext.Provider value={{ historico }}>
      {children}
    </TemperaturaContext.Provider>
  );
}

export const useTemperatura = () => useContext(TemperaturaContext);
