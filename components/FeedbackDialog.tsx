import { Ionicons } from '@expo/vector-icons';
import { Modal, Pressable, Text, View } from 'react-native';
import { useApp } from '../context/AppContext';

export type FeedbackDialogState = {
  title: string;
  message: string;
  variant: 'success' | 'error';
};

type FeedbackDialogProps = {
  dialog: FeedbackDialogState | null;
  onClose: () => void;
};

export function FeedbackDialog({ dialog, onClose }: FeedbackDialogProps) {
  const { theme } = useApp();

  if (!dialog) {
    return null;
  }

  return (
    <Modal transparent visible animationType="fade" statusBarTranslucent onRequestClose={onClose}>
      <View className="flex-1 justify-center px-6" style={{ backgroundColor: 'rgba(0,0,0,0.48)' }}>
        <View
          accessibilityViewIsModal
          className="w-full self-center rounded-2xl border p-5"
          style={{
            maxWidth: 380,
            backgroundColor: theme.colors.white,
            borderColor: theme.colors.border,
          }}>
          <View
            className="mb-4 h-12 w-12 items-center justify-center self-center rounded-full"
            style={{ backgroundColor: theme.colors.background }}>
            <Ionicons
              name={dialog.variant === 'success' ? 'checkmark-circle' : 'alert-circle'}
              size={30}
              color={theme.colors.primary}
            />
          </View>
          <Text className="text-center text-[18px] font-bold" style={{ color: theme.colors.ink }}>
            {dialog.title}
          </Text>
          <Text
            className="mt-2 text-center text-[14px] leading-5"
            style={{ color: theme.colors.muted }}>
            {dialog.message}
          </Text>
          <Pressable
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="እሺ"
            className="mt-5 items-center rounded-xl px-4 py-3"
            style={{ backgroundColor: theme.colors.primary }}>
            <Text
              className="text-[14px] font-semibold"
              style={{ color: theme.id === 'dark' ? theme.colors.ink : '#FFFFFF' }}>
              እሺ
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
