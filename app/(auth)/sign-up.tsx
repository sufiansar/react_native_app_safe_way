import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';

import { Input, ScreenWrapper } from '@/components';
import { userApi, authApi, setAuthToken } from '@/services/api';

export default function SignUpScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    if (!agreeTerms) {
      setErrorMessage('You must agree to the Terms of Service.');
      return;
    }

    setErrorMessage('');
    setLoading(true);

    try {
      const res = await userApi.registerUser({
        name: name.trim(),
        email: email.trim(),
        passwordHash: password,
      });

      if (res.success) {
        // Attempt login immediately after registration to fetch token
        const loginRes = await authApi.login({
          email: email.trim(),
          passwordHash: password,
        });

        if (loginRes.success && loginRes.data) {
          const token =
            loginRes.data.token ||
            loginRes.data.accessToken ||
            loginRes.data.tempToken;

          if (token) {
            setAuthToken(token);
          }
        }

        router.replace('/home');
      } else {
        setErrorMessage(res.message || 'Registration failed. Please try again.');
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
                Create Account
              </Text>
              <Text className="text-base text-slate-500 dark:text-slate-400 mt-2 text-center">
                Join Safeway today and get started
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
                label="Full Name"
                placeholder="John Doe"
                value={name}
                onChangeText={setName}
              />

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

              <Input
                label="Confirm Password"
                placeholder="••••••••"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                isPassword
              />

              {/* Terms Checkbox */}
              <Pressable
                onPress={() => setAgreeTerms(!agreeTerms)}
                className="flex-row items-center mb-6"
              >
                <View
                  className={`w-5 h-5 rounded-md border items-center justify-center mr-2.5 ${
                    agreeTerms
                      ? 'bg-amber-500 border-amber-500'
                      : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
                  }`}
                >
                  {agreeTerms && <Text className="text-white text-xs font-bold">✓</Text>}
                </View>
                <Text className="text-xs text-slate-600 dark:text-slate-400 flex-1 leading-5">
                  I agree to the{' '}
                  <Text className="font-semibold text-amber-600 dark:text-amber-400">
                    Terms of Service
                  </Text>{' '}
                  and{' '}
                  <Text className="font-semibold text-amber-600 dark:text-amber-400">
                    Privacy Policy
                  </Text>
                </Text>
              </Pressable>

              {/* Submit Button */}
              <Pressable
                onPress={handleSignUp}
                disabled={loading}
                className="w-full bg-amber-500 active:bg-amber-600 rounded-full py-4 items-center justify-center shadow-md shadow-amber-500/30"
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text className="text-white font-bold text-base">Create Account</Text>
                )}
              </Pressable>
            </View>

            {/* Bottom Sign In Prompt */}
            <View className="flex-row justify-center items-center mt-8">
              <Text className="text-sm text-slate-500 dark:text-slate-400">
                Already have an account?{' '}
              </Text>
              <Link href="/sign-in" asChild>
                <Pressable>
                  <Text className="text-sm font-bold text-amber-600 dark:text-amber-400">
                    Sign In
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
