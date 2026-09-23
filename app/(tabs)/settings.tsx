import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themes } from '../../constants/theme';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../../components/PageHeader';

const Settings = () => {
  const { theme, themeId, setTheme } = useApp();

  return (
    <SafeAreaView
      className="bg-background flex-1 h-screen"
      style={{ backgroundColor: theme.colors.background }}>
      <ScrollView contentContainerClassName="px-5 pt-4 pb-10" showsVerticalScrollIndicator={false}>
        <PageHeader title="ማስተካከያ" subtitle="መተግበሪያውን እንደሚፈልጉ ያቀናብሩ" icon="settings" />

        <View className="border-border mt-7 rounded-[26px] border bg-white p-5">
          <View className="flex-row items-center gap-3">
            <View className="bg-accent/15 h-10 w-10 items-center justify-center rounded-xl">
              <Ionicons name="color-palette-outline" size={21} color={theme.colors.accent} />
            </View>
            <View className="flex-1">
              <Text className="text-primary text-[19px] font-black">የመተግበሪያ ገጽታ</Text>
              <Text className="text-muted mt-1 text-[13px]">የሚመችዎትን ቀለም ይምረጡ</Text>
            </View>
          </View>

          <View className="mt-5 gap-3">
            {themes.map((item) => {
              const selected = item.id === themeId;

              return (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.8}
                  onPress={() => setTheme(item.id)}
                  accessibilityRole="radio"
                  accessibilityState={{ selected }}
                  className={`flex-row items-center gap-3 rounded-2xl border p-3 ${
                    selected ? 'border-primary bg-background' : 'border-border bg-white'
                  }`}>
                  <View
                    className="h-12 w-12 items-center justify-center rounded-xl"
                    style={{ backgroundColor: item.colors.background }}>
                    <View
                      className="h-6 w-6 rounded-full"
                      style={{ backgroundColor: item.colors.primary }}
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-primary text-[15px] font-bold">{item.name}</Text>
                  </View>
                  <View
                    className="h-6 w-6 items-center justify-center rounded-full border-2"
                    style={{ borderColor: selected ? item.colors.primary : item.colors.border }}>
                    {selected && (
                      <View
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: item.colors.primary }}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
