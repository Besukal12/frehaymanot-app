import { Text, TouchableOpacity } from 'react-native';
import { useApp } from '../context/AppContext';

type FilterChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export function FilterChip({ label, selected, onPress }: FilterChipProps) {
  const { theme } = useApp();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      className="rounded-full px-3.5 py-2"
      style={{
        backgroundColor: selected ? theme.colors.primary : theme.colors.white,
        borderWidth: 1,
        borderColor: selected ? theme.colors.primary : theme.colors.border,
      }}>
      <Text
        className="text-[12px] font-medium"
        style={{ color: selected ? '#FFFFFF' : theme.colors.ink }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
