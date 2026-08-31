import { useMemo } from 'react';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { logoMark } from '@/assets';
import { HandHeartIcon, PlusIcon, SearchIcon, SlidersIcon } from '@/components/icons';
import { ListingCard } from '@/components/ListingCard';
import { mockListings } from '@/data/mockListings';
import type { MainTabScreenProps } from '@/navigation/types';
import { color } from '@/theme/tokens';

const USER_NAME = 'Ryvera';

function greeting(date = new Date()): string {
  const h = date.getHours();
  if (h < 12) return 'Bom dia';
  if (h < 18) return 'Boa tarde';
  return 'Boa noite';
}

export function HomeScreen({ navigation }: MainTabScreenProps<'Inicio'>) {
  const saudacao = useMemo(() => greeting(), []);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center justify-between border-b border-line bg-input px-5 py-3">
        <View className="flex-row items-center gap-2">
          <Image
            source={logoMark}
            style={{ width: 32, height: 32 }}
            resizeMode="contain"
            accessibilityLabel="Frutou"
          />
          <Text className="text-[17px] font-bold text-primary">
            frut<Text className="text-accent">ou</Text>
          </Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Abrir seu perfil"
          onPress={() => navigation.navigate('Usuario')}
          className="h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-line bg-surface"
        >
          <Text className="text-[15px] font-bold text-primary">
            {USER_NAME.charAt(0)}
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={mockListings}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ gap: 12, paddingHorizontal: 20 }}
        contentContainerStyle={{ paddingBottom: 24, gap: 12 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ListingCard listing={item} />}
        ListHeaderComponent={
          <View className="gap-4 px-5 pb-1 pt-4">
            <Text className="text-[20px] font-bold text-ink">
              {saudacao}, {USER_NAME}!
            </Text>

            {/* Busca */}
            <View className="flex-row items-center gap-2">
              <View className="h-12 flex-1 flex-row items-center gap-2 rounded-field border border-line bg-input px-3">
                <SearchIcon size={18} color={color.muted} />
                <Text className="flex-1 text-[14px] text-muted">
                  O que você está procurando?
                </Text>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Filtros de busca"
                className="h-12 w-12 items-center justify-center rounded-field border border-line bg-input active:opacity-80"
              >
                <SlidersIcon size={18} color={color.ink} />
              </Pressable>
            </View>

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
          </View>
        }
        ListEmptyComponent={
          <View className="items-center gap-2 px-8 pt-16">
            <HandHeartIcon size={32} color={color.line} />
            <Text className="text-center text-[14px] text-muted">
              Ainda não há anúncios perto de você. Que tal ser o primeiro a
              compartilhar?
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
