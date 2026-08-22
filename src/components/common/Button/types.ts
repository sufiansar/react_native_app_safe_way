import React from 'react';

export interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'social';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
}
