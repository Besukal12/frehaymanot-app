import { View, Text } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView as RNSafeAreaView, SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const index = () => {
  return (
    <SafeAreaView>
      <View className="px-5 pt-3 pb-4">
        {/* header */}
        <View className="w-full flex-row items-center justify-between gap-3">
          <View className="flex-1 pr-2">
            <Text className="text-primary text-[28px] leading-[1.1] font-black tracking-tight">
              እንኳን ወደ ፍሬ ሀይማኖት
            </Text>
            <Text className="text-accent text-[28px] leading-[1.1] font-black tracking-tight">
              በደህና መጡ!
            </Text>
          </View>

          <Link href={'/announcements'}>
            <View className="relative">
              <View className="border-border flex h-14 w-14 items-center justify-center rounded-full border-[1.5px] bg-white/5">
                <Ionicons name="notifications-outline" size={27} color="#1F2937" />
              </View>
              <View className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full border-[2px] border-white bg-red-500" />
            </View>
          </Link>
        </View>
        {/* bible word */}
        <View className="bg-accent mt-6 min-h-60 justify-between gap-5 rounded-2xl p-6">
          <Text  className="text-primary text-[18px] leading-[1.1] font-black tracking-tight">“ሰንሰለታቸውን እንበጥስ፣ የእግር ብረታቸውንም አውልቀን እንጣል”</Text>
          <Text>መዝ 2፤3</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default index;
