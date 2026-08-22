import React from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { SettingsScreenView } from '@/features/settings/screens/SettingsScreenView';

export default function SettingsRoute() {
  return (
    <ThemeProvider>
      <SettingsScreenView />
    </ThemeProvider>
  );
}
