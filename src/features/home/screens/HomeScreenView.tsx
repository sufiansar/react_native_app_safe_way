import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, Pressable, StatusBar, ActivityIndicator, RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../context/ThemeContext';
import {
  HomeHeader,
  SafetyStatusCard,
  FeatureGrid,
  CommunityPostCard,
  BottomNavbar,
} from '../components';
import { postsApi, userApi } from '../../../services/api';
import { ApiPost } from '../../../types';

const MOCK_POSTMAN_POSTS: ApiPost[] = [
  {
    id: '6a1fb57fae2be5b4603c38c7',
    userId: '6a12b6a4df14239feac319ed',
    content: 'Had an amazing time here! The atmosphere is great and the coffee is perfect.',
    images: [
      'https://midnight-profile-image.s3.us-east-1.amazonaws.com/images/1780462974204-gqzdfckrgpt-unnamed.jpg',
    ],
    tags: ['Cafe', 'Food', 'Dhaka'],
    locationName: "Friday's Food Restaurant",
    helpfulCount: 14,
    notHelpfulCount: 0,
    commentCount: 8,
    shareCount: 5,
    createdAt: '2026-06-03T05:02:55.989Z',
    updatedAt: '2026-06-03T05:02:55.989Z',
    user: {
      id: '6a12b6a4df14239feac319ed',
      name: 'Sufian',
      profileImage: null,
      isGovernmentIdVerified: true,
    },
  },
];

