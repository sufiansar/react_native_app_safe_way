import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, KeyboardAvoidingView, Platform } from 'react-native';

import { Button, Input, ScreenWrapper } from '@/components';

export default function SignUpScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace('/home');
    }, 1000);
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
                disabled={!agreeTerms}
                className={`w-full rounded-full py-4 items-center justify-center shadow-md ${
                  agreeTerms
                    ? 'bg-amber-500 active:bg-amber-600 shadow-amber-500/30'
                    : 'bg-slate-300 opacity-60'
                }`}
              >
                <Text className="text-white font-bold text-base">Create Account</Text>
              </Pressable>

              {/* Divider */}
              <View className="flex-row items-center my-6">
                <View className="flex-1 h-[1px] bg-slate-200 dark:bg-slate-800" />
                <Text className="mx-4 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Or register with
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
