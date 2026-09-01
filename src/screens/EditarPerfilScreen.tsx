import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ApiError } from '@/api/client';
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
import { atualizarPerfil, usePerfil } from '@/state/perfil';
import type { RootStackScreenProps } from '@/navigation/types';
import { escolherAcaoFoto } from '@/services/pickImage';
import { color } from '@/theme/tokens';

export function EditarPerfilScreen({
  navigation,
}: RootStackScreenProps<'EditarPerfil'>) {
  const perfil = usePerfil();
  const [nome, setNome] = useState(perfil.nome);
  const [telefone, setTelefone] = useState(perfil.telefone);
  const [bairro, setBairro] = useState(perfil.bairro);
  const [bio, setBio] = useState(perfil.bio);
  const [fotoUri, setFotoUri] = useState<string | null>(perfil.fotoUri);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function handleFoto() {
    const acao = await escolherAcaoFoto(!!fotoUri);
    if (acao.tipo === 'trocar') setFotoUri(acao.uri);
    else if (acao.tipo === 'remover') setFotoUri(null);
  }

  async function handleSalvar() {
    setSalvando(true);
    setErro(null);
    try {
      await atualizarPerfil({
        nome,
        telefone,
        bairro,
        bio,
        // só envia a foto se mudou (URI local nova ou remoção)
        fotoUri: fotoUri === perfil.fotoUri ? undefined : fotoUri,
      });
      navigation.goBack();
    } catch (e) {
      setErro(
        e instanceof ApiError ? e.message : 'Não foi possível salvar. Tente de novo.',
      );
    } finally {
      setSalvando(false);
    }
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
            <View className="gap-1.5">
              <Text className="text-[13px] font-semibold text-ink">Email</Text>
              <View className="h-12 flex-row items-center gap-2 rounded-field border border-line bg-input px-3 opacity-60">
                <Text className="flex-1 text-[14px] text-ink">
                  {perfil.email}
                </Text>
                <MailIcon size={18} color={color.muted} />
              </View>
              <Text className="text-[12px] text-muted">
                O email não pode ser alterado.
              </Text>
            </View>
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
          {erro ? (
            <Text className="mb-2 text-center text-[13px] text-danger">{erro}</Text>
          ) : null}
          <View className="items-center">
            <Pressable
              onPress={handleSalvar}
              disabled={salvando}
              accessibilityRole="button"
              accessibilityLabel="Salvar alterações"
              accessibilityState={{ disabled: salvando }}
              className={`h-12 w-full max-w-[340px] flex-row items-center justify-center gap-2 rounded-field bg-primary active:opacity-80 ${
                salvando ? 'opacity-60' : ''
              }`}
            >
              {salvando ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <>
                  <CheckCircleIcon size={18} color="#FFFFFF" />
                  <Text className="text-[15px] font-semibold text-white">
                    Salvar alterações
                  </Text>
                </>
              )}
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
