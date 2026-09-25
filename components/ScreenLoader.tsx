import { ActivityIndicator, Text, View } from 'react-native';
import { useApp } from '../context/AppContext';

type ScreenLoaderProps = {
  message?: string;
};

export function ScreenLoader({ message = 'በመጫን ላይ...' }: ScreenLoaderProps) {
  const { theme } = useApp();

  return (
    <View className="flex-1 items-center justify-center gap-3 px-8">
      <ActivityIndicator size="large" color={theme.colors.primary} />
      <Text className="text-center text-[14px]" style={{ color: theme.colors.muted }}>
        {message}
      </Text>
    </View>
  );
}
