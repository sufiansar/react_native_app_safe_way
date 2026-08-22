import React from 'react';
import { View, Text, Image, ImageBackground, Pressable } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';

interface HomeHeaderProps {
  topInset: number;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({ topInset }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <ImageBackground
      source={require('../../../../assets/images/home_header_bg.png')}
      style={{ paddingTop: Math.max(topInset, 24) + 12 }}
      className="pb-12 px-5 justify-between"
      resizeMode="cover"
    >
      <View className="flex-row items-center justify-between">
        {/* User Profile & Location */}
        <View className="flex-row items-center gap-3">
          <View className="relative">
            <Image
              source={require('../../../../assets/images/avatar_sarah.png')}
              className="w-11 h-11 rounded-full border-2 border-white/80"
            />
            <View className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border border-white" />
          </View>

          <View>
            <View className="flex-row items-center">
              <Text className="text-white font-extrabold text-base">
                Hi, Sarah
              </Text>
              <Text className="ml-1 text-base">👋</Text>
            </View>
            <Pressable className="flex-row items-center bg-white/20 px-2.5 py-1 rounded-full mt-1">
              <Text className="text-xs text-white">📍 123 Main St, SF</Text>
              <Text className="text-[10px] text-white/80 ml-1">▼</Text>
            </Pressable>
          </View>
        </View>

        {/* Action Buttons: 1-Click Dark Mode Toggle + Notification Bell */}
        <View className="flex-row items-center gap-2">
          {/* 1-Click Dark Mode Toggle */}
          <Pressable
            onPress={toggleTheme}
            className={`w-11 h-11 rounded-full items-center justify-center shadow-md active:scale-95 ${
              isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white'
            }`}
          >
            <Text className="text-lg">{isDark ? '🌙' : '☀️'}</Text>
          </Pressable>

          {/* Notification Bell */}
          <Pressable
            className={`w-11 h-11 rounded-full items-center justify-center shadow-md relative active:opacity-80 ${
              isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white'
            }`}
          >
            <Text className="text-lg">🔔</Text>
            <View className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border border-white" />
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
};
