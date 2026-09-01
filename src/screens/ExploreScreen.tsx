import { useCallback, useMemo, useState } from 'react';
import { FlatList, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ExploreCard } from '@/components/ExploreCard';
import { ExploreMap } from '@/components/ExploreMap';
import { HandHeartIcon, ListIcon, MapIcon, MicIcon } from '@/components/icons';
import { ScreenHeader } from '@/components/ScreenHeader';
import { ScreenTitle } from '@/components/ScreenTitle';
import { SearchBar } from '@/components/SearchBar';
import { iniciarConversa, textoInteresse } from '@/data/mockConversas';
import { mockListings, type Listing } from '@/data/mockListings';
import { usePerfil } from '@/data/mockPerfil';
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

/** Converte "1,2 km" / "850 m" para número em km. */
function distanciaEmKm(texto: string): number {
  const normalizado = texto.replace(',', '.');
  const valor = parseFloat(normalizado);
  return normalizado.includes('km') ? valor : valor / 1000;
}

export function ExploreScreen({
  navigation,
}: MainTabScreenProps<'Explorar'>) {
  const perfil = usePerfil();
  const [mode, setMode] = useState<ViewMode>('lista');
  const [favoritos, setFavoritos] = useState<Set<string>>(new Set());
  const [busca, setBusca] = useState('');
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

  const abrirChat = useCallback(
    (l: Listing) => {
      const doacao = l.modalidade === 'doacao';
      const assunto = doacao
        ? `${l.titulo} · Doação`
        : `${l.titulo} · ${l.preco}`;
      const id = iniciarConversa(
        l.autor,
        assunto,
        l.modalidade,
        textoInteresse(l.titulo, doacao),
      );
      navigation.navigate('Chat', { id });
    },
    [navigation],
  );

  const listaFiltrada = useMemo(() => {
    const q = busca.trim().toLowerCase();
    return mockListings.filter((l) => {
      if (modalidade !== 'todas' && l.modalidade !== modalidade) return false;
      if (distancia !== 'todas' && distanciaEmKm(l.distancia) > Number(distancia)) {
        return false;
      }
      if (
        q &&
        !l.titulo.toLowerCase().includes(q) &&
        !l.autor.toLowerCase().includes(q) &&
        !l.fruta.toLowerCase().includes(q)
      ) {
        return false;
      }
      return true;
    });
  }, [busca, modalidade, distancia]);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScreenHeader
        avatarInitial={perfil.inicial}
        avatarUri={perfil.fotoUri}
        onPressAvatar={() => navigation.navigate('Usuario')}
      />

      <FlatList
        data={mode === 'lista' ? listaFiltrada : []}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24, gap: 16 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={mode === 'lista'}
        renderItem={({ item }) => (
          <ExploreCard
            listing={item}
            favorito={favoritos.has(item.id)}
            onAction={() => abrirChat(item)}
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
