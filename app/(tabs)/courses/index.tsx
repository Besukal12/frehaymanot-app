import { useMemo, useState } from 'react';
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../../constants/theme';
import { courses, type MockCourse } from '../../../data/mockCourses';
import { useApp } from '../../../context/AppContext';

const Courses = () => {
  const { isDownloaded, toggleDownload, theme } = useApp();
  const [query, setQuery] = useState('');
  const [activeGrade, setActiveGrade] = useState<number | null>(null);

  const grades = [...new Set(courses.map((course) => course.grade))].sort();
  const filteredCourses = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return courses.filter((course) => {
      const matchesGrade = activeGrade === null || course.grade === activeGrade;
      const matchesQuery =
        !normalizedQuery ||
        course.title.toLowerCase().includes(normalizedQuery) ||
        course.description?.toLowerCase().includes(normalizedQuery);

      return matchesGrade && matchesQuery;
    });
  }, [activeGrade, query]);

  return (
    <SafeAreaView
      className="bg-background flex-1"
      style={{ backgroundColor: theme.colors.background }}>
      <FlatList
        data={filteredCourses}
        keyExtractor={(item) => String(item.id)}
        contentContainerClassName="px-5 pt-4 pb-8"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="h-3" />}
        ListHeaderComponent={
          <View>
            <View className="flex-row items-center gap-3">
              <View className="bg-primary h-12 w-12 items-center justify-center rounded-2xl">
                <Ionicons name="book" size={24} color={colors.white} />
              </View>
              <View className="flex-1">
                <Text className="text-primary text-[30px] font-black tracking-tight">ኮርሶች</Text>
                <Text className="text-muted mt-1 text-[13px]">እውቀትን በእምነት ይገንቡ</Text>
              </View>
            </View>

            <View className="border-border mt-7 flex-row items-center gap-2 rounded-2xl border bg-white px-4 py-3">
              <Ionicons name="search" size={19} color={colors.muted} />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="ኮርስ ፈልግ..."
                placeholderTextColor={colors.muted}
                className="text-primary flex-1 text-[15px]"
                returnKeyType="search"
              />
              {query.length > 0 && (
                <TouchableOpacity
                  onPress={() => setQuery('')}
                  accessibilityRole="button"
                  accessibilityLabel="Clear course search">
                  <Ionicons name="close-circle" size={18} color={colors.muted} />
                </TouchableOpacity>
              )}
            </View>

            <FlatList
              horizontal
              data={[null, ...grades]}
              keyExtractor={(item) => (item === null ? 'all' : String(item))}
              keyboardShouldPersistTaps="handled"
              showsHorizontalScrollIndicator={false}
              contentContainerClassName="gap-2"
              className="mt-4"
              renderItem={({ item }) => {
                const active = item === activeGrade || (item === null && activeGrade === null);
                return (
                  <TouchableOpacity
                    activeOpacity={0.75}
                    onPress={() => setActiveGrade(item)}
                    accessibilityRole="button"
                    accessibilityState={{ selected: active }}
                    className={`items-center justify-center rounded-full px-5 py-2.5 ${
                      active ? 'bg-accent' : 'bg-gray-100'
                    }`}>
                    <Text
                      className={`text-[14px] font-semibold ${active ? 'text-white' : 'text-gray-600'}`}>
                      {item === null ? 'ሁሉም' : `ደረጃ ${item}`}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />

            <Text className="text-primary mt-6 mb-3 text-[18px] font-black tracking-tight">
              የሚገኙ ኮርሶች
            </Text>
          </View>
        }
        renderItem={({ item }: { item: MockCourse }) => {
          const downloaded = isDownloaded(String(item.id));

          return (
            <View className="border-border overflow-hidden rounded-2xl border bg-white">
              <Image
                source={
                  item.thumbnailUrl
                    ? { uri: item.thumbnailUrl }
                    : require('../../../assets/teklehaymanot.jpg')
                }
                className="h-32 w-full"
                resizeMode="cover"
              />
              <View className="p-4">
                <View className="flex-row items-start justify-between gap-3">
                  <View className="flex-1">
                    <Text className="text-primary text-[17px] font-bold tracking-tight">
                      {item.title}
                    </Text>
                    <Text className="text-accent mt-1 text-[12px] font-bold">ደረጃ {item.grade}</Text>
                  </View>
                  <View className="bg-accent/10 h-9 w-9 items-center justify-center rounded-full">
                    <Ionicons name="book-outline" size={18} color={colors.accent} />
                  </View>
                </View>

                <Text numberOfLines={2} className="text-muted mt-2 text-[13px] leading-5">
                  {item.description ?? 'የትምህርት መርሃ ግብር ዝርዝር መረጃ።'}
                </Text>

                <View className="mt-4 flex-row items-center justify-between gap-3">
                  <View className="flex-row items-center gap-1.5">
                    <Ionicons name="document-text-outline" size={16} color={colors.muted} />
                    <Text className="text-muted text-[12px]">
                      {item.pdfUrl ? 'PDF ይገኛል' : 'PDF አልተጫነም'}
                    </Text>
                  </View>
                  <TouchableOpacity
                    activeOpacity={item.pdfUrl ? 0.75 : 1}
                    onPress={item.pdfUrl ? () => toggleDownload(String(item.id)) : undefined}
                    disabled={!item.pdfUrl}
                    accessibilityRole="button"
                    accessibilityLabel={`${item.pdfUrl ? (downloaded ? 'Remove' : 'Download') : 'Unavailable'} ${item.title}`}
                    accessibilityState={{ disabled: !item.pdfUrl }}
                    className={`flex-row items-center gap-1.5 rounded-full px-4 py-2 ${
                      !item.pdfUrl ? 'bg-gray-200' : downloaded ? 'bg-[#F1E7C2]' : 'bg-primary'
                    }`}>
                    <Ionicons
                      name={
                        !item.pdfUrl
                          ? 'lock-closed-outline'
                          : downloaded
                            ? 'checkmark'
                            : 'download-outline'
                      }
                      size={16}
                      color={
                        !item.pdfUrl ? colors.muted : downloaded ? colors.primary : colors.white
                      }
                    />
                    <Text
                      className={`text-[12px] font-bold ${
                        !item.pdfUrl ? 'text-gray-500' : downloaded ? 'text-primary' : 'text-white'
                      }`}>
                      {!item.pdfUrl ? 'PDF የለም' : downloaded ? 'ተቀምጧል' : 'አውርድ'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
        ListEmptyComponent={
          <View className="mt-16 items-center">
            <Ionicons name="book-outline" size={32} color={colors.muted} />
            <Text className="text-muted mt-3 text-[14px]">ምንም ኮርስ አልተገኘም</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Courses;
