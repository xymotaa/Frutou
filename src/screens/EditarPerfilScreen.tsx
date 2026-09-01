import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FormField } from '@/components/FormField';
import {
  CheckCircleIcon,
  ChevronLeftIcon,
  MailIcon,
  MapPinIcon,
  PencilIcon,
  UserIcon,
} from '@/components/icons';
import { usuarioAtual } from '@/data/mockPerfil';
import type { RootStackScreenProps } from '@/navigation/types';
import { color } from '@/theme/tokens';

export function EditarPerfilScreen({
  navigation,
}: RootStackScreenProps<'EditarPerfil'>) {
  const [nome, setNome] = useState(usuarioAtual.nome);
  const [email, setEmail] = useState(usuarioAtual.email);
  const [telefone, setTelefone] = useState(usuarioAtual.telefone);
  const [bairro, setBairro] = useState(usuarioAtual.bairro);
  const [bio, setBio] = useState(usuarioAtual.bio);

  function handleSalvar() {
    // TODO: enviar para usersService.update quando o backend existir.
    navigation.goBack();
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <View className="flex-row items-center gap-3 border-b border-line bg-input px-4 py-3">
        <Pressable
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Voltar"
          hitSlop={8}
          className="h-9 w-9 items-center justify-center rounded-full active:opacity-70"
        >
          <ChevronLeftIcon size={22} color={color.ink} />
        </Pressable>
        <Text
          className="text-[17px] font-bold text-ink"
          accessibilityRole="header"
        >
          Editar perfil
        </Text>
      </View>

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={{ padding: 20, paddingBottom: 24, gap: 20 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Avatar */}
          <View className="items-center gap-2 pt-2">
            <View className="h-24 w-24">
              <View className="h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-input">
                <Text className="text-[32px] font-bold text-primary">
                  {usuarioAtual.inicial}
                </Text>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Trocar foto"
                className="absolute bottom-0 right-0 h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-accent active:opacity-80"
              >
                <PencilIcon size={14} color="#FFFFFF" />
              </Pressable>
            </View>
            <Pressable accessibilityRole="button" accessibilityLabel="Trocar foto">
              <Text className="text-[13px] font-semibold text-primary">
                Trocar foto
              </Text>
            </Pressable>
          </View>

          <View className="gap-4">
            <FormField
              label="Nome"
              value={nome}
              onChangeText={setNome}
              placeholder="Seu nome"
              autoCapitalize="words"
              trailing={<UserIcon size={18} color={color.muted} />}
            />
            <FormField
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="voce@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              trailing={<MailIcon size={18} color={color.muted} />}
            />
            <FormField
              label="Telefone"
              value={telefone}
              onChangeText={setTelefone}
              placeholder="(00) 00000-0000"
              keyboardType="phone-pad"
            />
            <FormField
              label="Bairro"
              value={bairro}
              onChangeText={setBairro}
              placeholder="Seu bairro e cidade"
              trailing={<MapPinIcon size={18} color={color.muted} />}
            />
            <FormField
              label="Sobre você"
              value={bio}
              onChangeText={setBio}
              multiline
              placeholder="Conte um pouco sobre você e as frutas que costuma ter."
            />
          </View>
        </ScrollView>

        <View className="border-t border-line bg-surface px-5 pb-2 pt-3">
          <Pressable
            onPress={handleSalvar}
            accessibilityRole="button"
            accessibilityLabel="Salvar alterações"
            className="h-14 flex-row items-center justify-center gap-2 rounded-field bg-primary active:opacity-80"
          >
            <CheckCircleIcon size={18} color="#FFFFFF" />
            <Text className="text-[15px] font-semibold text-white">
              Salvar alterações
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
