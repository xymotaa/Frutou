import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { ListingListItem } from '@/api';
import { ExploreCard } from '@/components/ExploreCard';
import { HandHeartIcon, ListIcon, MapIcon, MapPinIcon, MicIcon } from '@/components/icons';
import { MapaFrutas, temGeo } from '@/components/MapaFrutas';
import { ScreenHeader } from '@/components/ScreenHeader';
import { ScreenTitle } from '@/components/ScreenTitle';
import { SearchBar } from '@/components/SearchBar';
import { iniciarConversa } from '@/state/chat';
import { alternarFavorito, useFeed } from '@/state/feed';
import { usePerfil } from '@/state/perfil';
import type { MainTabScreenProps } from '@/navigation/types';
import { color } from '@/theme/tokens';

type ViewMode = 'lista' | 'mapa';
type ModalidadeFiltro = 'todas' | 'doacao' | 'venda';
type DistanciaFiltro = 'todas' | '1' | '3';

const MODALIDADE_OPTS: { value: ModalidadeFiltro; label: string }[] = [
  { value: 'todas', label: 'Todas' },
  { value: 'doacao', label: 'Doação' },
  { value: 'venda', label: 'À venda' },
];

const DISTANCIA_OPTS: { value: DistanciaFiltro; label: string }[] = [
  { value: 'todas', label: 'Qualquer distância' },
  { value: '1', label: 'Até 1 km' },
  { value: '3', label: 'Até 3 km' },
];

