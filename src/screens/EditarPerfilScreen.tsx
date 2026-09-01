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

import { Avatar } from '@/components/Avatar';
import { FormField } from '@/components/FormField';
import {
  CheckCircleIcon,
  ChevronLeftIcon,
  MailIcon,
  MapPinIcon,
  PencilIcon,
  UserIcon,
} from '@/components/icons';
import { atualizarPerfil, usePerfil } from '@/data/mockPerfil';
import type { RootStackScreenProps } from '@/navigation/types';
import { escolherAcaoFoto } from '@/services/pickImage';
import { color } from '@/theme/tokens';

export function EditarPerfilScreen({
  navigation,
}: RootStackScreenProps<'EditarPerfil'>) {
  const perfil = usePerfil();
  const [nome, setNome] = useState(perfil.nome);
  const [email, setEmail] = useState(perfil.email);
  const [telefone, setTelefone] = useState(perfil.telefone);
  const [bairro, setBairro] = useState(perfil.bairro);
  const [bio, setBio] = useState(perfil.bio);
  const [fotoUri, setFotoUri] = useState<string | null>(perfil.fotoUri);

  async function handleFoto() {
    const acao = await escolherAcaoFoto(!!fotoUri);
    if (acao.tipo === 'trocar') setFotoUri(acao.uri);
    else if (acao.tipo === 'remover') setFotoUri(null);
  }

  function handleSalvar() {
    // TODO: enviar para usersService.update quando o backend existir.
    atualizarPerfil({ nome, email, telefone, bairro, bio, fotoUri });
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
          <View className="items-center pt-2">
            <Pressable
              onPress={handleFoto}
              accessibilityRole="button"
              accessibilityLabel="Alterar foto de perfil"
              className="h-24 w-24 active:opacity-90"
            >
              <Avatar initial={perfil.inicial} uri={fotoUri} size={96} />
              <View className="absolute bottom-0 right-0 h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-accent">
                <PencilIcon size={14} color="#FFFFFF" />
              </View>
            </Pressable>

            <View className="mt-3 flex-row items-center gap-4">
              <Pressable
                onPress={handleFoto}
                accessibilityRole="button"
                accessibilityLabel={fotoUri ? 'Trocar foto' : 'Adicionar foto'}
              >
                <Text className="text-[13px] font-semibold text-primary">
                  {fotoUri ? 'Trocar foto' : 'Adicionar foto'}
                </Text>
              </Pressable>
              {fotoUri ? (
                <Pressable
                  onPress={() => setFotoUri(null)}
                  accessibilityRole="button"
                  accessibilityLabel="Remover foto"
                >
                  <Text className="text-[13px] font-semibold text-danger">
                    Remover foto
                  </Text>
                </Pressable>
              ) : null}
            </View>
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
          <View className="items-center">
            <Pressable
              onPress={handleSalvar}
              accessibilityRole="button"
              accessibilityLabel="Salvar alterações"
              className="h-12 w-full max-w-[340px] flex-row items-center justify-center gap-2 rounded-field bg-primary active:opacity-80"
            >
              <CheckCircleIcon size={18} color="#FFFFFF" />
              <Text className="text-[15px] font-semibold text-white">
                Salvar alterações
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
