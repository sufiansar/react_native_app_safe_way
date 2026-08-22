import React, { useState } from 'react';
import { View, Text, Image, Pressable, ActivityIndicator } from 'react-native';
import { useTheme } from '../../../../context/ThemeContext';
import { ApiPost } from '../../../../types';
import { reactionsApi, postsApi } from '../../../../services/api';

interface CommunityPostCardProps {
  post?: ApiPost;
  onPostUpdated?: () => void;
}

export const CommunityPostCard: React.FC<CommunityPostCardProps> = ({ post, onPostUpdated }) => {
  const { isDark, cardBgClass, textPrimaryClass, textSecondaryClass } = useTheme();

  // Local state initialized from API response or static fallback
  const [helpfulCount, setHelpfulCount] = useState(post?.helpfulCount ?? 21);
  const [unhelpfulCount, setUnhelpfulCount] = useState(post?.notHelpfulCount ?? 2);
  const [shareCount, setShareCount] = useState(post?.shareCount ?? 512);
  const [isHelpful, setIsHelpful] = useState(false);
  const [isUnhelpful, setIsUnhelpful] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Author details fallback
  const authorName = post?.user?.name || 'Angelina';
  const authorAvatar = post?.user?.profileImage
    ? { uri: post.user.profileImage }
    : require('../../../../../assets/images/avatar_angelina.png');
  const isVerified = post?.user?.isGovernmentIdVerified ?? true;
  const timeAgo = post?.createdAt ? 'Just now' : '• 25min ago';
  const tags = post?.tags && post.tags.length > 0 ? post.tags : ['Road', 'Border', 'Route'];
  const contentText =
    post?.content ||
    'Namanga border was very smooth today. Immigration officers were helpful and the process took about 10 minutes. Visa on arrival payments accepted in USD and local currency.';
  const postImage = post?.images && post.images.length > 0
    ? { uri: post.images[0] }
    : require('../../../../../assets/images/border_post.png');

  // Handle Real Reaction API (Helpful / Unhelpful)
  const handleToggleReaction = async (type: 'HELPFUL' | 'UNHELPFUL') => {
    if (isSubmitting) return;

    if (type === 'HELPFUL') {
      if (isHelpful) {
        setHelpfulCount((prev) => Math.max(0, prev - 1));
        setIsHelpful(false);
      } else {
        setHelpfulCount((prev) => prev + 1);
        setIsHelpful(true);
        if (isUnhelpful) {
          setUnhelpfulCount((prev) => Math.max(0, prev - 1));
          setIsUnhelpful(false);
        }
      }
    } else {
      if (isUnhelpful) {
        setUnhelpfulCount((prev) => Math.max(0, prev - 1));
        setIsUnhelpful(false);
      } else {
        setUnhelpfulCount((prev) => prev + 1);
        setIsUnhelpful(true);
        if (isHelpful) {
          setHelpfulCount((prev) => Math.max(0, prev - 1));
          setIsHelpful(false);
        }
      }
    }

    if (post?.id) {
      setIsSubmitting(true);
      try {
        await reactionsApi.toggleReaction({ postId: post.id, type });
        if (onPostUpdated) onPostUpdated();
      } catch (error) {
        console.error('Failed to toggle reaction:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Handle Real Share API
  const handleShare = async () => {
    setShareCount((prev) => prev + 1);

    if (post?.id) {
      try {
        await postsApi.sharePost(post.id);
        if (onPostUpdated) onPostUpdated();
      } catch (error) {
        console.error('Failed to share post:', error);
      }
    }
  };

  return (
    <View className={`rounded-3xl p-4 border mb-4 ${cardBgClass}`}>
      {/* User Info Header */}
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center gap-2.5">
          <View className="relative">
            <Image source={authorAvatar} className="w-10 h-10 rounded-full bg-slate-200" />
            <View className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-white" />
          </View>
          <View>
            <View className="flex-row items-center gap-1">
              <Text className={`font-bold text-sm ${textPrimaryClass}`}>{authorName}</Text>
              {isVerified && (
                <View className="w-4 h-4 bg-amber-400 rounded-full items-center justify-center">
                  <Text className="text-[10px] text-white font-black">✓</Text>
                </View>
              )}
            </View>
            <Text className={`text-[11px] ${textSecondaryClass}`}>{timeAgo}</Text>
          </View>
        </View>

        <Pressable className="p-1">
          <Text className={`font-bold text-base ${textSecondaryClass}`}>⋮</Text>
        </Pressable>
      </View>

      {/* Tag Pills */}
      <View className="flex-row flex-wrap gap-2 mb-3">
        {tags.map((tag, idx) => (
          <View
            key={idx}
            className={`px-3 py-1 rounded-full ${
              isDark ? 'bg-purple-900/50' : 'bg-purple-100/70'
            }`}
          >
            <Text
              className={`text-xs font-semibold ${
                isDark ? 'text-purple-300' : 'text-purple-600'
              }`}
            >
              {tag}
            </Text>
          </View>
        ))}
      </View>

      {/* Post Content Text */}
      <Text className={`text-xs leading-5 mb-3 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
        {contentText}
      </Text>

      {/* Post Image */}
      {postImage && (
        <Image
          source={postImage}
          className="w-full h-44 rounded-2xl mb-3 bg-slate-200"
          resizeMode="cover"
        />
      )}

      {/* Post Engagement Bar */}
      <View
        className={`flex-row items-center justify-between pt-2 border-t ${
          isDark ? 'border-slate-800' : 'border-slate-100'
        }`}
      >
        {/* Helpful Reaction Button */}
        <Pressable
          onPress={() => handleToggleReaction('HELPFUL')}
          className="flex-row items-center active:opacity-70"
        >
          <Text className={`text-xs font-medium mr-1 ${textSecondaryClass}`}>Helpful</Text>
          <Text className="text-sm">👍</Text>
          <Text
            className={`text-xs font-bold ml-1 ${
              isHelpful ? 'text-amber-500' : textPrimaryClass
            }`}
          >
            {helpfulCount}
          </Text>
        </Pressable>

        {/* Not Helpful Reaction Button */}
        <Pressable
          onPress={() => handleToggleReaction('UNHELPFUL')}
          className="flex-row items-center active:opacity-70"
        >
          <Text className="text-sm">👎</Text>
          <Text
            className={`text-xs font-bold ml-1 ${
              isUnhelpful ? 'text-red-500' : textPrimaryClass
            }`}
          >
            {unhelpfulCount}
          </Text>
        </Pressable>

        {/* Comments Counter */}
        <View className="flex-row items-center">
          <Text className="text-sm">💬</Text>
          <Text className={`text-xs font-bold ml-1 ${textPrimaryClass}`}>
            {post?.commentCount ?? 754}
          </Text>
        </View>

        {/* Share Button */}
        <Pressable onPress={handleShare} className="flex-row items-center active:opacity-70">
          <Text className="text-sm">↪</Text>
          <Text className={`text-xs font-bold ml-1 ${textPrimaryClass}`}>{shareCount}</Text>
        </Pressable>
      </View>
    </View>
  );
};
