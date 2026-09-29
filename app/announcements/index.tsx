import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  Alert,
  Animated,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import {
  announcements,
  type AnnouncementAudience,
  type MockAnnouncement,
} from '../../data/mockAnnouncements';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../../components/PageHeader';

const ANNOUNCEMENT_SEEN_IDS_KEY = '@fre-haymanot/announcement-seen-ids-v1';
const AUDIENCE_LABELS: Record<AnnouncementAudience, string> = {
  YOUTH: 'ለወጣት',
  CENTRAL: 'ለማዕከላዊያን',
  CHILDREN: 'ለህፃናት',
  EVERYONE: 'ለሁሉም',
};
const AUDIENCE_FILTERS = [
  { value: 'ALL', label: 'ሁሉም' },
  { value: 'YOUTH', label: AUDIENCE_LABELS.YOUTH },
  { value: 'CENTRAL', label: AUDIENCE_LABELS.CENTRAL },
  { value: 'CHILDREN', label: AUDIENCE_LABELS.CHILDREN },
  { value: 'EVERYONE', label: AUDIENCE_LABELS.EVERYONE },
] as const;

function ScrollReveal({ children }: { children: ReactNode }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 320,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  return (
    <Animated.View
      style={{
        opacity,
        transform: [
          {
            translateY: opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [14, 0],
            }),
          },
        ],
      }}>
      {children}
    </Animated.View>
  );
}

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

const Announcements = () => {
  const { theme } = useApp();
  const [announcementItems, setAnnouncementItems] = useState(announcements);
  const [refreshing, setRefreshing] = useState(false);
  const [audienceFilter, setAudienceFilter] =
    useState<(typeof AUDIENCE_FILTERS)[number]['value']>('ALL');
  const visibleAnnouncements =
    audienceFilter === 'ALL'
      ? announcementItems
      : announcementItems.filter((item) => item.audience === audienceFilter);

  useEffect(() => {
    void AsyncStorage.getItem(ANNOUNCEMENT_SEEN_IDS_KEY)
      .then((storedIds) => {
        if (!storedIds) {
          return AsyncStorage.setItem(
            ANNOUNCEMENT_SEEN_IDS_KEY,
            JSON.stringify(announcements.map((item) => item.id))
          );
        }
      })
      .catch((error: unknown) => console.warn('Failed to load announcement history', error));
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const storedIds = await AsyncStorage.getItem(ANNOUNCEMENT_SEEN_IDS_KEY);
      const previousIds = storedIds
        ? (JSON.parse(storedIds) as number[])
        : announcements.map((item) => item.id);
      const previousIdSet = new Set(previousIds);
      const addedCount = announcements.filter((item) => !previousIdSet.has(item.id)).length;

      setAnnouncementItems(announcements);
      await AsyncStorage.setItem(
        ANNOUNCEMENT_SEEN_IDS_KEY,
        JSON.stringify(announcements.map((item) => item.id))
      );

      const summary = addedCount ? `${addedCount} አዲስ ማስታወቂያ ተጨምሯል።` : 'አዲስ ማስታወቂያ አልተገኘም።';
      Alert.alert('ዝርዝሩ ታድሷል', `${summary}\nማስታወቂያዎቹ በዚህ መሣሪያ ላይ ይገኛሉ፤ ኢንተርኔት አያስፈልግም።`);
    } catch {
      setAnnouncementItems(announcements);
      Alert.alert(
        'ማስታወቂያዎቹ በዚህ መሣሪያ ላይ አሉ',
        'ኢንተርኔት ሳያስፈልግ ማየት ይችላሉ፤ የአዲስ ማስታወቂያ ቁጥርን ማስቀመጥ ግን አልተቻለም።'
      );
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <SafeAreaView
      className="bg-background flex-1"
      style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => router.replace('/(tabs)')}
        accessibilityLabel="ወደ መነሻ ተመለስ"
        className="mb-5 ml-5 h-10 w-10 items-center justify-center rounded-full bg-white">
        <Ionicons name="arrow-back" size={20} color={theme.colors.primary} />
      </TouchableOpacity>
      <FlatList
        data={visibleAnnouncements}
        keyExtractor={(item) => String(item.id)}
        contentContainerClassName="px-5 pt-3 pb-8"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => void handleRefresh()}
            tintColor={theme.colors.primary}
            colors={[theme.colors.primary]}
          />
        }
        ItemSeparatorComponent={() => <View className="h-3" />}
        ListHeaderComponent={
          <View>
            <PageHeader title="ማስታወቂያዎች" subtitle="አዳዲስ ዜናዎችን እና መረጃዎችን ይከታተሉ" icon="megaphone" />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mt-4 mb-6 rounded-xl"
              contentContainerStyle={{ gap: 4, padding: 4 }}
              style={{ backgroundColor: theme.colors.white }}>
              {AUDIENCE_FILTERS.map((filter) => {
                const selected = audienceFilter === filter.value;
                return (
                  <TouchableOpacity
                    key={filter.value}
                    onPress={() => setAudienceFilter(filter.value)}
                    activeOpacity={0.8}
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                    className="items-center rounded-lg px-3 py-2.5"
                    style={{
                      backgroundColor: selected ? theme.colors.primary : theme.colors.white,
                    }}>
                    <Text
                      className="text-[13px] font-semibold"
                      style={{ color: selected ? theme.colors.white : theme.colors.muted }}>
                      {filter.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        }
        renderItem={({ item }: { item: MockAnnouncement }) => (
          <ScrollReveal>
            <Link href={`/announcements/${item.slug}`} asChild>
              <TouchableOpacity
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel={item.title}
                className="border-border flex-row items-start gap-3 rounded-2xl border bg-white p-3">
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
                  <View
                    className="mt-1 self-start rounded-full px-2 py-0.5"
                    style={{ backgroundColor: theme.colors.background }}>
                    <Text
                      className="text-[11px] font-semibold"
                      style={{ color: theme.colors.primary }}>
                      {AUDIENCE_LABELS[item.audience]}
                    </Text>
                  </View>
                  <Text numberOfLines={2} className="mt-1 text-[13px] leading-[1.4] text-gray-500">
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
          </ScrollReveal>
        )}
        ListEmptyComponent={
          <View className="mt-16 items-center">
            <Ionicons name="megaphone-outline" size={32} color="#9CA3AF" />
            <Text className="mt-3 text-[14px] text-gray-500">
              {audienceFilter === 'ALL'
                ? 'ምንም ማስታወቂያ የለም'
                : `${AUDIENCE_LABELS[audienceFilter]} ማስታወቂያ የለም`}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Announcements;
