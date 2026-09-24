import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { announcements } from '../../data/mockAnnouncements';
import { colors } from '../../constants/theme';
import { useApp } from '../../context/AppContext';

const formatRelativeDate = (isoDate: string) => {
  const posted = new Date(isoDate);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const postedDate = new Date(posted.getFullYear(), posted.getMonth(), posted.getDate());
  const diffDays = Math.round((today.getTime() - postedDate.getTime()) / (1000 * 60 * 60 * 24));

  if (posted.getTime() > now.getTime()) {
    return posted.toLocaleDateString('am-ET', { day: 'numeric', month: 'short', year: 'numeric' });
  }
  if (diffDays === 0) return 'ዛሬ';
  if (diffDays === 1) return 'ትናንት';
  if (diffDays < 7) return `${diffDays} ቀናት በፊት`;

  return posted.toLocaleDateString('am-ET', { day: 'numeric', month: 'short', year: 'numeric' });
};

const AnnouncementDetail = () => {
  const { theme } = useApp();
  const { slug } = useLocalSearchParams<{ slug?: string | string[] }>();
  const announcementSlug = Array.isArray(slug) ? slug[0] : slug;
  const announcement = announcements.find((item) => item.slug === announcementSlug);
  const latestAnnouncements = announcements
    .filter((item) => item.slug !== announcementSlug)
    .sort((first, second) => Date.parse(second.postedAt) - Date.parse(first.postedAt))
    .slice(0, 3);

  if (!announcement) {
    return (
      <SafeAreaView
        className="bg-background flex-1"
        style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <View className="items-center justify-center px-8">
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

        <View className="mt-9">
          <View className="mb-5 flex-row items-center justify-between">
            <Text className="text-primary text-[19px] font-black tracking-tight">
              አዳዲስ ማስታወቂያዎች
            </Text>
            <Link href="/announcements" asChild>
              <TouchableOpacity activeOpacity={0.6} accessibilityRole="button">
                <Text className="text-accent text-[14px] font-bold">ሁሉንም ይመልከቱ</Text>
              </TouchableOpacity>
            </Link>
          </View>

          {latestAnnouncements.length > 0 ? (
            latestAnnouncements.map((item) => (
              <Link key={item.id} href={`/announcements/${item.slug}`} asChild>
                <TouchableOpacity
                  activeOpacity={0.7}
                  accessibilityRole="button"
                  accessibilityLabel={item.title}
                  className="border-border mb-3 flex-row items-start gap-3 rounded-2xl border bg-white p-3">
                  {item.thumbnailUrl ? (
                    <Image
                      source={{ uri: item.thumbnailUrl }}
                      className="h-16 w-16 rounded-xl bg-gray-100"
                      resizeMode="cover"
                    />
                  ) : (
                    <View className="bg-accent/10 h-16 w-16 items-center justify-center rounded-xl">
                      <Ionicons name="megaphone" size={24} color="#1F2937" />
                    </View>
                  )}

                  <View className="flex-1">
                    <Text
                      numberOfLines={1}
                      className="text-primary text-[16px] font-bold tracking-tight">
                      {item.title}
                    </Text>
                    <Text
                      numberOfLines={2}
                      className="mt-1 text-[13px] leading-[1.4] text-gray-500">
                      {item.content}
                    </Text>
                    <View className="mt-2 flex-row items-center gap-1">
                      <Ionicons name="time-outline" size={13} color="#9CA3AF" />
                      <Text className="text-[12px] text-gray-400">
                        {formatRelativeDate(item.postedAt)}
                      </Text>
                    </View>
                  </View>

                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color="#9CA3AF"
                    style={{ marginTop: 4 }}
                  />
                </TouchableOpacity>
              </Link>
            ))
          ) : (
            <View className="mt-16 items-center">
              <Ionicons name="megaphone-outline" size={32} color="#9CA3AF" />
              <Text className="mt-3 text-[14px] text-gray-500">ምንም ማስታወቂያ የለም</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AnnouncementDetail;
