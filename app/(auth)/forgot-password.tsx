import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, KeyboardAvoidingView, Platform, ActivityIndicator, Alert } from 'react-native';

import { Input, ScreenWrapper } from '@/components';
import { authApi } from '@/services/api';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1); // Step 1: Send OTP, Step 2: Verify OTP, Step 3: Reset Password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Step 1: Send Forgot Password OTP
  const handleSendOtp = async () => {
    if (!email.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    setErrorMessage('');
    setLoading(true);

    try {
      const res = await authApi.forgotPassword({ email: email.trim() });
      if (res.success) {
        Alert.alert('OTP Sent', 'Password reset code sent to your email address.');
        setStep(2);
      } else {
        setErrorMessage(res.message || 'Failed to send reset code. Please check your email.');
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'Network request failed.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify Reset OTP
  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      setErrorMessage('Please enter the OTP code.');
      return;
    }

    setErrorMessage('');
    setLoading(true);

    try {
      const res = await authApi.verifyResetOtp({
        email: email.trim(),
        otp: otp.trim(),
      });

      if (res.success) {
        setStep(3);
      } else {
        setErrorMessage(res.message || 'Invalid or expired OTP code.');
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'Verification failed.');
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async () => {
    if (!newPassword.trim()) {
      setErrorMessage('Please enter a new password.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setErrorMessage('');
    setLoading(true);

    try {
      const res = await authApi.resetPassword({
        email: email.trim(),
        newPassword: newPassword,
      });

      if (res.success) {
        Alert.alert('Success', 'Password reset successfully! Please sign in with your new password.', [
          { text: 'Sign In', onPress: () => router.replace('/sign-in') },
        ]);
      } else {
        setErrorMessage(res.message || 'Failed to reset password.');
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'Reset password request failed.');
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
                <Text className="text-white text-3xl font-black">🔒</Text>
              </View>
              <Text className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight text-center">
                {step === 1 ? 'Forgot Password' : step === 2 ? 'Verify Reset Code' : 'Set New Password'}
              </Text>
              <Text className="text-base text-slate-500 dark:text-slate-400 mt-2 text-center">
                {step === 1
                  ? 'Enter your email to receive a password reset OTP code'
                  : step === 2
                  ? `Enter the 6-digit code sent to ${email}`
                  : 'Enter your new password below'}
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

              {step === 1 && (
                <>
                  <Input
                    label="Email Address"
                    placeholder="name@example.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />

                  <Pressable
                    onPress={handleSendOtp}
                    disabled={loading}
                    className="w-full bg-amber-500 active:bg-amber-600 rounded-full py-4 items-center justify-center shadow-md shadow-amber-500/30 mt-2"
                  >
                    {loading ? (
                      <ActivityIndicator color="#FFFFFF" />
                    ) : (
                      <Text className="text-white font-bold text-base">Send Reset Code</Text>
                    )}
                  </Pressable>
                </>
              )}

              {step === 2 && (
                <>
                  <Input
                    label="OTP Code"
                    placeholder="123456"
                    value={otp}
                    onChangeText={setOtp}
                    keyboardType="number-pad"
                    maxLength={6}
                  />

                  <Pressable
                    onPress={handleVerifyOtp}
                    disabled={loading}
                    className="w-full bg-amber-500 active:bg-amber-600 rounded-full py-4 items-center justify-center shadow-md shadow-amber-500/30 mt-2"
                  >
                    {loading ? (
                      <ActivityIndicator color="#FFFFFF" />
                    ) : (
                      <Text className="text-white font-bold text-base">Verify OTP</Text>
                    )}
                  </Pressable>
                </>
              )}

              {step === 3 && (
                <>
                  <Input
                    label="New Password"
                    placeholder="••••••••"
                    value={newPassword}
                    onChangeText={setNewPassword}
                    isPassword
                  />

                  <Input
                    label="Confirm New Password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    isPassword
                  />

                  <Pressable
                    onPress={handleResetPassword}
                    disabled={loading}
                    className="w-full bg-amber-500 active:bg-amber-600 rounded-full py-4 items-center justify-center shadow-md shadow-amber-500/30 mt-2"
                  >
                    {loading ? (
                      <ActivityIndicator color="#FFFFFF" />
                    ) : (
                      <Text className="text-white font-bold text-base">Reset Password</Text>
                    )}
                  </Pressable>
                </>
              )}
            </View>

            {/* Back to Sign In Link */}
            <View className="flex-row justify-center items-center mt-8">
              <Link href="/sign-in" asChild>
                <Pressable>
                  <Text className="text-sm font-bold text-amber-600 dark:text-amber-400">
                    ← Back to Sign In
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
