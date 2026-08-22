import React from 'react';
import { Pressable, Text, ActivityIndicator, View } from 'react-native';
import { ButtonProps } from './types';

export const Button = React.forwardRef<View, ButtonProps>(
  (
    {
      title,
      onPress,
      variant = 'primary',
      loading = false,
      disabled = false,
      icon,
      className = '',
      ...props
    },
    ref
  ) => {
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
          return 'bg-amber-500 active:bg-amber-600 shadow-md shadow-amber-500/20';
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
        ref={ref}
        onPress={onPress}
        disabled={disabled || loading}
        className={`flex-row items-center justify-center rounded-2xl py-4 px-6 w-full ${getVariantStyles()} ${
          disabled ? 'opacity-50' : 'opacity-100'
        } ${className}`}
        {...props}
      >
        {loading ? (
          <ActivityIndicator color={variant === 'primary' ? '#FFFFFF' : '#F59E0B'} />
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
  }
);

Button.displayName = 'Button';
