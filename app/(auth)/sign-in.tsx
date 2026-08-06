import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, KeyboardAvoidingView, Platform } from 'react-native';

import { Button, Input, ScreenWrapper } from '@/components';

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace('/');
    }, 1000);
  };

  return (
    <ScreenWrapper className="flex-1 bg-slate-50 dark:bg-slate-950">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 justify-center px-6 py-10">
            {/* Top Brand Header */}
            <View className="items-center mb-8">
              <View className="w-16 h-16 rounded-3xl bg-blue-600 items-center justify-center shadow-lg shadow-blue-500/30 mb-4">
                <Text className="text-white text-3xl font-black">A</Text>
              </View>
              <Text className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight text-center">
                Welcome Back
              </Text>
              <Text className="text-base text-slate-500 dark:text-slate-400 mt-2 text-center">
                Sign in to your account to continue
              </Text>
            </View>

            {/* Auth Card Container */}
            <View className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
              <Input
                label="Email Address"
                placeholder="name@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Input
                label="Password"
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                isPassword
              />

              {/* Action Row */}
              <View className="flex-row items-center justify-between mb-6">
                <Pressable
                  onPress={() => setRememberMe(!rememberMe)}
                  className="flex-row items-center"
                >
                  <View
                    className={`w-5 h-5 rounded-md border items-center justify-center mr-2 ${
                      rememberMe
                        ? 'bg-blue-600 border-blue-600'
                        : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
                    }`}
                  >
                    {rememberMe && <Text className="text-white text-xs font-bold">✓</Text>}
                  </View>
                  <Text className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Remember me
                  </Text>
                </Pressable>

                <Pressable>
                  <Text className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                    Forgot Password?
                  </Text>
                </Pressable>
              </View>

              {/* Submit Button */}
              <Button title="Sign In" onPress={handleSignIn} loading={loading} />

              {/* Divider */}
              <View className="flex-row items-center my-6">
                <View className="flex-1 h-[1px] bg-slate-200 dark:bg-slate-800" />
                <Text className="mx-4 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Or continue with
                </Text>
                <View className="flex-1 h-[1px] bg-slate-200 dark:bg-slate-800" />
              </View>

              {/* Social Buttons */}
              <View className="flex-row gap-3">
                <View className="flex-1">
                  <Button variant="social" title="Google" />
                </View>
                <View className="flex-1">
                  <Button variant="social" title="Apple" />
                </View>
              </View>
            </View>

            {/* Bottom Footer Navigation */}
            <View className="flex-row justify-center items-center mt-8">
              <Text className="text-sm text-slate-500 dark:text-slate-400">
                Don't have an account?{' '}
              </Text>
              <Link href="/(auth)/sign-up" asChild>
                <Pressable>
                  <Text className="text-sm font-bold text-blue-600 dark:text-blue-400">
                    Sign Up
                  </Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
