import { useMemo, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { mezmurs, mezmurCategories, type MockMezmur } from '../../../data/mockMezmurs';
import { colors } from '../../../constants/theme';
import { useApp } from '../../../context/AppContext';

const ALL_ID = 0; // sentinel id for the "ሁሉም" (All) filter pill

const Mezmurs = () => {
  const [query, setQuery] = useState('');
  const [activeCategoryId, setActiveCategoryId] = useState<number>(ALL_ID);
  const { theme } = useApp();

  const filtered = useMemo(() => {
    return mezmurs.filter((m) => {
      const matchesCategory = activeCategoryId === ALL_ID || m.categoryId === activeCategoryId;
      const matchesQuery = m.title.toLowerCase().includes(query.trim().toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategoryId]);

  return (
    <SafeAreaView
      className="bg-background flex-1"
      style={{ backgroundColor: theme.colors.background }}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="px-5 pt-3 pb-8"
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="h-3" />}
        ListHeaderComponent={
          <View>
            <View className="flex-row items-center gap-3">
              <View className="bg-primary h-12 w-12 items-center justify-center rounded-2xl">
                <Ionicons name="musical-notes" size={24} color={colors.white} />
              </View>
              <View className="flex-1">
                <Text className="text-primary text-[30px] font-black tracking-tight">መዝሙሮች</Text>
                <Text className="text-muted mt-1 text-[13px]">በምስጋና እና በደስታ ይዘምሩ</Text>
              </View>
            </View>

            {/* search */}
            <View className="border-border mt-7 flex-row items-center gap-2 rounded-2xl border bg-white px-4 py-3">
              <Ionicons name="search" size={19} color="#9CA3AF" />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="መዝሙር ፈልግ..."
                placeholderTextColor="#9CA3AF"
                className="text-primary flex-1 text-[15px]"
                returnKeyType="search"
              />
              {query.length > 0 && (
                <TouchableOpacity
                  onPress={() => setQuery('')}
                  accessibilityRole="button"
                  accessibilityLabel="Clear search">
                  <Ionicons name="close-circle" size={18} color="#9CA3AF" />
                </TouchableOpacity>
              )}
            </View>

            {/* category filter pills */}
            <FlatList
              horizontal
              keyboardShouldPersistTaps="handled"
              showsHorizontalScrollIndicator={false}
              className="mt-4"
              contentContainerClassName="gap-2"
              data={[{ id: ALL_ID, name: 'ሁሉም' }, ...mezmurCategories]}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => {
                const active = item.id === activeCategoryId;
                return (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setActiveCategoryId(item.id)}
                    accessibilityRole="button"
                    accessibilityState={{ selected: active }}
                    className={
                      active
                        ? 'bg-accent items-center justify-center rounded-full px-5 py-2.5'
                        : 'items-center justify-center rounded-full bg-gray-100 px-5 py-2.5'
                    }>
                    <Text
                      className={
                        active
                          ? 'text-[14px] font-bold text-white'
                          : 'text-[14px] font-semibold text-gray-600'
                      }>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />

            <View className="mt-5" />
          </View>
        }
        renderItem={({ item }: { item: MockMezmur }) => (
          <Link href={`/mezmurs/${item.id}`} asChild>
            <TouchableOpacity
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel={item.title}
              className="border-border flex-row items-center gap-3 rounded-2xl border bg-white p-3">
              <Image
                source={{ uri: item.thumbnailUrl }}
                className="h-16 w-16 rounded-xl bg-gray-100"
                resizeMode="cover"
              />
              <View className="flex-1">
                <Text
                  numberOfLines={1}
                  className="text-primary text-[16px] font-bold tracking-tight">
                  {item.title}
                </Text>
                <Text className="mt-1 text-[13px] text-gray-500">{item.category.name}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </Link>
        )}
        ListEmptyComponent={
          <View className="mt-16 items-center">
            <Ionicons name="musical-notes-outline" size={32} color="#9CA3AF" />
            <Text className="mt-3 text-[14px] text-gray-500">ምንም መዝሙር አልተገኘም</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Mezmurs;
