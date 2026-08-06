import { Link } from 'expo-router';
import React from 'react';
import { Text, View, Pressable } from 'react-native';

import { ScreenWrapper, Button } from '@/components';

export default function HomeScreen() {
  return (
    <ScreenWrapper className="flex-1 items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <View className="items-center justify-center p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 w-full max-w-sm">
        <View className="w-14 h-14 rounded-2xl bg-blue-600 items-center justify-center mb-4 shadow-md shadow-blue-500/20">
          <Text className="text-white text-2xl font-black">A</Text>
        </View>
        <Text className="text-2xl font-bold text-slate-900 dark:text-white mb-2 text-center">
          Expo Router App
        </Text>
        <Text className="text-sm text-slate-500 dark:text-slate-400 text-center mb-6">
          Explore file-based routes in <Text className="font-semibold text-slate-700 dark:text-slate-300">app/</Text> with modern UI styling.
        </Text>

        <View className="w-full gap-3">
          <Link href="/(auth)/sign-in" asChild>
            <Button title="Sign In Screen" />
          </Link>

          <Link href="/(auth)/sign-up" asChild>
            <Button variant="outline" title="Sign Up Screen" />
          </Link>

          <Link href="/details" asChild>
            <Button variant="secondary" title="Details Screen" />
          </Link>
        </View>
      </View>
    </ScreenWrapper>
  );
}
