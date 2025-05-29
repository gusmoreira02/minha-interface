'use client';

import { useState } from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';

import Header from './components/Header';
import TimeSelector, { type Range } from './components/TimeSelector';
import Chart from './components/Chart';
import TemperatureBox from './components/TemperatureBox';
import DownloadCsvButton from './components/DownloadCsvButton';
import UltimasTemperaturas from './components/UltimasTemperaturas';
import { TemperaturaProvider } from './components/TemperaturaContext';

export default function App() {
  const [range, setRange] = useState<Range>('10 minutos');

  return (
    <TemperaturaProvider>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
          <Box flex={3}>
            <Stack spacing={4}>
              <Typography variant="h4" fontWeight="bold">
                Dashboard
              </Typography>
              <TimeSelector value={range} onChange={setRange} />
              <Chart range={range} />
              <TemperatureBox />
              <DownloadCsvButton />
            </Stack>
          </Box>
          <Box flex={1}>
            <UltimasTemperaturas />
          </Box>
        </Box>
      </Container>
    </TemperaturaProvider>
  );
}
