import '../global.css';
import { ActivityIndicator, View } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppProvider, useApp } from '../context/AppContext';

function BackgroundMezmurIndicator() {
  const { isMezmurLoading, theme } = useApp();
  const insets = useSafeAreaInsets();

  if (!isMezmurLoading) {
    return null;
  }

  return (
    <View
      pointerEvents="none"
      accessibilityLabel="Mezmur data loading"
      style={{
        position: 'absolute',
        top: insets.top + 6,
        right: 14,
        zIndex: 10,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: theme.colors.white,
        borderWidth: 1,
        borderColor: theme.colors.border,
      }}>
      <ActivityIndicator size="small" color={theme.colors.primary} />
    </View>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <View className="flex-1">
          <Stack screenOptions={{ headerShown: false, contentStyle: { flex: 1 } }} />
          <BackgroundMezmurIndicator />
        </View>
      </AppProvider>
    </SafeAreaProvider>
  );
}
