import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from '@/components/icons';
import { TextField } from '@/components/TextField';
import type { RootStackScreenProps } from '@/navigation/types';

export function LoginScreen({ navigation }: RootStackScreenProps<'Login'>) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showSenha, setShowSenha] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    // TODO: integrar com authService.login quando o backend existir.
    setTimeout(() => setLoading(false), 800);
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingBottom: 24 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="items-center pt-12 pb-14">
            <Image
              source={require('@/assets/frutou-logo.png')}
              style={{ width: 176, height: 176 }}
              resizeMode="contain"
              accessibilityLabel="Frutou"
            />
          </View>

          <View className="gap-5">
            <TextField
              label="Insira o email"
              icon={<MailIcon />}
              value={email}
              onChangeText={setEmail}
              placeholder="voce@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
              returnKeyType="next"
            />

            <TextField
              label="Insira a senha"
              icon={<LockIcon />}
              value={senha}
              onChangeText={setSenha}
              placeholder="Sua senha"
              secureTextEntry={!showSenha}
              autoCapitalize="none"
              autoComplete="password"
              textContentType="password"
              returnKeyType="done"
              onSubmitEditing={handleLogin}
              trailing={{
                icon: showSenha ? <EyeOffIcon /> : <EyeIcon />,
                onPress: () => setShowSenha((v) => !v),
                accessibilityLabel: showSenha ? 'Ocultar senha' : 'Mostrar senha',
              }}
            />
          </View>

          <View className="mt-8 flex-row gap-3">
            <Button label="Fazer login" onPress={handleLogin} loading={loading} />
            <Button
              label="Criar conta"
              variant="outline"
              onPress={() => navigation.navigate('SignUp')}
            />
          </View>

          <View className="grow" />

          <Text className="pt-10 text-center text-[12px] leading-4 text-muted">
            Desenvolvido e mantido pela empresa Ryvera Code
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
