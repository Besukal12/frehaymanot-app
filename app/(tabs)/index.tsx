import { ImageBackground, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { QUICK_ACTIONS } from '../../data/data';
import { colors } from 'constants/theme';
import { useApp } from '../../context/AppContext';
import { ScreenLoader } from '../../components/ScreenLoader';

const Index = () => {
  const { theme, mezmurs, isMezmurLoading } = useApp();

  if (isMezmurLoading && mezmurs.length === 0) {
    return (
      <SafeAreaView className="flex-1" style={{ backgroundColor: theme.colors.background }}>
        <ScreenLoader />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      className="bg-background flex-1"
      style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        className="flex-1"
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 96 }}
        contentContainerClassName="px-5 pt-3 pb-8"
        showsVerticalScrollIndicator={false}>
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

          <Link href="/announcements" asChild>
            <TouchableOpacity
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="Notifications">
              <View className="relative">
                <View className="border-border h-14 w-14 items-center justify-center rounded-full border-[1.5px] bg-white">
                  <Ionicons name="notifications-outline" size={27} color={colors.accent} />
                </View>
                <View className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full border-[2px] border-white bg-red-500" />
              </View>
            </TouchableOpacity>
          </Link>
        </View>

        {/* bible word */}
        <View className="border-accent/40 mt-6 min-h-[270px] overflow-hidden rounded-[26px] border">
          <ImageBackground
            source={require('../../assets/teklehaymanot.jpg')}
            resizeMode="repeat"
            className="flex-1 justify-between">
            <View className="absolute inset-0 bg-black/25" />
            <View className="flex-row items-center justify-between px-5 pt-5">
              <View className="flex-row items-center gap-2 rounded-full bg-black/35 px-3 py-2">
                <Ionicons name="book-outline" size={16} color="#FFFFFF" />
                <Text
                  className="text-[12px] font-bold tracking-wide"
                  style={{ color: theme.colors.white }}>
                  የዛሬ ቃል
                </Text>
              </View>
            </View>
            <View className="gap-3 bg-black/65 px-5 pt-7 pb-5">
              <Text
                className="text-[20px] leading-[1.25] font-black tracking-tight"
                style={{ color: theme.colors.accent }}>
                “ሰንሰለታቸውን እንበጥስ፣ የእግር ብረታቸውንም አውልቀን እንጣል”
              </Text>
              <View className="flex-row items-center gap-2">
                <View className="bg-accent h-1 w-7 rounded-full" />
                <Text className="text-[13px] font-bold text-[#F4D66D]">መዝሙር 2፤3</Text>
              </View>
            </View>
          </ImageBackground>
        </View>

        {/* quick actions */}
        <View className="mt-5 w-full flex-row items-stretch gap-3">
          {QUICK_ACTIONS.map((action) => (
            <TouchableOpacity
              key={action.key}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel={action.label}
              onPress={() => router.push(action.route as never)}
              className="flex-1 items-center">
              <View className="bg-background w-full items-center justify-center rounded-2xl border border-black/10 py-5">
                <Ionicons name={action.icon} size={26} color={colors.accent} />
              </View>
              <Text className="text-primary mt-2 text-[13px] font-semibold">{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* latest mezmurs */}
        <View className="mt-7">
          <View className="flex-row items-center justify-between">
            <Text className="text-primary text-[19px] font-black tracking-tight">አዳዲስ መዝሙራት</Text>
            <Link href="/mezmurs" asChild>
              <TouchableOpacity activeOpacity={0.6} accessibilityRole="button">
                <Text className="text-accent text-[14px] font-bold">ሁሉንም ይመልከቱ</Text>
              </TouchableOpacity>
            </Link>
          </View>

          <View className="mt-3 gap-3">
            {mezmurs.slice(0, 4).map((mezmur) => (
              <Link key={mezmur.id} href={`/mezmurs/${mezmur.id}`} asChild>
                <TouchableOpacity
                  activeOpacity={0.7}
                  accessibilityRole="button"
                  accessibilityLabel={mezmur.title}
                  className="border-border flex-row items-center gap-3 rounded-2xl border bg-white p-3">
                  <Image
                    source={
                      mezmur.category.imageUrl ? { uri: mezmur.category.imageUrl } : undefined
                    }
                    className="h-18 w-18 rounded-xl"
                    resizeMode="cover"
                  />
                  <View className="flex-1">
                    <Text
                      numberOfLines={1}
                      className="text-primary text-[15px] font-bold tracking-tight">
                      {mezmur.title}
                    </Text>
                    <Text className="mt-1 text-[13px] text-gray-500">{mezmur.category.name}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
