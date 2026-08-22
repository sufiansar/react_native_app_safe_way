import React from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { HomeScreenView } from '@/features/home/screens/HomeScreenView';

export default function HomeRoute() {
  return (
    <ThemeProvider>
      <HomeScreenView />
    </ThemeProvider>
  );
}
