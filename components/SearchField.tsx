import { TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

type SearchFieldProps = {
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  accessibilityLabel?: string;
};

export function SearchField({
  value,
  onChangeText,
  placeholder,
  accessibilityLabel,
}: SearchFieldProps) {
  const { theme } = useApp();

  return (
    <View
      className="flex-row items-center rounded-[10px] px-3"
      style={{
        backgroundColor: theme.colors.white,
        borderWidth: 1,
        borderColor: theme.colors.border,
        height: 40,
      }}>
      <Ionicons name="search" size={16} color={theme.colors.muted} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.muted}
        accessibilityLabel={accessibilityLabel ?? placeholder}
        returnKeyType="search"
        autoCorrect={false}
        className="flex-1 px-2 text-[15px]"
        style={{ color: theme.colors.ink }}
      />
      {value.length > 0 && (
        <TouchableOpacity
          onPress={() => onChangeText('')}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="ፍለጋ አጽዳ">
          <Ionicons name="close-circle" size={16} color={theme.colors.muted} />
        </TouchableOpacity>
      )}
    </View>
  );
}
