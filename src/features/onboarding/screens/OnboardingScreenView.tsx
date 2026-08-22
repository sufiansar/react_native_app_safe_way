import { Link, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  useWindowDimensions,
  SafeAreaView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

const SLIDES = [
  {
    id: '1',
    image: require('../../../../assets/images/onboarding_travel.png'),
    title: 'Travel with Confidence',
    subtitle: 'Real-time safety tools for the way you travel',
    buttonText: 'Next',
  },
  {
    id: '2',
    image: require('../../../../assets/images/onboarding_community.png'),
    title: 'A Community That Has Your Back',
    subtitle:
      'Trusted reviews, safe place ratings, and travel companions — all in one place.',
    buttonText: 'Next',
  },
  {
    id: '3',
    image: require('../../../../assets/images/onboarding_help.png'),
    title: 'Help Is Always One Tap Away',
    subtitle:
      'Emergency SOS, live location sharing, and trusted contact alerts — always ready when you need them.',
    buttonText: 'Get Started',
  },
  {
    id: '4',
    image: require('../../../../assets/images/onboarding_safeway.png'),
    title: 'Safeway',
    subtitle: 'Your Safer Journey Starts Here',
    isWelcomeScreen: true,
  },
];

export const OnboardingScreenView: React.FC = () => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    if (index !== currentIndex && index >= 0 && index < SLIDES.length) {
      setCurrentIndex(index);
    }
  };

  const goToSlide = (index: number) => {
    if (index >= 0 && index < SLIDES.length) {
      flatListRef.current?.scrollToIndex({ index, animated: true });
      setCurrentIndex(index);
    }
  };

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      goToSlide(currentIndex + 1);
    } else {
      router.push('/home');
    }
  };

  const handleSkip = () => {
    goToSlide(SLIDES.length - 1);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FEFDF4]">
      <View className="flex-1">
        {/* Top Header - Skip Button */}
        {currentIndex < 3 ? (
          <View className="flex-row justify-end px-6 pt-4 pb-2 z-10">
            <Pressable
              onPress={handleSkip}
              className="bg-white/80 border border-slate-200 px-5 py-1.5 rounded-full active:opacity-70 shadow-sm"
            >
              <Text className="text-sm font-medium text-slate-700">Skip</Text>
            </Pressable>
          </View>
        ) : (
          <View className="h-12 pt-4 pb-2" />
        )}

        {/* Carousel Content */}
        <FlatList
          ref={flatListRef}
          data={SLIDES}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ width }} className="flex-1 items-center justify-between px-6 pb-6">
              {/* Illustration Container */}
              <View className="flex-1 justify-center items-center my-4">
                <View className="w-72 h-72 rounded-full bg-amber-100/40 items-center justify-center p-2 shadow-sm">
                  <Image
                    source={item.image}
                    className="w-full h-full rounded-full"
                    resizeMode="contain"
                  />
                </View>
              </View>

              {/* Text Info */}
              <View className="items-center mb-6 px-4 w-full">
                <Text className="text-2xl font-extrabold text-slate-900 text-center tracking-tight mb-3">
                  {item.title}
                </Text>
                <Text className="text-sm font-normal text-slate-500 text-center leading-6 px-2">
                  {item.subtitle}
                </Text>
              </View>

              {/* Bottom Actions (Dots & Buttons) */}
              <View className="w-full items-center">
                {!item.isWelcomeScreen ? (
                  <>
                    {/* Pagination Dots */}
                    <View className="flex-row items-center justify-center gap-1.5 mb-8">
                      {[0, 1, 2].map((idx) => (
                        <View
                          key={idx}
                          className={`h-2 rounded-full ${
                            currentIndex === idx
                              ? 'w-7 bg-amber-500'
                              : 'w-2 bg-amber-200'
                          }`}
                        />
                      ))}
                    </View>

                    {/* Primary Button */}
                    <Pressable
                      onPress={handleNext}
                      className="w-full bg-amber-500 active:bg-amber-600 rounded-full py-4 items-center justify-center shadow-md shadow-amber-500/30"
                    >
                      <Text className="text-white font-bold text-base">
                        {item.buttonText}
                      </Text>
                    </Pressable>
                  </>
                ) : (
                  /* Slide 4 / Welcome Screen Buttons */
                  <View className="w-full gap-3.5 mt-4">
                    <Link href="/sign-up" asChild>
                      <Pressable className="w-full bg-amber-500 active:bg-amber-600 rounded-full py-4 items-center justify-center shadow-md shadow-amber-500/30">
                        <Text className="text-white font-bold text-base">
                          Create an Account
                        </Text>
                      </Pressable>
                    </Link>

                    <Link href="/sign-in" asChild>
                      <Pressable className="w-full bg-white active:bg-slate-50 border border-slate-200 rounded-full py-4 items-center justify-center shadow-sm">
                        <Text className="text-slate-800 font-semibold text-base">
                          Log In
                        </Text>
                      </Pressable>
                    </Link>
                  </View>
                )}
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};
