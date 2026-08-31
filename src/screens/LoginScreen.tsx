import { Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { RootStackScreenProps } from '@/navigation/types';

export function LoginScreen(_props: RootStackScreenProps<'Login'>) {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center px-6">
        <Image
          source={require('@/assets/frutou-logo.png')}
          className="h-40 w-40"
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
}
