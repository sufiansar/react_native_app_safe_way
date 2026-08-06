import React from 'react';
import { View, ViewProps } from 'react-native';

interface ScreenWrapperProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
}

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
