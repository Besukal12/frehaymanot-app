import { Text, View } from "react-native";
import { Link, Stack } from "expo-router";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Not Found" }} />
      <View className="flex-1 items-center justify-center bg-background px-8">
        <Text className="text-ink font-bold text-xl mb-2">Page not found</Text>
        <Text className="text-muted text-center mb-6">
          The screen you're looking for doesn't exist.
        </Text>
        <Link href="/" className="text-primary font-semibold">
          Go back to Home
        </Link>
      </View>
    </>
  );
}
