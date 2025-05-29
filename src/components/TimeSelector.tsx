'use client';

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';

export type Range = '1 dia' | '1 hora' | '30 minutos' | '10 minutos';

interface TimeSelectorProps {
  value: Range;
  onChange: (value: Range) => void;
}

const options: Range[] = ['1 dia', '1 hora', '30 minutos', '10 minutos'];

export default function TimeSelector({ value, onChange }: TimeSelectorProps) {
  const handleChange = (event: SelectChangeEvent<Range>) => {
    onChange(event.target.value as Range);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Período</InputLabel>
      <Select value={value} label="Período" onChange={handleChange}>
        {options.map((opt) => (
          <MenuItem key={opt} value={opt}>
            {opt}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
