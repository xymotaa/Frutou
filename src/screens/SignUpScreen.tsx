import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { RootStackScreenProps } from '@/navigation/types';

export function SignUpScreen(_props: RootStackScreenProps<'SignUp'>) {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-6" />
    </SafeAreaView>
  );
}