export const HomeScreenView: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { isDark, toggleTheme, cardBgClass, textPrimaryClass, textSecondaryClass } = useTheme();
  const [activeTab, setActiveTab] = useState<'home' | 'feed' | 'chat' | 'profile'>('home');

  const [posts, setPosts] = useState<ApiPost[]>(MOCK_POSTMAN_POSTS);
  const [isLoadingPosts, setIsLoadingPosts] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<any>(null);

  // Fetch real posts feed from backend API
  const fetchFeed = async () => {
    setIsLoadingPosts(true);
    try {
      const res = await postsApi.getFeed();
      if (res.success && res.data) {
        let feedList: ApiPost[] = [];
        if (Array.isArray(res.data)) {
          feedList = res.data;
        } else if (Array.isArray((res.data as any).data)) {
          feedList = (res.data as any).data;
        } else if (Array.isArray((res.data as any).posts)) {
          feedList = (res.data as any).posts;
        }

        if (feedList.length > 0) {
          setPosts(feedList);
        }
      }
    } catch (error) {
      console.error('Failed to fetch posts feed:', error);
    } finally {
      setIsLoadingPosts(false);
    }
  };

  // Fetch user profile from userApi
  const fetchProfile = async () => {
    try {
      const res = await userApi.getMyProfile();
      if (res.success && res.data) {
        setUserProfile(res.data);
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

  useEffect(() => {
    fetchFeed();
    fetchProfile();
  }, []);

  return (
    <View className={`flex-1 ${isDark ? 'bg-slate-950' : 'bg-[#FEFDF4]'}`}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      {/* Tab 1: Home View */}
      {activeTab === 'home' && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 110 }}
          refreshControl={
            <RefreshControl
              refreshing={isLoadingPosts}
              onRefresh={fetchFeed}
              tintColor="#F59E0B"
              colors={['#F59E0B']}
            />
          }
          className="flex-1"
        >
          <HomeHeader topInset={insets.top} />
          <SafetyStatusCard />
          <FeatureGrid />

          {/* Safety Alerts & Warnings */}
          <View className="mt-6 px-5">
            <View className="flex-row items-center mb-3">
              <Text className="text-base mr-1.5">⚠️</Text>
              <Text className={`text-base font-bold ${textPrimaryClass}`}>
                Safety alerts & warnings
              </Text>
            </View>

            <View
              className={`rounded-2xl p-4 border-t-4 border-t-red-500 border-x border-b ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'
              }`}
            >
              <Text className={`text-xs leading-5 ${textSecondaryClass}`}>
                Your legal name and ID details will never appear on your profile. Only a 'Verified Traveler' badge will be shown.
              </Text>
            </View>
          </View>

          {/* Community Section */}
          <View className="mt-6 px-5 mb-10">
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center">
                <Text className="text-base mr-1.5">👥</Text>
                <Text className={`text-lg font-bold ${textPrimaryClass}`}>
                  Community
                </Text>
              </View>
              <Pressable onPress={() => setActiveTab('feed')}>
                <Text className="text-xs font-bold text-amber-500">
                  See more
                </Text>
              </Pressable>
            </View>

            {isLoadingPosts ? (
              <View className="py-8 items-center">
                <ActivityIndicator size="small" color="#F59E0B" />
              </View>
            ) : posts.length > 0 ? (
              posts.slice(0, 2).map((post) => (
                <CommunityPostCard key={post.id} post={post} onPostUpdated={fetchFeed} />
              ))
            ) : (
              <CommunityPostCard onPostUpdated={fetchFeed} />
            )}
          </View>
        </ScrollView>
      )}

      {/* Tab 2: Feed / Community View */}
      {activeTab === 'feed' && (
        <ScrollView
          style={{ paddingTop: Math.max(insets.top, 24) }}
          className="flex-1 p-5"
          contentContainerStyle={{ paddingBottom: 110 }}
          refreshControl={
            <RefreshControl
              refreshing={isLoadingPosts}
              onRefresh={fetchFeed}
              tintColor="#F59E0B"
              colors={['#F59E0B']}
            />
          }
        >
          <View className="flex-row justify-between items-center mb-4">
            <Text className={`text-2xl font-extrabold ${textPrimaryClass}`}>
              Travel Feed & Updates
            </Text>
            <Pressable
              onPress={toggleTheme}
              className={`w-10 h-10 rounded-full items-center justify-center shadow-md ${
                isDark ? 'bg-slate-800' : 'bg-white'
              }`}
            >
              <Text className="text-base">{isDark ? '🌙' : '☀️'}</Text>
            </Pressable>
          </View>

          {isLoadingPosts ? (
            <View className="py-12 items-center">
              <ActivityIndicator size="large" color="#F59E0B" />
            </View>
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <CommunityPostCard key={post.id} post={post} onPostUpdated={fetchFeed} />
            ))
          ) : (
            <CommunityPostCard onPostUpdated={fetchFeed} />
          )}
        </ScrollView>
      )}

      {/* Tab 3: Chat View */}
      {activeTab === 'chat' && (
        <ScrollView
          style={{ paddingTop: Math.max(insets.top, 24) }}
          className="flex-1 p-5"
          contentContainerStyle={{ paddingBottom: 110 }}
        >
          <View className="flex-row justify-between items-center mb-4">
            <Text className={`text-2xl font-extrabold ${textPrimaryClass}`}>
              Travel Companion Messages
            </Text>
            <Pressable
              onPress={toggleTheme}
              className={`w-10 h-10 rounded-full items-center justify-center shadow-md ${
                isDark ? 'bg-slate-800' : 'bg-white'
              }`}
            >
              <Text className="text-base">{isDark ? '🌙' : '☀️'}</Text>
            </Pressable>
          </View>

          <View className="gap-3">
            {[
              { name: 'Angelina', msg: 'The border check was smooth! Let me know if you need info.', time: '2m ago' },
              { name: 'Safety Officer Mike', msg: 'Alert: Heavy rain on Highway 4. Drive carefully!', time: '15m ago' },
              { name: 'Travel Group SF', msg: 'Anyone heading to Downtown around 4 PM?', time: '1h ago' },
            ].map((chat, idx) => (
              <Pressable
                key={idx}
                className={`p-4 rounded-2xl border flex-row items-center gap-3 ${cardBgClass}`}
              >
                <View className="w-12 h-12 rounded-full bg-amber-500/20 items-center justify-center">
                  <Text className="text-lg">💬</Text>
                </View>
                <View className="flex-1">
                  <View className="flex-row justify-between mb-1">
                    <Text className={`font-bold text-sm ${textPrimaryClass}`}>{chat.name}</Text>
                    <Text className={`text-[10px] ${textSecondaryClass}`}>{chat.time}</Text>
                  </View>
                  <Text className={`text-xs ${textSecondaryClass}`} numberOfLines={1}>
                    {chat.msg}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      )}

      {/* Tab 4: Profile View */}
      {activeTab === 'profile' && (
        <ScrollView
          style={{ paddingTop: Math.max(insets.top, 24) }}
          className="flex-1 p-5"
          contentContainerStyle={{ paddingBottom: 110 }}
        >
          <View className="flex-row justify-end mb-2">
            <Pressable
              onPress={toggleTheme}
              className={`w-10 h-10 rounded-full items-center justify-center shadow-md ${
                isDark ? 'bg-slate-800' : 'bg-white'
              }`}
            >
              <Text className="text-base">{isDark ? '🌙' : '☀️'}</Text>
            </Pressable>
          </View>

          <View className="items-center pb-6">
            <Image
              source={
                userProfile?.profileImage
                  ? { uri: userProfile.profileImage }
                  : require('../../../../assets/images/avatar_sarah.png')
              }
              className="w-24 h-24 rounded-full border-4 border-amber-400 mb-3 bg-slate-200"
            />
            <Text className={`text-2xl font-extrabold ${textPrimaryClass}`}>
              {userProfile?.name || 'Sarah Jenkins'}
            </Text>
            <Text className={`text-xs ${textSecondaryClass} mt-0.5 mb-2`}>
              {userProfile?.email || 'sarah@example.com'}
            </Text>
            <View className="bg-amber-500/20 px-3 py-1 rounded-full">
              <Text className="text-xs font-bold text-amber-500">
                {userProfile?.isGovernmentIdVerified ? '✓ Verified Traveler' : '✓ Basic Member'}
              </Text>
            </View>
          </View>

          <View className={`rounded-3xl p-5 border gap-4 ${cardBgClass}`}>
            <View className={`flex-row items-center justify-between border-b pb-3 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
              <Text className={`text-sm font-semibold ${textPrimaryClass}`}>Emergency Contacts</Text>
              <Text className="text-xs font-bold text-amber-500">3 Added</Text>
            </View>
            <View className={`flex-row items-center justify-between border-b pb-3 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
              <Text className={`text-sm font-semibold ${textPrimaryClass}`}>Live Location Sharing</Text>
              <Text className="text-xs font-bold text-emerald-500">Enabled</Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className={`text-sm font-semibold ${textPrimaryClass}`}>Safe Places Reviews</Text>
              <Text className="text-xs font-bold text-amber-500">12 Given</Text>
            </View>
          </View>
        </ScrollView>
      )}

      {/* Bottom Navbar */}
      <BottomNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        bottomInset={insets.bottom}
      />
    </View>
  );
};
