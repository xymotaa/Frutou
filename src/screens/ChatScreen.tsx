import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { ChatMessage } from '@/api';
import { Avatar } from '@/components/Avatar';
import { ChevronLeftIcon } from '@/components/icons';
import { resolveMediaUrl } from '@/lib/media';
import { useConversa } from '@/state/chat';
import type { RootStackScreenProps } from '@/navigation/types';
import { color } from '@/theme/tokens';

export function ChatScreen({ route, navigation }: RootStackScreenProps<'Chat'>) {
  const { id } = route.params;
  const { data: conversa, loading, erro, enviando, enviar } = useConversa(id);
  const [texto, setTexto] = useState('');

  const dados = useMemo(
    () => (conversa ? [...conversa.mensagens].reverse() : []),
    [conversa],
  );

  if (loading && !conversa) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color={color.primary} />
      </SafeAreaView>
    );
  }

  if (erro && !conversa) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background px-8">
        <Text className="text-center text-[15px] text-muted">{erro}</Text>
        <Pressable onPress={() => navigation.goBack()} className="mt-4">
          <Text className="text-[14px] font-semibold text-primary">Voltar</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  if (!conversa) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background px-8">
        <Text className="text-[15px] text-muted">Conversa não encontrada.</Text>
        <Pressable onPress={() => navigation.goBack()} className="mt-4">
          <Text className="text-[14px] font-semibold text-primary">Voltar</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  async function handleEnviar() {
    const t = texto.trim();
    if (!t) return;
    setTexto('');
    await enviar(t);
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      {/* Header */}
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
        <Avatar
          initial={conversa.parceiro.nome.charAt(0)}
          uri={resolveMediaUrl(conversa.parceiro.fotoUrl)}
          size={36}
        />
        <View className="flex-1">
          <Text
            className="text-[16px] font-bold text-ink"
            accessibilityRole="header"
          >
            {conversa.parceiro.nome}
          </Text>
          <Text className="text-[12px] text-muted" numberOfLines={1}>
            {conversa.assunto}
          </Text>
        </View>
      </View>

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        <FlatList
          data={dados}
          keyExtractor={(m: ChatMessage) => m.id}
          inverted
          contentContainerStyle={{ padding: 16, gap: 8 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => {
            const meu = item.de === 'eu';
            return (
              <View
                className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 ${
                  meu
                    ? 'self-end rounded-br-sm bg-primary'
                    : 'self-start rounded-bl-sm bg-input'
                }`}
              >
                <Text
                  className={`text-[14px] leading-5 ${
                    meu ? 'text-white' : 'text-ink'
                  }`}
                >
                  {item.texto}
                </Text>
                <Text
                  className={`mt-1 text-[10px] ${
                    meu ? 'text-white/70' : 'text-muted'
                  }`}
                >
                  {item.hora}
                </Text>
              </View>
            );
          }}
        />

        {/* Barra de envio */}
        <View className="flex-row items-end gap-2 border-t border-line bg-surface px-4 py-2.5">
          <View className="max-h-28 flex-1 justify-center rounded-2xl border border-line bg-input px-3 py-2">
            <TextInput
              className="text-[14px] text-ink"
              value={texto}
              onChangeText={setTexto}
              placeholder="Escreva uma mensagem..."
              placeholderTextColor={color.muted}
              selectionColor={color.primary}
              multiline
              accessibilityLabel="Escrever mensagem"
            />
          </View>
          <Pressable
            onPress={handleEnviar}
            disabled={!texto.trim() || enviando}
            accessibilityRole="button"
            accessibilityLabel="Enviar mensagem"
            className={`h-10 min-w-[72px] items-center justify-center rounded-full px-4 active:opacity-80 ${
              texto.trim() && !enviando ? 'bg-primary' : 'bg-line'
            }`}
          >
            {enviando ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text className="text-[14px] font-semibold text-white">Enviar</Text>
            )}
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
