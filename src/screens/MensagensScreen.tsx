import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BellIcon, GiftIcon, HandHeartIcon, TagIcon } from '@/components/icons';
import { ScreenHeader } from '@/components/ScreenHeader';
import { ScreenTitle } from '@/components/ScreenTitle';
import { SearchBar } from '@/components/SearchBar';
import { mockConversas } from '@/data/mockConversas';
import { usuarioAtual } from '@/data/mockPerfil';
import type { MainTabScreenProps } from '@/navigation/types';
import { color } from '@/theme/tokens';


export function MensagensScreen({ navigation }: MainTabScreenProps<'Mensagens'>) {
  const naoLidas = mockConversas.filter((c) => c.naoLida).length;

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScreenHeader
        avatarInitial={usuarioAtual.inicial}
        onPressAvatar={() => navigation.navigate('Usuario')}
      />

      <FlatList
        data={mockConversas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View className="ml-[76px] h-px bg-line" />
        )}
        ListHeaderComponent={
          <View className="gap-4 px-5 pb-3 pt-4">
            <View className="flex-row items-start justify-between">
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
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Notificações"
                className="relative h-10 w-10 items-center justify-center rounded-full bg-input"
              >
                <BellIcon size={18} color={color.accent} />
                {naoLidas > 0 ? (
                  <View className="absolute right-2 top-2 h-2 w-2 rounded-full bg-danger" />
                ) : null}
              </Pressable>
            </View>

            <SearchBar placeholder="Buscar conversas..." />
          </View>
        }
        renderItem={({ item }) => {
          const isDoacao = item.modalidade === 'doacao';
          return (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Conversa com ${item.nome} sobre ${item.assunto}`}
              className="flex-row items-center gap-3 px-5 py-3 active:bg-input"
            >
              <View className="relative">
                <View className="h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-input">
                  <Text className="text-[16px] font-bold text-primary">
                    {item.nome.charAt(0)}
                  </Text>
                </View>
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
                      item.naoLida ? 'font-semibold text-accent-dark' : 'text-muted'
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
                  {item.ultimaMensagem}
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
        }
      />
    </SafeAreaView>
  );
}
