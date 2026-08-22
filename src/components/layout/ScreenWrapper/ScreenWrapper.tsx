import React from 'react';
import { View } from 'react-native';
import { ScreenWrapperProps } from './types';

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  className = 'flex-1 bg-white dark:bg-gray-900',
  style,
  ...props
}) => {
  return (
    <View className={className} style={style} {...props}>
      {children}
    </View>
  );
};
