import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { Text, View } from 'react-native';
import { useApp } from '../context/AppContext';

type PageHeaderProps = {
  title: string;
  subtitle: string;
  icon: ComponentProps<typeof Ionicons>['name'];
};

export function PageHeader({ title, subtitle, icon }: PageHeaderProps) {
  const { theme } = useApp();

  return (
    <View className="mb-5 flex-row items-center gap-3">
      <View
        className="h-12 w-12 items-center justify-center rounded-2xl"
        style={{ backgroundColor: theme.colors.primary }}>
        <Ionicons name={icon} size={24} color={theme.colors.white} />
      </View>
      <View className="flex-1 pr-4">
        <Text className="text-[29px] font-black" style={{ color: theme.colors.primary }}>
          {title}
        </Text>
        <Text className="mt-1 text-[13px]" style={{ color: theme.colors.muted }}>
          {subtitle}
        </Text>
      </View>
    </View>
  );
}
