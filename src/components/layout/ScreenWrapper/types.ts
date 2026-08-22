import React from 'react';
import { ViewProps } from 'react-native';

export interface ScreenWrapperProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
}
