import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { useTemperatura } from './TemperaturaContext';

export default function UltimasTemperaturas() {
  const { historico } = useTemperatura();

  // Ordena do mais recente para o mais antigo
  const ordenadoDesc = [...historico].sort((a, b) => b.timestamp - a.timestamp);

  // Pega as 10 primeiras (mais recentes)
  const ultimas10 = ordenadoDesc.slice(0, 10);

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        Últimas Leituras (10)
      </Typography>
      <List dense>
        {ultimas10.map(({ timestamp, temperatura, umidade }) => (
          <ListItem key={timestamp}>
            <ListItemText
              primary={`${temperatura} °C / ${umidade} %`}
              secondary={new Date(timestamp).toLocaleTimeString()}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
