import { useRef, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  UserIcon,
} from '@/components/icons';
import { TextField } from '@/components/TextField';
import type { RootStackScreenProps } from '@/navigation/types';

type Errors = Partial<Record<'nome' | 'email' | 'senha' | 'confirmar', string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SignUpScreen({ navigation }: RootStackScreenProps<'SignUp'>) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [showSenha, setShowSenha] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const emailRef = useRef<TextInput>(null);
  const senhaRef = useRef<TextInput>(null);
  const confirmarRef = useRef<TextInput>(null);

  function validate(): Errors {
    const next: Errors = {};
    if (nome.trim().length < 2) next.nome = 'Informe seu nome completo.';
    if (!EMAIL_RE.test(email.trim())) next.email = 'Informe um email válido.';
    if (senha.length < 8) next.senha = 'A senha precisa ter ao menos 8 caracteres.';
    if (confirmar !== senha) next.confirmar = 'As senhas não coincidem.';
    return next;
  }

  async function handleSignUp() {
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setLoading(true);
    // TODO: integrar com authService.signUp quando o backend existir.
    setTimeout(() => {
      setLoading(false);
      navigation.goBack();
    }, 800);
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerClassName="grow px-6 pb-6"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="items-center pt-8 pb-8">
            <Image
              source={require('@/assets/frutou-logo.png')}
              style={{ width: 112, height: 112 }}
              resizeMode="contain"
              accessibilityLabel="Frutou"
            />
          </View>

          <View className="pb-7">
            <Text className="text-[22px] font-bold text-ink">Criar conta</Text>
            <Text className="mt-1 text-[14px] leading-5 text-muted">
              Cadastre-se para anunciar frutas ou receber as que estão sobrando
              perto de você.
            </Text>
          </View>

          <View className="gap-5">
            <TextField
              label="Seu nome"
              icon={<UserIcon />}
              value={nome}
              onChangeText={setNome}
              placeholder="Nome e sobrenome"
              autoCapitalize="words"
              autoComplete="name"
              textContentType="name"
              returnKeyType="next"
              onSubmitEditing={() => emailRef.current?.focus()}
              error={errors.nome}
            />

            <TextField
              ref={emailRef}
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
              onSubmitEditing={() => senhaRef.current?.focus()}
              error={errors.email}
            />

            <TextField
              ref={senhaRef}
              label="Crie uma senha"
              icon={<LockIcon />}
              value={senha}
              onChangeText={setSenha}
              placeholder="Ao menos 8 caracteres"
              secureTextEntry={!showSenha}
              autoCapitalize="none"
              autoComplete="password-new"
              textContentType="newPassword"
              returnKeyType="next"
              onSubmitEditing={() => confirmarRef.current?.focus()}
              trailing={{
                icon: showSenha ? <EyeOffIcon /> : <EyeIcon />,
                onPress: () => setShowSenha((v) => !v),
                accessibilityLabel: showSenha ? 'Ocultar senha' : 'Mostrar senha',
              }}
              error={errors.senha}
            />

            <TextField
              ref={confirmarRef}
              label="Confirme a senha"
              icon={<LockIcon />}
              value={confirmar}
              onChangeText={setConfirmar}
              placeholder="Repita a senha"
              secureTextEntry={!showSenha}
              autoCapitalize="none"
              autoComplete="password-new"
              textContentType="newPassword"
              returnKeyType="done"
              onSubmitEditing={handleSignUp}
              error={errors.confirmar}
            />
          </View>

          <View className="mt-8">
            <Button
              label="Criar conta"
              onPress={handleSignUp}
              loading={loading}
            />
          </View>

          <View className="grow" />

          <View className="flex-row justify-center pt-8">
            <Text className="text-[13px] text-muted">Já tem conta? </Text>
            <Pressable
              onPress={() => navigation.goBack()}
              accessibilityRole="button"
              accessibilityLabel="Voltar para o login"
              hitSlop={8}
            >
              <Text className="text-[13px] font-semibold text-primary">
                Fazer login
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
