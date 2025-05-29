import { useTemperatura } from './TemperaturaContext';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface Props {
  range: string;
}

const RANGE_TO_MINUTES: Record<string, number> = {
  '10 minutos': 10,
  '30 minutos': 30,
  '1 hora': 60,
  '1 dia': 1440,
};

export default function Chart({ range }: Props) {
  const { historico } = useTemperatura();

  const minutos = RANGE_TO_MINUTES[range] ?? 10;
  const agora = Date.now();
  const dadosFiltrados = historico.filter(
    (item) => agora - item.timestamp <= minutos * 60 * 1000,
  );

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={dadosFiltrados} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="timestamp"
          tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()}
          domain={['auto', 'auto']}
          type="number"
          scale="time"
        />
        <YAxis yAxisId="left" domain={['auto', 'auto']} />
        <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
        <Tooltip labelFormatter={(timestamp) => new Date(timestamp).toLocaleString()} />
        <Line yAxisId="left" type="monotone" dataKey="temperatura" stroke="#8884d8" />
        <Line yAxisId="right" type="monotone" dataKey="umidade" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}
