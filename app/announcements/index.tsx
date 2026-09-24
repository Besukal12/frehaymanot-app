import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { announcements, type MockAnnouncement } from '../../data/mockAnnouncements';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../../components/PageHeader';

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

  return (
    <SafeAreaView
      className="bg-background flex-1"
      style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => router.back()}
        accessibilityRole="button"
        accessibilityLabel="ወደ ማስታወቂያዎች ተመለስ"
        className="mb-5 ml-5 h-10 w-10 items-center justify-center rounded-full bg-white">
        <Ionicons name="arrow-back" size={20} color={theme.colors.primary} />
      </TouchableOpacity>
      <FlatList
        data={announcements}
        keyExtractor={(item) => String(item.id)}
        contentContainerClassName="px-5 pt-3 pb-8"
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="h-3" />}
        ListHeaderComponent={
          <PageHeader title="ማስታወቂያዎች" subtitle="አዳዲስ ዜናዎችን እና መረጃዎችን ይከታተሉ" icon="megaphone" />
        }
        renderItem={({ item }: { item: MockAnnouncement }) => (
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

              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" style={{ marginTop: 4 }} />
            </TouchableOpacity>
          </Link>
        )}
        ListEmptyComponent={
          <View className="mt-16 items-center">
            <Ionicons name="megaphone-outline" size={32} color="#9CA3AF" />
            <Text className="mt-3 text-[14px] text-gray-500">ምንም ማስታወቂያ የለም</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Announcements;
