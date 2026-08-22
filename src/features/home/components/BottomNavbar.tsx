import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';

interface BottomNavbarProps {
  activeTab: 'home' | 'feed' | 'chat' | 'profile';
  setActiveTab: (tab: 'home' | 'feed' | 'chat' | 'profile') => void;
  bottomInset: number;
}

export const BottomNavbar: React.FC<BottomNavbarProps> = ({
  activeTab,
  setActiveTab,
  bottomInset,
}) => {
  const { isDark, textSecondaryClass } = useTheme();

  return (
    <View
      style={{ paddingBottom: Math.max(bottomInset, 10) }}
      className={`absolute bottom-0 left-0 right-0 border-t px-6 pt-2.5 flex-row items-center justify-around shadow-2xl z-50 ${
        isDark ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-100'
      }`}
    >
      {/* Tab 1: Home */}
      <Pressable
        onPress={() => setActiveTab('home')}
        className="items-center justify-center py-1 px-3"
      >
        <Text className={`text-xl mb-0.5 ${activeTab === 'home' ? 'opacity-100' : 'opacity-40'}`}>
          🏠
        </Text>
        <Text
          className={`text-[11px] font-bold ${
            activeTab === 'home' ? 'text-amber-500' : textSecondaryClass
          }`}
        >
          Home
        </Text>
      </Pressable>

      {/* Tab 2: Feed */}
      <Pressable
        onPress={() => setActiveTab('feed')}
        className="items-center justify-center py-1 px-3"
      >
        <Text className={`text-xl mb-0.5 ${activeTab === 'feed' ? 'opacity-100' : 'opacity-40'}`}>
          👥
        </Text>
        <Text
          className={`text-[11px] font-bold ${
            activeTab === 'feed' ? 'text-amber-500' : textSecondaryClass
          }`}
        >
          Feed
        </Text>
      </Pressable>

      {/* Center Floating SOS Shield Button */}
      <Pressable
        onPress={() => alert('Emergency SOS Alert Sent to Trusted Contacts!')}
        className={`-mt-7 bg-amber-500 w-14 h-14 rounded-full items-center justify-center shadow-lg shadow-amber-500/50 border-4 active:scale-95 ${
          isDark ? 'border-slate-950' : 'border-[#FEFDF4]'
        }`}
      >
        <Text className="text-2xl">🛡️</Text>
      </Pressable>

      {/* Tab 3: Chat */}
      <Pressable
        onPress={() => setActiveTab('chat')}
        className="items-center justify-center py-1 px-3"
      >
        <Text className={`text-xl mb-0.5 ${activeTab === 'chat' ? 'opacity-100' : 'opacity-40'}`}>
          💬
        </Text>
        <Text
          className={`text-[11px] font-bold ${
            activeTab === 'chat' ? 'text-amber-500' : textSecondaryClass
          }`}
        >
          Chat
        </Text>
      </Pressable>

      {/* Tab 4: Profile */}
      <Pressable
        onPress={() => setActiveTab('profile')}
        className="items-center justify-center py-1 px-3"
      >
        <Text className={`text-xl mb-0.5 ${activeTab === 'profile' ? 'opacity-100' : 'opacity-40'}`}>
          👤
        </Text>
        <Text
          className={`text-[11px] font-bold ${
            activeTab === 'profile' ? 'text-amber-500' : textSecondaryClass
          }`}
        >
          Profile
        </Text>
      </Pressable>
    </View>
  );
};
