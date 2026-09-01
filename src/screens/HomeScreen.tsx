import { useMemo, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HandHeartIcon, PlusIcon, SlidersIcon } from '@/components/icons';
import { ListingCard } from '@/components/ListingCard';
import { ScreenHeader } from '@/components/ScreenHeader';
import { ScreenTitle } from '@/components/ScreenTitle';
import { SearchBar } from '@/components/SearchBar';
import { mockListings } from '@/data/mockListings';
import { usuarioAtual } from '@/data/mockPerfil';
import type { MainTabScreenProps } from '@/navigation/types';
import { color } from '@/theme/tokens';

function greeting(date = new Date()): string {
  const h = date.getHours();
  if (h < 12) return 'Bom dia';
  if (h < 18) return 'Boa tarde';
  return 'Boa noite';
}

export function HomeScreen({ navigation }: MainTabScreenProps<'Inicio'>) {
  const saudacao = useMemo(() => greeting(), []);
  const [busca, setBusca] = useState('');

  const lista = useMemo(() => {
    const q = busca.trim().toLowerCase();
    if (!q) return mockListings;
    return mockListings.filter(
      (l) =>
        l.titulo.toLowerCase().includes(q) ||
        l.autor.toLowerCase().includes(q) ||
        l.fruta.toLowerCase().includes(q),
    );
  }, [busca]);

  const buscando = busca.trim().length > 0;

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScreenHeader
        avatarInitial={usuarioAtual.inicial}
        onPressAvatar={() => navigation.navigate('Usuario')}
      />

      <FlatList
        data={lista}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ gap: 12, paddingHorizontal: 20 }}
        contentContainerStyle={{ paddingBottom: 24, gap: 12 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <ListingCard
            listing={item}
            onPress={() => navigation.navigate('Detalhes', { id: item.id })}
          />
        )}
        ListHeaderComponent={
          <View className="gap-4 px-5 pb-1 pt-4">
            <ScreenTitle title={`${saudacao}, ${usuarioAtual.primeiroNome}!`} />

            <SearchBar
              placeholder="O que você está procurando?"
              value={busca}
              onChangeText={setBusca}
              trailing={{
                icon: <SlidersIcon size={18} color={color.ink} />,
                onPress: () => {},
                accessibilityLabel: 'Filtros de busca',
              }}
            />

            {!buscando ? (
              <>
                {/* CTA anunciar */}
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Anunciar frutas que estão sobrando"
                  onPress={() => navigation.navigate('Anunciar')}
                  className="flex-row items-center gap-3 rounded-2xl border border-line bg-surface p-4 active:opacity-90"
                >
                  <View className="flex-1 gap-0.5">
                    <Text className="text-[15px] font-bold text-ink">
                      Tem frutas sobrando?
                    </Text>
                    <Text className="text-[13px] leading-5 text-muted">
                      Compartilhe com a comunidade. Doe ou venda.
                    </Text>
                  </View>
                  <View className="h-12 w-12 items-center justify-center rounded-full bg-accent">
                    <PlusIcon size={22} color="#FFFFFF" />
                  </View>
                </Pressable>

                {/* Título da seção */}
                <View className="flex-row items-center justify-between pt-1">
                  <Text className="text-[15px] font-semibold text-ink">
                    Frutas próximas a você
                  </Text>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Ver frutas próximas no mapa"
                  >
                    <Text className="text-[13px] font-semibold text-accent-dark">
                      ver mapa
                    </Text>
                  </Pressable>
                </View>
              </>
            ) : (
              <Text className="text-[13px] text-muted">
                {lista.length}{' '}
                {lista.length === 1 ? 'resultado' : 'resultados'} para “
                {busca.trim()}”
              </Text>
            )}
          </View>
        }
        ListEmptyComponent={
          <View className="items-center gap-2 px-8 pt-16">
            <HandHeartIcon size={32} color={color.line} />
            <Text className="text-center text-[14px] text-muted">
              {buscando
                ? `Nenhuma fruta encontrada para “${busca.trim()}”. Tente outro termo.`
                : 'Ainda não há anúncios perto de você. Que tal ser o primeiro a compartilhar?'}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
