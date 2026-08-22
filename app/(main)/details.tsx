import { Link } from 'expo-router';
import React from 'react';
import { Text, View, Pressable } from 'react-native';

import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { Button } from '@/components';

export default function DetailsScreen() {
  return (
    <ScreenWrapper className="flex-1 items-center justify-center bg-white px-4">
      <View className="items-center justify-center p-6 bg-slate-50 rounded-2xl shadow-sm border border-slate-100 w-full max-w-sm">
        <Text className="text-2xl font-bold text-slate-800 mb-2">
          Details Page
        </Text>
        <Text className="text-base text-gray-600 text-center mb-6">
          This is a secondary page navigated via file-based routing.
        </Text>

        <Link href="/" asChild>
          <Pressable className="bg-amber-500 active:bg-amber-600 px-6 py-3 rounded-xl w-full items-center mb-4">
            <Text className="text-white font-semibold text-base">Back to Home</Text>
          </Pressable>
        </Link>
      </View>
    </ScreenWrapper>
  );
}
