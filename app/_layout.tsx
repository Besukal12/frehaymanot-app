import '../global.css'; 
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider } from '../context/AppContext';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <Stack screenOptions={{ headerShown: false, contentStyle: { flex: 1 } }} />
      </AppProvider>
    </SafeAreaProvider>
  );
}