import { useCallback, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ExploreCard } from '@/components/ExploreCard';
import { ExploreMap } from '@/components/ExploreMap';
import {
  ListIcon,
  MapIcon,
  MicIcon,
  SearchIcon,
  SlidersIcon,
} from '@/components/icons';
import { mockListings } from '@/data/mockListings';
import type { MainTabScreenProps } from '@/navigation/types';
import { color } from '@/theme/tokens';

const USER_NAME = 'Ryvera';

type ViewMode = 'lista' | 'mapa';

export function ExploreScreen(_props: MainTabScreenProps<'Explorar'>) {
  const [mode, setMode] = useState<ViewMode>('lista');
  const [favoritos, setFavoritos] = useState<Set<string>>(new Set());

  const toggleFavorito = useCallback((id: string) => {
    setFavoritos((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center justify-between border-b border-line bg-input px-5 py-3">
        <Text
          className="text-[19px] font-bold text-primary"
          accessibilityRole="header"
        >
          frut<Text className="text-accent">ou</Text>
        </Text>
        <View className="h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-line bg-surface">
          <Text className="text-[15px] font-bold text-primary">
            {USER_NAME.charAt(0)}
          </Text>
        </View>
      </View>

      <FlatList
        data={mode === 'lista' ? mockListings : []}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24, gap: 16 }}
        showsVerticalScrollIndicator={false}
        scrollEnabled={mode === 'lista'}
        renderItem={({ item }) => (
          <ExploreCard
            listing={item}
            favorito={favoritos.has(item.id)}
            onToggleFavorito={() => toggleFavorito(item.id)}
          />
        )}
        ListHeaderComponent={
          <View className="gap-4 pb-1 pt-5">
            <View className="gap-1">
              <Text className="text-[26px] font-bold text-ink">
                Descubra frutas
              </Text>
              <Text className="text-[14px] leading-5 text-muted">
                Encontre colheitas fresquinhas perto de você.
              </Text>
            </View>

            {/* Busca */}
            <View className="h-12 flex-row items-center gap-2 rounded-field border border-line bg-input px-3">
              <SearchIcon size={18} color={color.muted} />
              <Text className="flex-1 text-[14px] text-muted">
                Qual fruta você procura?
              </Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Buscar por voz"
                hitSlop={8}
                className="h-8 w-8 items-center justify-center rounded-full bg-surface"
              >
                <MicIcon size={16} color={color.muted} />
              </Pressable>
            </View>

            {/* Chip de filtros */}
            <View className="flex-row">
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Abrir filtros"
                className="flex-row items-center gap-1.5 rounded-full bg-accent px-4 py-2 active:opacity-80"
              >
                <SlidersIcon size={15} color="#FFFFFF" />
                <Text className="text-[13px] font-semibold text-white">
                  Filtros
                </Text>
              </Pressable>
            </View>

            {/* Contagem + toggle lista/mapa */}
            <View className="flex-row items-center justify-between pt-1">
              <Text className="text-[13px] text-muted">
                {mockListings.length} frutas perto de você
              </Text>

              <View className="flex-row overflow-hidden rounded-full border border-line bg-input">
                <Pressable
                  onPress={() => setMode('lista')}
                  accessibilityRole="button"
                  accessibilityLabel="Ver em lista"
                  accessibilityState={{ selected: mode === 'lista' }}
                  className={`px-3 py-1.5 ${mode === 'lista' ? 'bg-surface' : ''}`}
                >
                  <ListIcon
                    size={16}
                    color={mode === 'lista' ? color.primary : color.muted}
                  />
                </Pressable>
                <Pressable
                  onPress={() => setMode('mapa')}
                  accessibilityRole="button"
                  accessibilityLabel="Ver no mapa"
                  accessibilityState={{ selected: mode === 'mapa' }}
                  className={`px-3 py-1.5 ${mode === 'mapa' ? 'bg-surface' : ''}`}
                >
                  <MapIcon
                    size={16}
                    color={mode === 'mapa' ? color.primary : color.muted}
                  />
                </Pressable>
              </View>
            </View>
          </View>
        }
        ListEmptyComponent={
          mode === 'mapa' ? (
            <View className="h-[420px] overflow-hidden rounded-3xl border border-line">
              <ExploreMap listings={mockListings} />
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}
