import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, KeyboardAvoidingView, Platform, ActivityIndicator, Alert } from 'react-native';

import { Input, ScreenWrapper } from '@/components';
import { authApi, setAuthToken } from '@/services/api';

export default function Verify2FAScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const userEmail = (params.email as string) || '';

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleVerify2FA = async () => {
    if (!otp.trim()) {
      setErrorMessage('Please enter the 6-digit 2FA code.');
      return;
    }

    setErrorMessage('');
    setLoading(true);

    try {
      const res = await authApi.verify2FA({
        email: userEmail,
        otp: otp.trim(),
      });

      if (res.success && res.data) {
        const token =
          res.data.token ||
          res.data.accessToken;

        if (token) {
          setAuthToken(token);
        }

        router.replace('/home');
      } else {
        setErrorMessage(res.message || 'Invalid 2FA code. Please try again.');
      }
    } catch (error: any) {
      setErrorMessage(error.message || '2FA verification request failed.');
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
            {/* Header */}
            <View className="items-center mb-8">
              <View className="w-16 h-16 rounded-3xl bg-amber-500 items-center justify-center shadow-lg shadow-amber-500/30 mb-4">
                <Text className="text-white text-3xl font-black">🛡️</Text>
              </View>
              <Text className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight text-center">
                2FA Verification
              </Text>
              <Text className="text-base text-slate-500 dark:text-slate-400 mt-2 text-center">
                Enter the 6-digit authentication code sent to your registered device/email.
              </Text>
            </View>

            {/* Auth Card */}
            <View className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
              {errorMessage ? (
                <View className="bg-red-500/10 border border-red-500/30 rounded-2xl p-3.5 mb-4">
                  <Text className="text-red-500 text-xs font-semibold text-center">
                    {errorMessage}
                  </Text>
                </View>
              ) : null}

              <Input
                label="2FA Verification Code"
                placeholder="123456"
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
                maxLength={6}
              />

              <Pressable
                onPress={handleVerify2FA}
                disabled={loading}
                className="w-full bg-amber-500 active:bg-amber-600 rounded-full py-4 items-center justify-center shadow-md shadow-amber-500/30 mt-2"
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text className="text-white font-bold text-base">Verify & Sign In</Text>
                )}
              </Pressable>
            </View>

            {/* Back Link */}
            <View className="flex-row justify-center items-center mt-8">
              <Pressable onPress={() => router.replace('/sign-in')}>
                <Text className="text-sm font-bold text-amber-600 dark:text-amber-400">
                  ← Back to Sign In
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
