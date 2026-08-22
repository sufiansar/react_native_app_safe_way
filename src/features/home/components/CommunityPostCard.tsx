import React, { useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';

export const CommunityPostCard: React.FC = () => {
  const { isDark, cardBgClass, textPrimaryClass, textSecondaryClass } = useTheme();
  const [helpfulCount, setHelpfulCount] = useState(21);
  const [isHelpful, setIsHelpful] = useState(false);

  const toggleHelpful = () => {
    if (isHelpful) {
      setHelpfulCount((prev) => prev - 1);
      setIsHelpful(false);
    } else {
      setHelpfulCount((prev) => prev + 1);
      setIsHelpful(true);
    }
  };

  return (
    <View className={`rounded-3xl p-4 border mb-4 ${cardBgClass}`}>
      {/* User Info Header */}
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center gap-2.5">
          <View className="relative">
            <Image
              source={require('../../../../assets/images/avatar_angelina.png')}
              className="w-10 h-10 rounded-full"
            />
            <View className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-white" />
          </View>
          <View>
            <View className="flex-row items-center gap-1">
              <Text className={`font-bold text-sm ${textPrimaryClass}`}>
                Angelina
              </Text>
              <View className="w-4 h-4 bg-amber-400 rounded-full items-center justify-center">
                <Text className="text-[10px] text-white font-black">✓</Text>
              </View>
            </View>
            <Text className={`text-[11px] ${textSecondaryClass}`}>
              • 25min ago
            </Text>
          </View>
        </View>

        <Pressable className="p-1">
          <Text className={`font-bold text-base ${textSecondaryClass}`}>⋮</Text>
        </Pressable>
      </View>

      {/* Tag Pills */}
      <View className="flex-row gap-2 mb-3">
        {['Road', 'Border', 'Route'].map((tag, idx) => (
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
        Namanga border was very smooth today. Immigration officers were helpful and the process took about 10 minutes. Visa on arrival payments accepted in USD and local currency.
      </Text>

      {/* Post Image */}
      <Image
        source={require('../../../../assets/images/border_post.png')}
        className="w-full h-44 rounded-2xl mb-3"
        resizeMode="cover"
      />

      {/* Post Engagement Bar */}
      <View
        className={`flex-row items-center justify-between pt-2 border-t ${
          isDark ? 'border-slate-800' : 'border-slate-100'
        }`}
      >
        <Pressable onPress={toggleHelpful} className="flex-row items-center">
          <Text className={`text-xs font-medium mr-1 ${textSecondaryClass}`}>
            Helpful
          </Text>
          <Text className="text-sm">👍</Text>
          <Text className={`text-xs font-bold ml-1 ${textPrimaryClass}`}>
            {helpfulCount}
          </Text>
        </Pressable>

        <View className="flex-row items-center">
          <Text className="text-sm">👎</Text>
          <Text className={`text-xs font-bold ml-1 ${textPrimaryClass}`}>
            02
          </Text>
        </View>

        <View className="flex-row items-center">
          <Text className="text-sm">💬</Text>
          <Text className={`text-xs font-bold ml-1 ${textPrimaryClass}`}>
            754
          </Text>
        </View>

        <View className="flex-row items-center">
          <Text className="text-sm">↪</Text>
          <Text className={`text-xs font-bold ml-1 ${textPrimaryClass}`}>
            512
          </Text>
        </View>
      </View>
    </View>
  );
};
