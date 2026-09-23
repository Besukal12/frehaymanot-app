import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { useApp } from '../context/AppContext';

type EmptyStateProps = {
  icon: ComponentProps<typeof Ionicons>['name'];
  message: string;
};

export function EmptyState({ icon, message }: EmptyStateProps) {
  const { theme } = useApp();

  return (
    <View className="mt-16 items-center px-8">
      <Ionicons name={icon} size={28} color={theme.colors.muted} />
      <Text className="mt-3 text-center text-[14px]" style={{ color: theme.colors.muted }}>
        {message}
      </Text>
    </View>
  );
}
