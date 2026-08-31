import { useCallback, useMemo, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ExploreCard } from '@/components/ExploreCard';
import { ExploreMap } from '@/components/ExploreMap';
import { FilterChips, type FilterOption } from '@/components/FilterChips';
import { HandHeartIcon, ListIcon, MapIcon, MicIcon } from '@/components/icons';
import { ScreenTitle } from '@/components/ScreenTitle';
import { SearchBar } from '@/components/SearchBar';
import { mockListings } from '@/data/mockListings';
import type { MainTabScreenProps } from '@/navigation/types';
import { color } from '@/theme/tokens';

const USER_NAME = 'Ryvera';

type ViewMode = 'lista' | 'mapa';
type ModalidadeFiltro = 'todas' | 'doacao' | 'venda';
type DistanciaFiltro = 'todas' | '1' | '3';

const MODALIDADE_OPTS: readonly FilterOption<ModalidadeFiltro>[] = [
  { value: 'todas', label: 'Todas' },
  { value: 'doacao', label: 'Doação' },
  { value: 'venda', label: 'À venda' },
];

const DISTANCIA_OPTS: readonly FilterOption<DistanciaFiltro>[] = [
  { value: 'todas', label: 'Qualquer distância' },
  { value: '1', label: 'Até 1 km' },
  { value: '3', label: 'Até 3 km' },
];

/** Converte "1,2 km" / "850 m" para número em km. */
function distanciaEmKm(texto: string): number {
  const normalizado = texto.replace(',', '.');
  const valor = parseFloat(normalizado);
  return normalizado.includes('km') ? valor : valor / 1000;
}

export function ExploreScreen({
  navigation,
}: MainTabScreenProps<'Explorar'>) {
  const [mode, setMode] = useState<ViewMode>('lista');
  const [favoritos, setFavoritos] = useState<Set<string>>(new Set());
  const [modalidade, setModalidade] = useState<ModalidadeFiltro>('todas');
  const [distancia, setDistancia] = useState<DistanciaFiltro>('todas');

  const toggleFavorito = useCallback((id: string) => {
    setFavoritos((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const listaFiltrada = useMemo(() => {
    return mockListings.filter((l) => {
      if (modalidade !== 'todas' && l.modalidade !== modalidade) return false;
      if (distancia !== 'todas' && distanciaEmKm(l.distancia) > Number(distancia)) {
        return false;
      }
      return true;
    });
  }, [modalidade, distancia]);

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
        data={mode === 'lista' ? listaFiltrada : []}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24, gap: 16 }}
        showsVerticalScrollIndicator={false}
        scrollEnabled={mode === 'lista'}
        renderItem={({ item }) => (
          <ExploreCard
            listing={item}
            favorito={favoritos.has(item.id)}
            onToggleFavorito={() => toggleFavorito(item.id)}
            onPress={() => navigation.navigate('Detalhes', { id: item.id })}
          />
        )}
        ListHeaderComponent={
          <View className="gap-4 pb-1 pt-4">
            <ScreenTitle
              title="Descubra frutas"
              subtitle="Encontre colheitas fresquinhas perto de você."
            />

            <SearchBar
              placeholder="Qual fruta você procura?"
              trailing={{
                icon: <MicIcon size={18} color={color.ink} />,
                onPress: () => {},
                accessibilityLabel: 'Buscar por voz',
              }}
            />

            {/* Filtros */}
            <View className="gap-2.5">
              <FilterChips
                options={MODALIDADE_OPTS}
                selected={modalidade}
                onSelect={setModalidade}
                accessibilityLabel="Filtrar por modalidade"
              />
              <FilterChips
                options={DISTANCIA_OPTS}
                selected={distancia}
                onSelect={setDistancia}
                accessibilityLabel="Filtrar por distância"
              />
            </View>

            {/* Contagem + toggle lista/mapa */}
            <View className="flex-row items-center justify-between pt-1">
              <Text className="text-[13px] text-muted">
                {listaFiltrada.length}{' '}
                {listaFiltrada.length === 1 ? 'fruta' : 'frutas'} perto de você
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
              <ExploreMap listings={listaFiltrada} />
            </View>
          ) : (
            <View className="items-center gap-2 px-8 pt-12">
              <HandHeartIcon size={32} color={color.line} />
              <Text className="text-center text-[14px] text-muted">
                Nenhuma fruta com esses filtros. Tente ampliar a distância ou a
                modalidade.
              </Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
}