export function ExploreScreen({
  navigation,
}: MainTabScreenProps<'Explorar'>) {
  const perfil = usePerfil();
  const [mode, setMode] = useState<ViewMode>('lista');
  const [busca, setBusca] = useState('');
  const [buscaDebounced, setBuscaDebounced] = useState('');
  const [modalidade, setModalidade] = useState<ModalidadeFiltro>('todas');
  const [distancia, setDistancia] = useState<DistanciaFiltro>('todas');

  // favoritos otimistas: id -> favorito?  (sobrepõe o valor vindo da API)
  const [favOverride, setFavOverride] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const t = setTimeout(() => setBuscaDebounced(busca.trim()), 300);
    return () => clearTimeout(t);
  }, [busca]);

  const filtros = useMemo(
    () => ({
      q: buscaDebounced || undefined,
      modalidade: modalidade === 'todas' ? undefined : modalidade,
      raioKm: distancia === 'todas' ? undefined : Number(distancia),
    }),
    [buscaDebounced, modalidade, distancia],
  );

  const { data, loading, erro, refetch } = useFeed(filtros);
  const lista = data ?? [];
  const comGeo = useMemo(() => lista.filter(temGeo), [lista]);

  const isFavorito = useCallback(
    (l: ListingListItem) => favOverride[l.id] ?? l.favorito,
    [favOverride],
  );

  const toggleFavorito = useCallback(
    (l: ListingListItem) => {
      const atual = favOverride[l.id] ?? l.favorito;
      setFavOverride((prev) => ({ ...prev, [l.id]: !atual }));
      alternarFavorito(l.id, atual).catch(() => {
        // reverte se a API falhar
        setFavOverride((prev) => ({ ...prev, [l.id]: atual }));
      });
    },
    [favOverride],
  );

  const [abrindoChat, setAbrindoChat] = useState<string | null>(null);

  const abrirChat = useCallback(
    async (l: ListingListItem) => {
      if (abrindoChat) return;
      setAbrindoChat(l.id);
      try {
        const id = await iniciarConversa(l.id);
        navigation.navigate('Chat', { id });
      } catch {
        // silencioso; o usuário pode tentar de novo
      } finally {
        setAbrindoChat(null);
      }
    },
    [navigation, abrindoChat],
  );

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScreenHeader
        avatarInitial={perfil.inicial}
        avatarUri={perfil.fotoUri}
        onPressAvatar={() => navigation.navigate('Usuario')}
      />

      <FlatList
        data={mode === 'lista' ? lista : []}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 24,
          gap: 16,
          flexGrow: mode === 'mapa' ? 1 : undefined,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={mode === 'lista'}
        renderItem={({ item }) => (
          <ExploreCard
            listing={item}
            favorito={isFavorito(item)}
            onAction={() => abrirChat(item)}
            onToggleFavorito={() => toggleFavorito(item)}
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
              value={busca}
              onChangeText={setBusca}
              trailing={{
                icon: <MicIcon size={18} color={color.ink} />,
                onPress: () => {},
                accessibilityLabel: 'Buscar por voz',
              }}
            />

            {/* Filtros — uma linha só, rolável na horizontal */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                gap: 8,
                paddingRight: 20,
                alignItems: 'center',
              }}
              accessibilityRole="tablist"
              accessibilityLabel="Filtros de busca"
            >
              {MODALIDADE_OPTS.map((opt) => {
                const active = opt.value === modalidade;
                return (
                  <Pressable
                    key={`m-${opt.value}`}
                    onPress={() => setModalidade(opt.value)}
                    accessibilityRole="button"
                    accessibilityState={{ selected: active }}
                    accessibilityLabel={`Modalidade: ${opt.label}`}
                    className={`rounded-full border px-4 py-2 active:opacity-80 ${
                      active
                        ? 'border-primary bg-primary'
                        : 'border-line bg-surface'
                    }`}
                  >
                    <Text
                      className={`text-[13px] font-semibold ${
                        active ? 'text-white' : 'text-muted'
                      }`}
                    >
                      {opt.label}
                    </Text>
                  </Pressable>
                );
              })}

              <View className="mx-1 h-5 w-px bg-line" />

              {DISTANCIA_OPTS.map((opt) => {
                const active = opt.value === distancia;
                return (
                  <Pressable
                    key={`d-${opt.value}`}
                    onPress={() => setDistancia(opt.value)}
                    accessibilityRole="button"
                    accessibilityState={{ selected: active }}
                    accessibilityLabel={`Distância: ${opt.label}`}
                    className={`rounded-full border px-4 py-2 active:opacity-80 ${
                      active
                        ? 'border-primary bg-primary'
                        : 'border-line bg-surface'
                    }`}
                  >
                    <Text
                      className={`text-[13px] font-semibold ${
                        active ? 'text-white' : 'text-muted'
                      }`}
                    >
                      {opt.label}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>

            <View className="flex-row items-center justify-between pt-1">
              <Text className="text-[13px] text-muted">
                {loading
                  ? 'Carregando…'
                  : mode === 'mapa'
                    ? `${comGeo.length} ${
                        comGeo.length === 1 ? 'fruta' : 'frutas'
                      } no mapa`
                    : `${lista.length} ${
                        lista.length === 1 ? 'fruta' : 'frutas'
                      } perto de você`}
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
            <View className="-mx-5 flex-1 overflow-hidden">
              {loading ? (
                <View className="flex-1 items-center justify-center">
                  <ActivityIndicator size="large" color={color.primary} />
                </View>
              ) : comGeo.length === 0 ? (
                <View className="flex-1 items-center justify-center gap-2 px-8">
                  <MapPinIcon size={32} color={color.line} />
                  <Text className="text-center text-[14px] text-muted">
                    Nenhuma fruta com localização para mostrar no mapa.
                  </Text>
                </View>
              ) : (
                <MapaFrutas
                  listings={comGeo}
                  onSelecionar={(id) =>
                    navigation.navigate('Detalhes', { id })
                  }
                />
              )}
            </View>
          ) : loading ? (
            <View className="items-center pt-16">
              <ActivityIndicator size="large" color={color.primary} />
            </View>
          ) : erro ? (
            <View className="items-center gap-3 px-8 pt-12">
              <Text className="text-center text-[14px] text-muted">{erro}</Text>
              <Pressable
                onPress={refetch}
                accessibilityRole="button"
                className="rounded-full bg-primary px-5 py-2.5 active:opacity-80"
              >
                <Text className="text-[13px] font-semibold text-white">
                  Tentar de novo
                </Text>
              </Pressable>
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
