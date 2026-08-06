import React, { useState } from 'react';
import { View, Text, TextInput, TextInputProps, Pressable } from 'react-native';

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
  isPassword?: boolean;
  leftIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  isPassword = false,
  leftIcon,
  className = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="w-full mb-4">
      <Text className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
        {label}
      </Text>
      <View
        className={`flex-row items-center bg-slate-50 dark:bg-slate-800 border rounded-2xl px-4 py-3.5 ${
          error
            ? 'border-red-500'
            : isFocused
            ? 'border-blue-600 bg-white dark:bg-slate-900 shadow-sm'
            : 'border-slate-200 dark:border-slate-700'
        }`}
      >
        {leftIcon && <View className="mr-3">{leftIcon}</View>}
        <TextInput
          className={`flex-1 text-base text-slate-900 dark:text-white p-0 ${className}`}
          placeholderTextColor="#94A3B8"
          secureTextEntry={isPassword && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {isPassword && (
          <Pressable onPress={() => setShowPassword(!showPassword)} className="ml-2">
            <Text className="text-xs font-semibold text-blue-600 dark:text-blue-400">
              {showPassword ? 'HIDE' : 'SHOW'}
            </Text>
          </Pressable>
        )}
      </View>
      {error && <Text className="text-xs text-red-500 mt-1 ml-1">{error}</Text>}
    </View>
  );
};
