import { Button } from '@mui/material';
import { Icon } from '@iconify/react';
import { useTemperatura } from './TemperaturaContext';
import type { LeituraTTN } from './services/temperaturaService';

function arrayToCSV(data: LeituraTTN[]) {
  const header = 'Timestamp,Temperatura,Umidade\n';
  const rows = data
    .map((item) =>
      `${new Date(item.timestamp).toISOString()},${item.temperatura},${item.umidade}`,
    )
    .join('\n');
  return header + rows;
}

export default function DownloadCsvButton() {
  const { historico } = useTemperatura();

  const handleDownload = () => {
    const csv = arrayToCSV(historico);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'temperaturas.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Button
      variant="contained"
      startIcon={<Icon icon="mdi:download" width={24} height={24} />}
      onClick={handleDownload}
      disabled={historico.length === 0}
    >
      Exportar CSV
    </Button>
  );
}
