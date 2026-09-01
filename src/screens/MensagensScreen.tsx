import { useMemo, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar } from '@/components/Avatar';
import { GiftIcon, HandHeartIcon, TagIcon } from '@/components/icons';
import { ScreenHeader } from '@/components/ScreenHeader';
import { ScreenTitle } from '@/components/ScreenTitle';
import { SearchBar } from '@/components/SearchBar';
import { type Conversa, useConversas } from '@/data/mockConversas';
import { usePerfil } from '@/state/perfil';
import type { MainTabScreenProps } from '@/navigation/types';
import { color } from '@/theme/tokens';

function ultimaMensagem(c: Conversa): string {
  const m = c.mensagens[c.mensagens.length - 1];
  if (!m) return '';
  return m.de === 'eu' ? `Você: ${m.texto}` : m.texto;
}

export function MensagensScreen({ navigation }: MainTabScreenProps<'Mensagens'>) {
  const perfil = usePerfil();
  const conversas = useConversas();
  const naoLidas = conversas.filter((c) => c.naoLida).length;
  const [busca, setBusca] = useState('');

  const lista = useMemo(() => {
    const q = busca.trim().toLowerCase();
    if (!q) return conversas;
    return conversas.filter(
      (c) =>
        c.nome.toLowerCase().includes(q) ||
        c.assunto.toLowerCase().includes(q) ||
        ultimaMensagem(c).toLowerCase().includes(q),
    );
  }, [busca, conversas]);

  const buscando = busca.trim().length > 0;

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScreenHeader
        avatarInitial={perfil.inicial}
        avatarUri={perfil.fotoUri}
        onPressAvatar={() => navigation.navigate('Usuario')}
      />

      <FlatList
        data={lista}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ItemSeparatorComponent={() => (
          <View className="ml-[76px] h-px bg-line" />
        )}
        ListHeaderComponent={
          <View className="gap-4 px-5 pb-3 pt-4">
            <ScreenTitle
              title="Conversas"
              subtitle={
                naoLidas > 0
                  ? `${naoLidas} nova${naoLidas > 1 ? 's' : ''} mensage${
                      naoLidas > 1 ? 'ns' : 'm'
                    }`
                  : 'Tudo em dia'
              }
            />

            <SearchBar
              placeholder="Buscar conversas..."
              value={busca}
              onChangeText={setBusca}
            />
          </View>
        }
        ListEmptyComponent={
          <View className="items-center gap-2 px-8 pt-12">
            <HandHeartIcon size={32} color={color.line} />
            <Text className="text-center text-[14px] text-muted">
              Nenhuma conversa encontrada para “{busca.trim()}”.
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          const isDoacao = item.modalidade === 'doacao';
          return (
            <Pressable
              onPress={() => navigation.navigate('Chat', { id: item.id })}
              accessibilityRole="button"
              accessibilityLabel={`Abrir conversa com ${item.nome} sobre ${item.assunto}`}
              className="flex-row items-center gap-3 px-5 py-3 active:bg-input"
            >
              <View className="relative">
                <Avatar initial={item.nome.charAt(0)} size={48} />
                <View
                  className={`absolute -bottom-0.5 -right-0.5 h-5 w-5 items-center justify-center rounded-full border-2 border-background ${
                    isDoacao ? 'bg-primary' : 'bg-accent'
                  }`}
                >
                  {isDoacao ? (
                    <HandHeartIcon size={10} color="#FFFFFF" />
                  ) : (
                    <TagIcon size={10} color="#FFFFFF" />
                  )}
                </View>
              </View>

              <View className="flex-1 gap-0.5">
                <View className="flex-row items-center justify-between">
                  <Text className="text-[15px] font-semibold text-ink">
                    {item.nome}
                  </Text>
                  <Text
                    className={`text-[12px] ${
                      item.naoLida
                        ? 'font-semibold text-accent-dark'
                        : 'text-muted'
                    }`}
                  >
                    {item.quando}
                  </Text>
                </View>
                <Text
                  className={`text-[13px] ${
                    item.naoLida ? 'font-medium text-ink' : 'text-muted'
                  }`}
                  numberOfLines={1}
                >
                  {ultimaMensagem(item)}
                </Text>
                <Text className="text-[11px] uppercase tracking-wide text-muted">
                  {item.assunto}
                </Text>
              </View>

              {item.naoLida ? (
                <View className="h-2.5 w-2.5 rounded-full bg-accent" />
              ) : null}
            </Pressable>
          );
        }}
        ListFooterComponent={
          buscando || lista.length === 0 ? null : (
            <View className="items-center gap-2 px-8 pt-12">
              <View className="h-16 w-16 items-center justify-center rounded-full bg-input">
                <HandHeartIcon size={28} color={color.line} />
              </View>
              <Text className="text-[15px] font-semibold text-ink">
                Sem mais conversas
              </Text>
              <Text className="text-center text-[13px] leading-5 text-muted">
                Explore a comunidade e encontre mais frutas frescas para
                compartilhar.
              </Text>
              <Pressable
                onPress={() => navigation.navigate('Explorar')}
                accessibilityRole="button"
                accessibilityLabel="Ir para Explorar"
                className="mt-1 flex-row items-center gap-1.5 rounded-full bg-input px-4 py-2 active:opacity-80"
              >
                <GiftIcon size={15} color={color.primary} />
                <Text className="text-[13px] font-semibold text-primary">
                  Descobrir
                </Text>
              </Pressable>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
}
