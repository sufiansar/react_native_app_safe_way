import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  Switch,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../context/ThemeContext';
import { authApi, setAuthToken } from '../../../services/api';

export const SettingsScreenView: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { isDark, toggleTheme, cardBgClass, textPrimaryClass, textSecondaryClass } = useTheme();

  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Handle Real Logout API Call
  const handleLogout = async () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out of your Safeway account?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: async () => {
            setIsLoggingOut(true);
            try {
              await authApi.logout();
            } catch (error) {
              console.log('Logout API error, clearing token locally:', error);
            } finally {
              setAuthToken(null);
              setIsLoggingOut(false);
              router.replace('/sign-in');
            }
          },
        },
      ]
    );
  };

  // Handle Delete Account
  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action is permanent and cannot be undone. Are you sure you want to delete your account?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setAuthToken(null);
            router.replace('/sign-in');
          },
        },
      ]
    );
  };

  return (
    <View className={`flex-1 ${isDark ? 'bg-slate-950' : 'bg-[#FEFDF4]'}`}>
      {/* Header Bar */}
      <View
        style={{ paddingTop: Math.max(insets.top, 16) + 8 }}
        className="px-5 pb-4 flex-row items-center justify-between"
      >
        <Pressable
          onPress={() => router.back()}
          className={`w-10 h-10 rounded-full items-center justify-center shadow-md active:opacity-70 ${
            isDark ? 'bg-slate-800' : 'bg-white border border-slate-100'
          }`}
        >
          <Text className={`text-base font-bold ${textPrimaryClass}`}>‹</Text>
        </Pressable>

        <Text className={`text-xl font-bold text-center ${textPrimaryClass}`}>
          Settings & Activity
        </Text>

        <View className="w-10" />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
        className="flex-1 px-5"
      >
        {/* Search Bar */}
        <View
          className={`flex-row items-center rounded-full px-4 h-12 my-3 border ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <Text className="text-slate-400 mr-2 text-base">🔍</Text>
          <TextInput
            placeholder="Search....."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className={`flex-1 text-sm ${textPrimaryClass}`}
          />
        </View>

        {/* Complete Verification Banner */}
        <View
          className={`rounded-3xl p-4 my-2 border flex-row items-center justify-between ${
            isDark
              ? 'bg-purple-950/40 border-purple-800'
              : 'bg-purple-50/80 border-purple-200'
          }`}
        >
          <View className="flex-1 pr-3">
            <Text
              className={`text-sm font-extrabold mb-0.5 ${
                isDark ? 'text-purple-200' : 'text-purple-900'
              }`}
            >
              Complete Verification
            </Text>
            <Text className="text-xs text-purple-600 dark:text-purple-300">
              Verify your profile to get a badge.
            </Text>
          </View>

          <Pressable
            onPress={() => Alert.alert('Verification', 'Upload Government ID to get verified')}
            className="bg-purple-600 active:bg-purple-700 px-5 py-2 rounded-full shadow-sm"
          >
            <Text className="text-white text-xs font-bold">Verify</Text>
          </Pressable>
        </View>

        {/* SECTION: GENERAL */}
        <Text className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-5 mb-2 px-1">
          GENERAL
        </Text>
        <View className="gap-2">
          <Pressable
            onPress={() => Alert.alert('Edit Profile', 'Edit profile screen')}
            className={`rounded-2xl p-4 flex-row items-center justify-between border ${cardBgClass}`}
          >
            <View className="flex-row items-center gap-3">
              <Text className="text-base">⚙️</Text>
              <Text className={`text-sm font-semibold ${textPrimaryClass}`}>Edit Profile</Text>
            </View>
            <Text className={`text-sm font-bold ${textSecondaryClass}`}>›</Text>
          </Pressable>

          <Pressable
            onPress={() => router.push('/forgot-password')}
            className={`rounded-2xl p-4 flex-row items-center justify-between border ${cardBgClass}`}
          >
            <View className="flex-row items-center gap-3">
              <Text className="text-base">🔑</Text>
              <Text className={`text-sm font-semibold ${textPrimaryClass}`}>Change Password</Text>
            </View>
            <Text className={`text-sm font-bold ${textSecondaryClass}`}>›</Text>
          </Pressable>
        </View>

        {/* SECTION: COMMUNITY */}
        <Text className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-6 mb-2 px-1">
          COMMUNITY
        </Text>
        <View className="gap-2">
          <Pressable
            onPress={() => Alert.alert('Emergency Contact', 'Manage emergency contacts')}
            className={`rounded-2xl p-4 flex-row items-center justify-between border ${cardBgClass}`}
          >
            <View className="flex-row items-center gap-3">
              <Text className="text-base">🚑</Text>
              <Text className={`text-sm font-semibold ${textPrimaryClass}`}>Emergency Contact</Text>
            </View>
            <Text className={`text-sm font-bold ${textSecondaryClass}`}>›</Text>
          </Pressable>

          <Pressable
            onPress={() => Alert.alert('Sister List', 'View trusted sisters')}
            className={`rounded-2xl p-4 flex-row items-center justify-between border ${cardBgClass}`}
          >
            <View className="flex-row items-center gap-3">
              <Text className="text-base">👤</Text>
              <Text className={`text-sm font-semibold ${textPrimaryClass}`}>Sister List</Text>
            </View>
            <Text className={`text-sm font-bold ${textSecondaryClass}`}>›</Text>
          </Pressable>

          <Pressable
            onPress={() => Alert.alert('Sister Request', 'Manage pending sister requests')}
            className={`rounded-2xl p-4 flex-row items-center justify-between border ${cardBgClass}`}
          >
            <View className="flex-row items-center gap-3">
              <Text className="text-base">➕</Text>
              <Text className={`text-sm font-semibold ${textPrimaryClass}`}>Sister Request</Text>
            </View>
            <Text className={`text-sm font-bold ${textSecondaryClass}`}>›</Text>
          </Pressable>
        </View>

        {/* SECTION: NOTIFICATIONS & PREFERENCE */}
        <Text className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-6 mb-2 px-1">
          NOTIFICATIONS & PREFERENCE
        </Text>
        <View className="gap-2">
          <View className={`rounded-2xl p-3.5 flex-row items-center justify-between border ${cardBgClass}`}>
            <View className="flex-row items-center gap-3">
              <Text className="text-base">☀️</Text>
              <Text className={`text-sm font-semibold ${textPrimaryClass}`}>Dark Mode</Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: '#CBD5E1', true: '#8B5CF6' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <Pressable
            onPress={() => Alert.alert('Language', 'App language selection')}
            className={`rounded-2xl p-4 flex-row items-center justify-between border ${cardBgClass}`}
          >
            <View className="flex-row items-center gap-3">
              <Text className="text-base">🌐</Text>
              <Text className={`text-sm font-semibold ${textPrimaryClass}`}>Language</Text>
            </View>
            <Text className={`text-sm font-bold ${textSecondaryClass}`}>›</Text>
          </Pressable>

          <Pressable
            onPress={() => Alert.alert('Notification', 'Notification preferences')}
            className={`rounded-2xl p-4 flex-row items-center justify-between border ${cardBgClass}`}
          >
            <View className="flex-row items-center gap-3">
              <Text className="text-base">🔔</Text>
              <Text className={`text-sm font-semibold ${textPrimaryClass}`}>Notification</Text>
            </View>
            <Text className={`text-sm font-bold ${textSecondaryClass}`}>›</Text>
          </Pressable>
        </View>

        {/* SECTION: HELP CENTER */}
        <Text className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-6 mb-2 px-1">
          HELP CENTER
        </Text>
        <View className="gap-2">
          <Pressable
            onPress={() => Alert.alert('Report Issue', 'Submit a support report')}
            className={`rounded-2xl p-4 flex-row items-center justify-between border ${cardBgClass}`}
          >
            <View className="flex-row items-center gap-3">
              <Text className="text-base">💬</Text>
              <Text className={`text-sm font-semibold ${textPrimaryClass}`}>Report Issue</Text>
            </View>
            <Text className={`text-sm font-bold ${textSecondaryClass}`}>›</Text>
          </Pressable>
        </View>

        {/* SECTION: LEGAL */}
        <Text className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-6 mb-2 px-1">
          LEGAL
        </Text>
        <View className="gap-2">
          <Pressable
            onPress={() => Alert.alert('Terms & Condition', 'Terms and conditions document')}
            className={`rounded-2xl p-4 flex-row items-center justify-between border ${cardBgClass}`}
          >
            <View className="flex-row items-center gap-3">
              <Text className="text-base">📜</Text>
              <Text className={`text-sm font-semibold ${textPrimaryClass}`}>Terms & Condition</Text>
            </View>
            <Text className={`text-sm font-bold ${textSecondaryClass}`}>›</Text>
          </Pressable>

          <Pressable
            onPress={() => Alert.alert('Privacy Policy', 'Privacy policy document')}
            className={`rounded-2xl p-4 flex-row items-center justify-between border ${cardBgClass}`}
          >
            <View className="flex-row items-center gap-3">
              <Text className="text-base">🛡️</Text>
              <Text className={`text-sm font-semibold ${textPrimaryClass}`}>Privacy Policy</Text>
            </View>
            <Text className={`text-sm font-bold ${textSecondaryClass}`}>›</Text>
          </Pressable>
        </View>

        {/* SECTION: OTHERS */}
        <Text className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-6 mb-2 px-1">
          OTHERS
        </Text>
        <View className="gap-2 mb-6">
          {/* Log Out Option */}
          <Pressable
            onPress={handleLogout}
            disabled={isLoggingOut}
            className={`rounded-2xl p-4 flex-row items-center justify-between border ${cardBgClass}`}
          >
            <View className="flex-row items-center gap-3">
              <Text className="text-base">🚪</Text>
              <Text className="text-sm font-semibold text-red-500">Log Out</Text>
            </View>
            {isLoggingOut ? (
              <ActivityIndicator size="small" color="#EF4444" />
            ) : (
              <Text className="text-sm font-bold text-red-400">›</Text>
            )}
          </Pressable>

          {/* Delete Account Option */}
          <Pressable
            onPress={handleDeleteAccount}
            className={`rounded-2xl p-4 flex-row items-center justify-between border ${cardBgClass}`}
          >
            <View className="flex-row items-center gap-3">
              <Text className="text-base">🗑️</Text>
              <Text className="text-sm font-semibold text-red-600">Delete Account</Text>
            </View>
            <Text className="text-sm font-bold text-red-400">›</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};
