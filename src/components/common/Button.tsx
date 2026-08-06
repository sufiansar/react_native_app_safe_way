import React from 'react';
import { Pressable, Text, ActivityIndicator, View } from 'react-native';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'social';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  icon,
  className = '',
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-slate-100 dark:bg-slate-800 active:bg-slate-200';
      case 'outline':
        return 'bg-transparent border border-slate-300 dark:border-slate-700 active:bg-slate-50 dark:active:bg-slate-800';
      case 'social':
        return 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 active:bg-slate-50 dark:active:bg-slate-700 shadow-sm';
      case 'primary':
      default:
        return 'bg-blue-600 active:bg-blue-700 shadow-md shadow-blue-500/20';
    }
  };

  const getTextVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return 'text-slate-800 dark:text-slate-200';
      case 'outline':
        return 'text-slate-800 dark:text-slate-200';
      case 'social':
        return 'text-slate-700 dark:text-slate-200';
      case 'primary':
      default:
        return 'text-white';
    }
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      className={`flex-row items-center justify-center rounded-2xl py-4 px-6 w-full ${getVariantStyles()} ${
        disabled ? 'opacity-50' : 'opacity-100'
      } ${className}`}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#FFFFFF' : '#3B82F6'} />
      ) : (
        <View className="flex-row items-center justify-center">
          {icon && <View className="mr-3">{icon}</View>}
          <Text className={`text-base font-bold text-center ${getTextVariantStyles()}`}>
            {title}
          </Text>
        </View>
      )}
    </Pressable>
  );
};
