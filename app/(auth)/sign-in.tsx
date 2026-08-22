import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';

import { Input, ScreenWrapper } from '@/components';
import { authApi, setAuthToken } from '@/services/api';

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    setErrorMessage('');
    setLoading(true);

    try {
      const res = await authApi.login({
        email: email.trim(),
        passwordHash: password,
      });

      if (res.success && res.data) {
        const token =
          res.data.token ||
          res.data.accessToken ||
          res.data.tempToken;

        if (token) {
          setAuthToken(token);
        }

        router.replace('/home');
      } else {
        setErrorMessage(res.message || 'Invalid login credentials. Please try again.');
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'Network request failed. Please check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper className="flex-1 bg-slate-50 dark:bg-slate-950">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
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
              <View className="w-16 h-16 rounded-3xl bg-amber-500 items-center justify-center shadow-lg shadow-amber-500/30 mb-4">
                <Text className="text-white text-3xl font-black">S</Text>
              </View>
              <Text className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight text-center">
                Welcome Back
              </Text>
              <Text className="text-base text-slate-500 dark:text-slate-400 mt-2 text-center">
                Sign in to your Safeway account
              </Text>
            </View>

            {/* Auth Card Container */}
            <View className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
              {errorMessage ? (
                <View className="bg-red-500/10 border border-red-500/30 rounded-2xl p-3.5 mb-4">
                  <Text className="text-red-500 text-xs font-semibold text-center">
                    {errorMessage}
                  </Text>
                </View>
              ) : null}

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
                        ? 'bg-amber-500 border-amber-500'
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
                  <Text className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                    Forgot Password?
                  </Text>
                </Pressable>
              </View>

              {/* Submit Button */}
              <Pressable
                onPress={handleSignIn}
                disabled={loading}
                className="w-full bg-amber-500 active:bg-amber-600 rounded-full py-4 items-center justify-center shadow-md shadow-amber-500/30"
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text className="text-white font-bold text-base">Sign In</Text>
                )}
              </Pressable>

              {/* Divider */}
              <View className="flex-row items-center my-6">
                <View className="flex-1 h-[1px] bg-slate-200 dark:bg-slate-800" />
                <Text className="mx-4 text-xs font-medium text-slate-400 uppercase">
                  or continue with
                </Text>
                <View className="flex-1 h-[1px] bg-slate-200 dark:bg-slate-800" />
              </View>

              {/* Social Login Button */}
              <Pressable
                onPress={() => Alert.alert('Google Auth', 'Google Sign In initiated')}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full py-3.5 flex-row items-center justify-center"
              >
                <Text className="text-lg mr-2">🌐</Text>
                <Text className="text-slate-700 dark:text-slate-200 font-semibold text-sm">
                  Google
                </Text>
              </Pressable>
            </View>

            {/* Bottom Register Prompt */}
            <View className="flex-row justify-center items-center mt-8">
              <Text className="text-sm text-slate-500 dark:text-slate-400">
                Don't have an account?{' '}
              </Text>
              <Link href="/sign-up" asChild>
                <Pressable>
                  <Text className="text-sm font-bold text-amber-600 dark:text-amber-400">
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
