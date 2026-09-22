import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';
import { colors } from '../../constants/theme';

const MAX_MESSAGE_LENGTH = 2000;

const Feedback = () => {
  const { submitFeedback, theme } = useApp();
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const trimmedMessage = message.trim();
  const canSubmit = trimmedMessage.length > 0;

  function handleSubmit() {
    if (!canSubmit) {
      return;
    }

    submitFeedback(trimmedMessage);
    setMessage('');
    setSubmitted(true);
  }

  return (
    <SafeAreaView
      className="bg-background flex-1"
      style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <KeyboardAvoidingView
        className="flex-1"
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          className="flex-1"
          contentContainerClassName="px-5 pt-4 pb-10"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View className="flex-row items-center gap-3">
            <View className="bg-primary h-12 w-12 items-center justify-center rounded-2xl">
              <Ionicons name="chatbubble-ellipses" size={24} color={colors.white} />
            </View>
            <View className="flex-1">
              <Text className="text-primary text-[30px] font-black tracking-tight">አስተያየት</Text>
              <Text className="text-muted mt-1 text-[13px]">ሐሳብዎን ከእኛ ጋር ያካፍሉ</Text>
            </View>
          </View>

          <View className="border-border mt-7 rounded-[26px] border bg-white p-5">
            <Text className="text-primary text-[20px] font-black tracking-tight">
              አገልግሎታችንን እንዴት እናሻሽል?
            </Text>
            <Text className="text-muted mt-2 text-[14px] leading-5">
              ማንኛውንም ጥያቄ፣ ምክር ወይም አስተያየት በነፃነት ይጻፉልን።
            </Text>

            <View className="border-border mt-5 rounded-2xl border bg-[#FFFCF8] px-4 py-3">
              <TextInput
                value={message}
                onChangeText={(value) => {
                  setMessage(value);
                  setSubmitted(false);
                }}
                placeholder="አስተያየትዎን እዚህ ይጻፉ..."
                placeholderTextColor={colors.muted}
                multiline
                maxLength={MAX_MESSAGE_LENGTH}
                textAlignVertical="top"
                accessibilityLabel="የአስተያየት መልዕክት"
                className="text-ink min-h-[170px] text-[15px] leading-6"
              />
              <View className="mt-2 flex-row items-center justify-between">
                <Text className="text-muted text-[12px]">ቢያንስ አንድ ቃል ያስፈልጋል</Text>
                <Text className="text-muted text-[12px]">
                  {message.length}/{MAX_MESSAGE_LENGTH}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleSubmit}
              disabled={!canSubmit}
              accessibilityRole="button"
              accessibilityLabel="አስተያየት ላክ"
              className={`mt-5 min-h-14 flex-row items-center justify-center gap-2 rounded-2xl ${
                canSubmit ? 'bg-primary' : 'bg-[#D8C9C0]'
              }`}>
              <Ionicons name="send" size={18} color={colors.white} />
              <Text className="text-[15px] font-bold text-white">አስተያየት ላክ</Text>
            </TouchableOpacity>
          </View>

          {submitted && (
            <View
              accessibilityRole="alert"
              accessibilityLiveRegion="polite"
              className="mt-4 flex-row items-center gap-3 rounded-2xl border border-[#D8E8D5] bg-[#F1F8EF] p-4">
              <View className="h-9 w-9 items-center justify-center rounded-full bg-[#D8E8D5]">
                <Ionicons name="checkmark" size={20} color="#477A45" />
              </View>
              <View className="flex-1">
                <Text className="text-[14px] font-bold text-[#477A45]">እናመሰግናለን!</Text>
                <Text className="mt-0.5 text-[12px] text-[#5E7659]">አስተያየትዎ በተሳካ ሁኔታ ተቀብሏል።</Text>
              </View>
            </View>
          )}

          <View className="mt-8 items-center px-6">
            <Ionicons name="heart-outline" size={22} color={colors.accent} />
            <Text className="text-muted mt-2 text-center text-[12px] leading-5">
              የእርስዎ አስተያየት ፍሬ ሀይማኖትን ለማሻሻል ይረዳናል።
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Feedback;
