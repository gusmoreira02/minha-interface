export interface LeituraTTN {
  timestamp: number;
  temperatura: number;
  umidade: number;
}

const API_KEY = import.meta.env.VITE_TTN_API_KEY;
const TTN_URL =
  'https://au1.cloud.thethings.network/api/v3/as/applications/lora-teste-02/packages/storage/uplink_message?last=12h';

export async function buscarTodasTemperaturasTTN(): Promise<LeituraTTN[]> {
  try {
    const res = await fetch(TTN_URL, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        Accept: 'text/event-stream',
      },
    });

    if (!res.ok) {
      console.error('TTN retornou status', res.status);
      return [];
    }

    const text = await res.text();
    // Divide as mensagens completas (JSONs) pelo separador \n\n
    const chunks = text.split('\n\n');

    // Parseia todos e filtra válidos
    const leituras: LeituraTTN[] = chunks
      .map((chunk) => {
        if (!chunk.trim()) return null;
        try {
          const json = JSON.parse(chunk.trim());
          const result = json?.result;
          const message = result?.uplink_message?.decoded_payload?.message;
          const timestamp = result?.received_at;
          if (!message || !timestamp) return null;

          const [tempStr, umidStr] = message.split(' ');
          const temperatura = parseInt(tempStr, 10);
          const umidade = parseInt(umidStr, 10);
          if (Number.isNaN(temperatura) || Number.isNaN(umidade)) return null;

          return {
            timestamp: new Date(timestamp).getTime(),
            temperatura,
            umidade,
          };
        } catch {
          return null;
        }
      })
      .filter((x): x is LeituraTTN => x !== null)
      .sort((a, b) => a.timestamp - b.timestamp); // ordena do mais antigo para o mais recente

    return leituras;
  } catch (error) {
    console.error('Erro ao buscar dados da TTN:', error);
    return [];
  }
}
