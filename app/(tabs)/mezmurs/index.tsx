import { useMemo, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { useApp } from '../../../context/AppContext';
import { PageHeader } from '../../../components/PageHeader';
import { SearchField } from '../../../components/SearchField';
import { EmptyState } from '../../../components/EmptyState';
import { MezmurListSkeleton } from '../../../components/MezmurSkeleton';
import type { MezmurCategory, MezmurSummary } from '../../../data/types';

type CategoryWithItems = MezmurCategory & {
  items: MezmurSummary[];
};

type MezmurView = 'all' | 'categories';

const Mezmurs = () => {
  const { theme, mezmurs, mezmurCategories, isMezmurLoading, mezmurError, refreshMezmurs } =
    useApp();

  const [query, setQuery] = useState('');
  const [view, setView] = useState<MezmurView>('categories');
  const [expandedIds, setExpandedIds] = useState<number[]>([1]);

  const normalizedQuery = query.trim().toLowerCase();

  const categories = useMemo<CategoryWithItems[]>(() => {
    return mezmurCategories
      .map((category) => {
        const items = mezmurs.filter(
          (mezmur) =>
            mezmur.categoryId === category.id &&
            (!normalizedQuery ||
              mezmur.title.toLowerCase().includes(normalizedQuery) ||
              mezmur.description?.toLowerCase().includes(normalizedQuery))
        );

        return {
          ...category,
          items,
        };
      })
      .filter((category) => category.items.length > 0);
  }, [mezmurCategories, mezmurs, normalizedQuery]);

  const filteredMezmurs = useMemo(
    () =>
      mezmurs.filter(
        (mezmur) =>
          !normalizedQuery ||
          mezmur.title.toLowerCase().includes(normalizedQuery) ||
          mezmur.description?.toLowerCase().includes(normalizedQuery)
      ),
    [mezmurs, normalizedQuery]
  );

  const isInitialLoad = isMezmurLoading && mezmurs.length === 0;

  const toggleCategory = (categoryId: number) => {
    setExpandedIds((current) =>
      current.includes(categoryId)
        ? current.filter((id) => id !== categoryId)
        : [...current, categoryId]
    );
  };

  const renderCategory = ({ item }: { item: CategoryWithItems }) => {
    const expanded = expandedIds.includes(item.id);

    return (
      <View
        className="b-20 mb-4 overflow-hidden rounded-2xl"
        style={{
          backgroundColor: theme.colors.white,
          borderWidth: 1,
          borderColor: theme.colors.border,
        }}>
        {/* CATEGORY HEADER */}
        <TouchableOpacity
          onPress={() => toggleCategory(item.id)}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityState={{ expanded }}
          className="flex-row items-center justify-between px-4 py-4">
          <View className="flex-row items-center gap-3">
            <View
              className="h-10 w-10 items-center justify-center rounded-xl"
              style={{
                backgroundColor: theme.colors.background,
              }}>
              <Ionicons name="musical-notes" size={19} color={theme.colors.primary} />
            </View>

            <View>
              <Text className="text-[17px] font-bold" style={{ color: theme.colors.ink }}>
                {item.name}
              </Text>

              <Text className="mt-0.5 text-[12px]" style={{ color: theme.colors.muted }}>
                {item.items.length} መዝሙሮች
              </Text>
            </View>
          </View>

          <Ionicons
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={22}
            color={theme.colors.muted}
          />
        </TouchableOpacity>

        {/* CATEGORY CONTENT */}
        {expanded && (
          <View
            className="border-t px-3 pt-3 pb-2"
            style={{
              borderColor: theme.colors.border,
            }}>
            <View className="flex-row flex-wrap justify-between">
              {item.items.map((mezmur) => (
                <Link key={mezmur.id} href={`/mezmurs/${mezmur.id}`} asChild>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    accessibilityRole="button"
                    accessibilityLabel={mezmur.title}
                    className="mb-4"
                    style={{ width: '48%' }}>
                    <Image
                      source={item.imageUrl ? { uri: item.imageUrl } : undefined}
                      className="h-35 w-full rounded-xl"
                      resizeMode="cover"
                      // style={{ aspectRatio: 1.55 }}
                    />

                    <Text
                      numberOfLines={2}
                      className="mt-2 text-center text-[14px] font-semibold"
                      style={{
                        color: theme.colors.ink,
                      }}>
                      {mezmur.title}
                    </Text>
                  </TouchableOpacity>
                </Link>
              ))}
            </View>
          </View>
        )}
      </View>
    );
  };

  const renderMezmur = ({ item }: { item: (typeof mezmurs)[number] }) => (
    <Link href={`/mezmurs/${item.id}`} asChild>
      <TouchableOpacity
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel={item.title}
        className="mb-3 flex-row items-center gap-3 rounded-2xl border p-3"
        style={{
          backgroundColor: theme.colors.white,
          borderColor: theme.colors.border,
        }}>
        <Image
          source={item.category.imageUrl ? { uri: item.category.imageUrl } : undefined}
          className="h-16 w-16 rounded-xl"
          resizeMode="cover"
        />
        <View className="flex-1">
          <Text className="text-[16px] font-bold" style={{ color: theme.colors.ink }}>
            {item.title}
          </Text>
          <Text className="mt-1 text-[13px]" style={{ color: theme.colors.muted }}>
            {item.category.name}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={theme.colors.muted} />
      </TouchableOpacity>
    </Link>
  );

  return (
    <SafeAreaView
      className="bg-background flex-1"
      style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <FlatList<any>
        data={view === 'all' ? filteredMezmurs : categories}
        keyExtractor={(item) => String(item.id)}
        renderItem={view === 'all' ? renderMezmur : renderCategory}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 12,
          paddingBottom: 72,
        }}
        ListHeaderComponent={
          <View>
            <PageHeader title="መዝሙሮች" subtitle="በምድብ የተደራጁ መዝሙሮችን ይምረጡ" icon="musical-notes" />

            {mezmurError && mezmurs.length > 0 ? (
              <TouchableOpacity
                onPress={() => void refreshMezmurs()}
                className="mt-2 rounded-xl p-3">
                <Text style={{ color: theme.colors.muted }}>{mezmurError} · እንደገና ሞክር</Text>
              </TouchableOpacity>
            ) : null}

            {/* SEARCH */}
            <SearchField value={query} onChangeText={setQuery} placeholder="መዝሙር ፈልግ..." />

            <View
              className="mt-4 flex-row rounded-xl p-1"
              style={{ backgroundColor: theme.colors.white }}>
              {(
                [
                  ['all', 'ሁሉም መዝሙሮች'],
                  ['categories', 'ምድቦች'],
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
                    style={{
                      backgroundColor: selected ? theme.colors.primary : theme.colors.white,
                    }}>
                    <Text
                      className="text-[13px] font-semibold"
                      style={{ color: selected ? theme.colors.white : theme.colors.muted }}>
                      {label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View className="h-5" />
          </View>
        }
        ListEmptyComponent={
          isInitialLoad ? (
            <MezmurListSkeleton />
          ) : (
            <View className="items-center">
              <EmptyState icon="musical-notes-outline" message={mezmurError ?? 'ምንም መዝሙር አልተገኘም'} />
              {mezmurError ? (
                <TouchableOpacity
                  onPress={() => void refreshMezmurs()}
                  className="mt-4 rounded-xl px-4 py-3"
                  style={{ backgroundColor: theme.colors.primary }}>
                  <Text className="font-semibold" style={{ color: theme.colors.white }}>
                    እንደገና ሞክር
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          )
        }
      />
    </SafeAreaView>
  );
};

export default Mezmurs;
