export type ThemeMode = 'light' | 'dark';

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  location: string;
  isVerified: boolean;
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorAvatar: string;
  isVerified: boolean;
  timeAgo: string;
  tags: string[];
  content: string;
  image: any;
  helpfulCount: number;
  unhelpfulCount: number;
  commentsCount: number;
  sharesCount: number;
}

export interface ApiPostUser {
  id: string;
  name: string;
  profileImage: string | null;
  isGovernmentIdVerified: boolean;
}

export interface ApiPost {
  id: string;
  userId: string;
  content: string;
  images: string[];
  tags: string[];
  locationName?: string;
  helpfulCount: number;
  notHelpfulCount: number;
  commentCount: number;
  shareCount: number;
  createdAt: string;
  updatedAt: string;
  user?: ApiPostUser;
}

export interface OnboardingSlide {
  id: string;
  image: any;
  title: string;
  subtitle: string;
  buttonText?: string;
  isWelcomeScreen?: boolean;
}
