import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useTheme } from '../../../../context/ThemeContext';

export const FeatureGrid: React.FC = () => {
  const { isDark, cardBgClass, textPrimaryClass } = useTheme();

  return (
    <View className="px-5 mt-5 flex-row flex-wrap gap-3.5 justify-between">
      {/* Card 1: Safe Route */}
      <View className={`w-[48%] rounded-3xl p-4 border justify-between ${cardBgClass}`}>
        <View className="w-10 h-10 bg-blue-500/20 rounded-2xl items-center justify-center mb-2">
          <Text className="text-base">📍</Text>
        </View>
        <Text className={`text-base font-bold mb-3 ${textPrimaryClass}`}>
          Safe Route
        </Text>
        <Pressable
          className={`px-3.5 py-2 rounded-full flex-row items-center justify-between active:opacity-80 ${
            isDark ? 'bg-slate-800' : 'bg-[#EDE9FE]'
          }`}
        >
          <Text className="text-xs font-bold text-amber-500">Navigate</Text>
          <View className="w-5 h-5 bg-amber-500 rounded-full items-center justify-center">
            <Text className="text-white text-[10px] font-bold">➔</Text>
          </View>
        </Pressable>
      </View>

      {/* Card 2: Emergency Help */}
      <View className={`w-[48%] rounded-3xl p-4 border justify-between ${cardBgClass}`}>
        <View className="w-10 h-10 bg-red-500/20 rounded-2xl items-center justify-center mb-2">
          <Text className="text-base">❗</Text>
        </View>
        <Text className={`text-base font-bold mb-3 ${textPrimaryClass}`}>
          Emergency Help
        </Text>
        <Pressable
          className={`px-3.5 py-2 rounded-full flex-row items-center justify-between active:opacity-80 ${
            isDark ? 'bg-slate-800' : 'bg-[#EDE9FE]'
          }`}
        >
          <Text className="text-xs font-bold text-amber-500">Get Help</Text>
          <View className="w-5 h-5 bg-amber-500 rounded-full items-center justify-center">
            <Text className="text-white text-[10px] font-bold">➔</Text>
          </View>
        </Pressable>
      </View>

      {/* Card 3: Share Location */}
      <View className={`w-[48%] rounded-3xl p-4 border justify-between ${cardBgClass}`}>
        <View className="w-10 h-10 bg-emerald-500/20 rounded-2xl items-center justify-center mb-2">
          <Text className="text-base">🔗</Text>
        </View>
        <Text className={`text-base font-bold mb-3 ${textPrimaryClass}`}>
          Share Location
        </Text>
        <Pressable
          className={`px-3.5 py-2 rounded-full flex-row items-center justify-between active:opacity-80 ${
            isDark ? 'bg-slate-800' : 'bg-[#EDE9FE]'
          }`}
        >
          <Text className="text-xs font-bold text-amber-500">Share Now</Text>
          <View className="w-5 h-5 bg-amber-500 rounded-full items-center justify-center">
            <Text className="text-white text-[10px] font-bold">➔</Text>
          </View>
        </Pressable>
      </View>

      {/* Card 4: Location Reviews */}
      <View className={`w-[48%] rounded-3xl p-4 border justify-between ${cardBgClass}`}>
        <View className="w-10 h-10 bg-amber-500/20 rounded-2xl items-center justify-center mb-2">
          <Text className="text-base">💬</Text>
        </View>
        <Text className={`text-base font-bold mb-3 ${textPrimaryClass}`}>
          Location Reviews
        </Text>
        <Pressable
          className={`px-3.5 py-2 rounded-full flex-row items-center justify-between active:opacity-80 ${
            isDark ? 'bg-slate-800' : 'bg-[#EDE9FE]'
          }`}
        >
          <Text className="text-xs font-bold text-amber-500">
            View Reviews
          </Text>
          <View className="w-5 h-5 bg-amber-500 rounded-full items-center justify-center">
            <Text className="text-white text-[10px] font-bold">➔</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};
