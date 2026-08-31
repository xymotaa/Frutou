import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/** Tela temporária para abas ainda não construídas. */
export function PlaceholderScreen({ title }: { title: string }) {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <View className="flex-1 items-center justify-center px-8">
        <Text className="text-[18px] font-semibold text-ink">{title}</Text>
        <Text className="mt-1 text-center text-[14px] text-muted">
          Em breve.
        </Text>
      </View>
    </SafeAreaView>
  );
}
