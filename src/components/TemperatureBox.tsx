import { Alert, Paper, Typography } from '@mui/material';
import { useTemperatura } from './TemperaturaContext';

export default function TemperatureBox() {
  const { historico } = useTemperatura();
  const ultima = historico[0]; // pega o dado mais recente
  const temperatura = ultima?.temperatura ?? '--';
  const umidade = ultima?.umidade ?? '--';
  const isCritico = temperatura >= 21;

  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Typography variant="h6">Leitura Atual</Typography>
      <Typography variant="h4" color="primary" fontWeight="bold">
        {temperatura} °C
      </Typography>
      <Typography variant="h6" fontWeight="bold" mt={2}>
        Umidade: {umidade} %
      </Typography>

      {isCritico && (
        <Alert severity="error" sx={{ mt: 2 }}>
          Temperatura em estado crítico!
        </Alert>
      )}
    </Paper>
  );
}
