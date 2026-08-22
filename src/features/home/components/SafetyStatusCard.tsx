import React from 'react';
import { View, Text, Image } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';

export const SafetyStatusCard: React.FC = () => {
  const { isDark, textSecondaryClass } = useTheme();

  return (
    <View
      className={`-mt-8 mx-5 rounded-3xl p-4 shadow-xl flex-row items-center border ${
        isDark
          ? 'bg-slate-900 border-slate-800 shadow-none'
          : 'bg-white border-slate-100 shadow-slate-200/70'
      }`}
    >
      <Image
        source={require('../../../../assets/images/globe_safety.png')}
        className="w-16 h-16 mr-3"
        resizeMode="contain"
      />
      <View className="flex-1">
        <Text className={`text-xs font-semibold mb-0.5 ${textSecondaryClass}`}>
          Current location Safety Status
        </Text>
        <View className="flex-row items-baseline">
          <Text className="text-2xl font-black text-emerald-500 tracking-tight">
            SAFE
          </Text>
          <Text className={`text-xs font-medium ml-2 ${textSecondaryClass}`}>
            9/10 safe reviews
          </Text>
        </View>
      </View>
    </View>
  );
};
