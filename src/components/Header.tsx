'use client';

import { AppBar, Box, Toolbar, Typography } from '@mui/material';

export default function Header() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#003865' }}>
      <Toolbar>
        <Box
          component="img"
          src="/image/univali-2.png" 
          alt="Logo Univali"
          sx={{
            height: 40,
            width: 'auto',
            marginRight: 2,
          }}
        />

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Projeto Lora
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
