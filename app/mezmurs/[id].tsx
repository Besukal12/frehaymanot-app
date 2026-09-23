import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { mezmurs } from '../../data/mockMezmurs';
import { useApp } from '../../context/AppContext';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

function withAlpha(hex: string, alpha: number) {
  const normalized = hex.replace('#', '');
  const value =
    normalized.length === 3
      ? normalized
          .split('')
          .map((character) => character + character)
          .join('')
      : normalized;
  const red = Number.parseInt(value.slice(0, 2), 16);
  const green = Number.parseInt(value.slice(2, 4), 16);
  const blue = Number.parseInt(value.slice(4, 6), 16);

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function isDarkColor(hex: string) {
  const normalized = hex.replace('#', '');
  const red = Number.parseInt(normalized.slice(0, 2), 16);
  const green = Number.parseInt(normalized.slice(2, 4), 16);
  const blue = Number.parseInt(normalized.slice(4, 6), 16);
  const luminance = (red * 299 + green * 587 + blue * 114) / 1000;

  return luminance < 150;
}

const MezmurPreview = () => {
  const router = useRouter();

  const { id } = useLocalSearchParams<{ id: string }>();

  const { theme } = useApp();

  const mezmur = mezmurs.find((item) => String(item.id) === String(id));

  if (!mezmur) {
    return (
      <SafeAreaView
        className="flex-1 items-center justify-center"
        style={{
          backgroundColor: theme.colors.background,
        }}>
        <StatusBar style={theme.id === 'midnight' ? 'light' : 'dark'} />

        <Text
          className="text-[16px] font-semibold"
          style={{
            color: theme.colors.ink,
          }}>
          መዝሙሩ አልተገኘም
        </Text>

        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-4 rounded-full px-6 py-3"
          style={{
            backgroundColor: theme.colors.primary,
          }}>
          <Text
            className="font-semibold"
            style={{
              color: theme.colors.white,
            }}>
            ተመለስ
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const backgroundImage = mezmur.category.imageUrl
    ? { uri: mezmur.category.imageUrl }
    : require('../../assets/teklehaymanot.jpg');

  const fadeStart = SCREEN_HEIGHT * 0.18;
  const darkTheme = isDarkColor(theme.colors.primary);
  const overlayText = darkTheme ? '#FFFFFF' : theme.colors.ink;
  const overlayMutedText = darkTheme ? withAlpha('#FFFFFF', 0.76) : theme.colors.muted;
  const controlBackground = darkTheme
    ? withAlpha('#FFFFFF', 0.14)
    : withAlpha(theme.colors.primary, 0.12);

  return (
    <View
      className="flex-1"
      style={{
        backgroundColor: theme.colors.primary,
      }}>
      <StatusBar style="light" />

      <ImageBackground source={backgroundImage} resizeMode="cover" className="flex-1">
        <View
          className="absolute inset-0"
          style={{
            backgroundColor: withAlpha(theme.colors.primary, 0.08),
          }}
        />

        <LinearGradient
          pointerEvents="none"
          colors={[
            'transparent',
            withAlpha(theme.colors.primary, 0.16),
            withAlpha(theme.colors.primary, 0.68),
            withAlpha(theme.colors.primary, 0.94),
            theme.colors.primary,
          ]}
          locations={[0, 0.2, 0.48, 0.72, 1]}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: fadeStart,
            bottom: 0,
          }}
        />

        <SafeAreaView className="flex-1">
          <View className="flex-row items-center justify-between px-4 pt-1">
            {/* BACK */}
            <TouchableOpacity
              onPress={() => router.back()}
              hitSlop={10}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="ተመለስ"
              className="h-11 w-11 items-center justify-center rounded-full"
              style={{
                backgroundColor: controlBackground,
              }}>
              <Ionicons name="chevron-back" size={25} color={overlayText} />
            </TouchableOpacity>
          </View>

          <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 28,
              paddingTop: 32,
              paddingBottom: 80,
            }}>
            <Text
              className="mb-3 text-left text-[14px] font-semibold"
              style={{
                color: overlayMutedText,
              }}>
              {mezmur.category.name}
            </Text>

            <Text
              className="mb-6 text-left text-[24px] font-black"
              style={{
                color: overlayText,
                textShadowColor: darkTheme
                  ? withAlpha('#000000', 0.7)
                  : withAlpha(theme.colors.white, 0.9),
                textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 4,
              }}>
              {mezmur.title}
            </Text>

            <View className="px-1">
              <Text
                className="text-left text-[20px] leading-[34px] font-semibold"
                style={{
                  color: overlayText,

                  textShadowColor: darkTheme
                    ? withAlpha('#000000', 0.8)
                    : withAlpha(theme.colors.white, 0.9),
                  textShadowOffset: {
                    width: 1,
                    height: 2,
                  },
                  textShadowRadius: 5,
                }}>
                {mezmur.mezmurPoem}
              </Text>
            </View>

            {/* DESCRIPTION */}
            {mezmur.description ? (
              <Text
                className="mt-10 text-left text-[14px] leading-6"
                style={{
                  color: darkTheme ? withAlpha('#FFFFFF', 0.64) : theme.colors.muted,
                }}>
                {mezmur.description}
              </Text>
            ) : null}
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default MezmurPreview;
