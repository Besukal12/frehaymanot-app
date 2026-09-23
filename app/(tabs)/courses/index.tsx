import { useMemo, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { courses, type MockCourse } from '../../../data/mockCourses';
import { useApp } from '../../../context/AppContext';
import { PageHeader } from '../../../components/PageHeader';
import { SearchField } from '../../../components/SearchField';
import { EmptyState } from '../../../components/EmptyState';

type CourseView = 'all' | 'grades';

type GradeGroup = {
  grade: number;
  items: MockCourse[];
};

const Courses = () => {
  const { isDownloaded, toggleDownload, theme } = useApp();
  const { colors } = theme;
  const [query, setQuery] = useState('');
  const [view, setView] = useState<CourseView>('grades');
  const [expandedGrades, setExpandedGrades] = useState<number[]>([1]);

  const normalizedQuery = query.trim().toLowerCase();
  const filteredCourses = useMemo(
    () =>
      courses.filter(
        (course) =>
          !normalizedQuery ||
          course.title.toLowerCase().includes(normalizedQuery) ||
          course.description?.toLowerCase().includes(normalizedQuery)
      ),
    [normalizedQuery]
  );

  const gradeGroups = useMemo<GradeGroup[]>(() => {
    const groups = new Map<number, MockCourse[]>();

    filteredCourses.forEach((course) => {
      const current = groups.get(course.grade) ?? [];
      groups.set(course.grade, [...current, course]);
    });

    return [...groups.entries()]
      .sort(([firstGrade], [secondGrade]) => firstGrade - secondGrade)
      .map(([grade, items]) => ({ grade, items }));
  }, [filteredCourses]);

  function toggleGrade(grade: number) {
    setExpandedGrades((current) =>
      current.includes(grade) ? current.filter((item) => item !== grade) : [...current, grade]
    );
  }

  function renderCourse({ item }: { item: MockCourse }) {
    const downloaded = isDownloaded(String(item.id));

    return (
      <View
        className="mb-3 flex-row gap-3 rounded-xl p-2.5"
        style={{
          backgroundColor: colors.white,
          borderWidth: 1,
          borderColor: colors.border,
        }}>
        {item.thumbnailUrl ? (
          <Image
            source={{ uri: item.thumbnailUrl }}
            className="h-[72px] w-[72px] rounded-lg"
            resizeMode="cover"
          />
        ) : (
          <View
            className="h-[72px] w-[72px] items-center justify-center rounded-lg"
            style={{ backgroundColor: colors.background }}>
            <Ionicons name="book-outline" size={22} color={colors.muted} />
          </View>
        )}

        <View className="min-w-0 flex-1 py-0.5">
          <Text
            numberOfLines={1}
            className="text-[15px] font-semibold"
            style={{ color: colors.ink }}>
            {item.title}
          </Text>
          <Text className="mt-0.5 text-[12px]" style={{ color: colors.muted }}>
            ደረጃ {item.grade}
            {item.pdfUrl ? ' · PDF' : ''}
          </Text>
          <Text
            numberOfLines={2}
            className="mt-1 text-[12px] leading-4"
            style={{ color: colors.muted }}>
            {item.description ?? 'የትምህርት መርሃ ግብር ዝርዝር መረጃ።'}
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={item.pdfUrl ? 0.75 : 1}
          onPress={item.pdfUrl ? () => toggleDownload(String(item.id)) : undefined}
          disabled={!item.pdfUrl}
          accessibilityRole="button"
          accessibilityLabel={
            !item.pdfUrl ? 'PDF የለም' : downloaded ? 'ተቀምጧል' : `${item.title} አውርድ`
          }
          accessibilityState={{ disabled: !item.pdfUrl }}
          className="self-center rounded-full px-3 py-1.5"
          style={{
            backgroundColor: !item.pdfUrl
              ? colors.background
              : downloaded
                ? colors.background
                : colors.primary,
            borderWidth: 1,
            borderColor: !item.pdfUrl || downloaded ? colors.border : colors.primary,
          }}>
          <Text
            className="text-[12px] font-semibold"
            style={{ color: !item.pdfUrl || downloaded ? colors.muted : '#FFFFFF' }}>
            {!item.pdfUrl ? 'የለም' : downloaded ? 'ተቀምጧል' : 'አውርድ'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderGrade({ item }: { item: GradeGroup }) {
    const expanded = expandedGrades.includes(item.grade);

    return (
      <View
        className="mb-4 overflow-hidden rounded-2xl"
        style={{ backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border }}>
        <TouchableOpacity
          onPress={() => toggleGrade(item.grade)}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityState={{ expanded }}
          className="flex-row items-center justify-between px-4 py-4">
          <View className="flex-row items-center gap-3">
            <View
              className="h-10 w-10 items-center justify-center rounded-xl"
              style={{ backgroundColor: colors.background }}>
              <Ionicons name="book" size={19} color={colors.primary} />
            </View>
            <View>
              <Text className="text-[17px] font-bold" style={{ color: colors.ink }}>
                ደረጃ {item.grade}
              </Text>
              <Text className="mt-0.5 text-[12px]" style={{ color: colors.muted }}>
                {item.items.length} ኮርሶች
              </Text>
            </View>
          </View>
          <Ionicons
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={22}
            color={colors.muted}
          />
        </TouchableOpacity>

        {expanded && (
          <View className="border-t px-3 pt-3" style={{ borderColor: colors.border }}>
            {item.items.map((course) => (
              <View key={course.id}>{renderCourse({ item: course })}</View>
            ))}
          </View>
        )}
      </View>
    );
  }

  const listData = view === 'all' ? filteredCourses : gradeGroups;

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      <View className="pl-5">
        <PageHeader title="ኮርሶች" subtitle="በደረጃ የተደራጁ ኮርሶችን ይምረጡ" icon="book" />
      </View>

      <FlatList<any>
        data={listData}
        keyExtractor={(item) => String(view === 'all' ? item.id : item.grade)}
        renderItem={view === 'all' ? renderCourse : renderGrade}
        contentContainerClassName="px-4 pb-8"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="mb-3">
            <SearchField value={query} onChangeText={setQuery} placeholder="ኮርስ ፈልግ..." />
            <View
              className="mt-4 flex-row rounded-xl p-1"
              style={{ backgroundColor: colors.white }}>
              {(
                [
                  ['all', 'ሁሉም ኮርሶች'],
                  ['grades', 'በደረጃ'],
                ] as const
              ).map(([value, label]) => {
                const selected = view === value;

                return (
                  <TouchableOpacity
                    key={value}
                    onPress={() => setView(value)}
                    activeOpacity={0.8}
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                    className="flex-1 items-center rounded-lg px-2 py-2.5"
                    style={{ backgroundColor: selected ? colors.primary : colors.white }}>
                    <Text
                      className="text-[13px] font-semibold"
                      style={{ color: selected ? colors.white : colors.muted }}>
                      {label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <Text className="mt-4 mb-1 text-[13px]" style={{ color: colors.muted }}>
              {filteredCourses.length} ኮርሶች
            </Text>
          </View>
        }
        ListEmptyComponent={<EmptyState icon="book-outline" message="ምንም ኮርስ አልተገኘም" />}
      />
    </SafeAreaView>
  );
};

export default Courses;
