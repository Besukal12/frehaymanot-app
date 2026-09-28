import { View } from 'react-native';
import { useApp } from '../context/AppContext';

export function MezmurRowsSkeleton({ rows = 4 }: { rows?: number }) {
  const { theme } = useApp();
  const blockColor = theme.id === 'dark' ? '#3B3447' : theme.colors.border;

  return (
    <View className="gap-3">
      {Array.from({ length: rows }, (_, index) => (
        <View
          key={index}
          className="flex-row items-center gap-3 rounded-2xl border p-3"
          style={{ backgroundColor: theme.colors.white, borderColor: theme.colors.border }}>
          <View className="h-[72px] w-[72px] rounded-xl" style={{ backgroundColor: blockColor }} />
          <View className="flex-1 gap-2">
            <View className="h-4 w-3/4 rounded" style={{ backgroundColor: blockColor }} />
            <View className="h-3 w-1/2 rounded" style={{ backgroundColor: blockColor }} />
          </View>
        </View>
      ))}
    </View>
  );
}

export function MezmurListSkeleton() {
  const { theme } = useApp();
  const blockColor = theme.id === 'dark' ? '#3B3447' : theme.colors.border;

  return (
    <View className="gap-4">
      {[0, 1, 2].map((group) => (
        <View
          key={group}
          className="overflow-hidden rounded-2xl border p-4"
          style={{ backgroundColor: theme.colors.white, borderColor: theme.colors.border }}>
          <View className="flex-row items-center gap-3">
            <View className="h-10 w-10 rounded-xl" style={{ backgroundColor: blockColor }} />
            <View className="flex-1 gap-2">
              <View className="h-4 w-2/5 rounded" style={{ backgroundColor: blockColor }} />
              <View className="h-3 w-1/4 rounded" style={{ backgroundColor: blockColor }} />
            </View>
          </View>
          <View className="mt-4 flex-row justify-between gap-3">
            {[0, 1].map((item) => (
              <View key={item} className="flex-1 gap-2">
                <View
                  className="w-full rounded-xl"
                  style={{ aspectRatio: 1.5, backgroundColor: blockColor }}
                />
                <View
                  className="h-3 w-3/4 self-center rounded"
                  style={{ backgroundColor: blockColor }}
                />
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}

export function MezmurDetailSkeleton() {
  const { theme } = useApp();
  const blockColor = theme.id === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.3)';

  return (
    <View className="flex-1 px-7 pt-16" style={{ backgroundColor: theme.colors.primary }}>
      <View className="h-11 w-11 rounded-full" style={{ backgroundColor: blockColor }} />
      <View className="mt-16 h-4 w-1/3 rounded" style={{ backgroundColor: blockColor }} />
      <View className="mt-4 h-7 w-4/5 rounded" style={{ backgroundColor: blockColor }} />
      <View className="mt-10 gap-4">
        {[0, 1, 2, 3, 4, 5, 6].map((line) => (
          <View
            key={line}
            className="h-4 rounded"
            style={{ width: line % 3 === 2 ? '68%' : '100%', backgroundColor: blockColor }}
          />
        ))}
      </View>
    </View>
  );
}
