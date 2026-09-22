import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { announcements } from '../../data/mockAnnouncements';
import { colors } from '../../constants/theme';
import { useApp } from '../../context/AppContext';

const AnnouncementDetail = () => {
  const { theme } = useApp();
  const { slug } = useLocalSearchParams<{ slug?: string | string[] }>();
  const announcementSlug = Array.isArray(slug) ? slug[0] : slug;
  const announcement = announcements.find((item) => item.slug === announcementSlug);

  if (!announcement) {
    return (
      <SafeAreaView
        className="bg-background flex-1"
        style={{ backgroundColor: theme.colors.background }}>
        <View className="flex-1 items-center justify-center px-8">
          <View className="bg-accent/15 h-16 w-16 items-center justify-center rounded-2xl">
            <Ionicons name="megaphone-outline" size={30} color={theme.colors.accent} />
          </View>
          <Text className="text-primary mt-5 text-center text-[22px] font-black">
            ማስታወቂያው አልተገኘም
          </Text>
          <Text className="text-muted mt-2 text-center text-[14px] leading-5">
            የጠየቁት ማስታወቂያ አልተገኘም።
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="ወደ ማስታወቂያዎች ተመለስ"
            className="bg-primary mt-6 flex-row items-center gap-2 rounded-2xl px-5 py-3">
            <Ionicons name="arrow-back" size={17} color={colors.white} />
            <Text className="text-[14px] font-bold text-white">ተመለስ</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      className="bg-background flex-1"
      style={{ backgroundColor: theme.colors.background }}>
      <ScrollView contentContainerClassName="px-5 pt-4 pb-10" showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="ወደ ማስታወቂያዎች ተመለስ"
          className="mb-5 h-10 w-10 items-center justify-center rounded-full bg-white">
          <Ionicons name="arrow-back" size={20} color={theme.colors.primary} />
        </TouchableOpacity>

        {announcement.thumbnailUrl ? (
          <Image
            source={{ uri: announcement.thumbnailUrl }}
            className="h-52 w-full rounded-[26px]"
            resizeMode="cover"
          />
        ) : (
          <View className="bg-accent/10 h-52 w-full items-center justify-center rounded-[26px]">
            <Ionicons name="megaphone" size={54} color={theme.colors.accent} />
          </View>
        )}

        <View className="mt-6 flex-row items-center gap-2">
          <Ionicons name="time-outline" size={16} color={theme.colors.muted} />
          <Text className="text-muted text-[13px]">
            {new Date(announcement.postedAt).toLocaleDateString('am-ET', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </Text>
        </View>
        <Text className="text-primary mt-3 text-[28px] leading-9 font-black tracking-tight">
          {announcement.title}
        </Text>
        <View className="bg-accent mt-5 h-1 w-10 rounded-full" />
        <Text className="text-ink mt-6 text-[16px] leading-7">{announcement.content}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AnnouncementDetail;
