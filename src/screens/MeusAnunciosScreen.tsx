import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ApiError, listingsApi, type ListingListItem } from '@/api';
import {
  BanIcon,
  ChevronLeftIcon,
  HandHeartIcon,
  MapPinIcon,
  PencilIcon,
  TagIcon,
} from '@/components/icons';
import { ListingImage } from '@/components/ListingImage';
import type { RootStackScreenProps } from '@/navigation/types';
import { color } from '@/theme/tokens';

type StatusAnuncio = 'ativo' | 'encerrado';

export function MeusAnunciosScreen({
  navigation,
}: RootStackScreenProps<'MeusAnuncios'>) {
  const [aba, setAba] = useState<StatusAnuncio>('ativo');
  const [lista, setLista] = useState<ListingListItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [agindo, setAgindo] = useState<string | null>(null);

  const carregar = useCallback(() => {
    setLoading(true);
    setErro(null);
    listingsApi
      .mine(aba)
      .then(setLista)
      .catch((e) =>
        setErro(
          e instanceof ApiError
            ? e.message
            : 'Não foi possível carregar seus anúncios.',
        ),
      )
      .finally(() => setLoading(false));
  }, [aba]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  // recarrega ao voltar de Criar/Editar
  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [carregar]),
  );

  async function alternarStatus(item: ListingListItem) {
    setAgindo(item.id);
    try {
      if (item.status === 'encerrado') await listingsApi.reabrir(item.id);
      else await listingsApi.encerrar(item.id);
      carregar();
    } catch {
      // silencioso; o item continua como está
    } finally {
      setAgindo(null);
    }
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
        <Text
          className="text-[17px] font-bold text-ink"
          accessibilityRole="header"
        >
          Meus anúncios
        </Text>
      </View>

      <FlatList
        data={lista ?? []}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20, paddingBottom: 24, gap: 16 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="flex-row gap-2 rounded-full bg-input p-1">
            {(['ativo', 'encerrado'] as const).map((s) => (
              <Pressable
                key={s}
                onPress={() => setAba(s)}
                accessibilityRole="button"
                accessibilityState={{ selected: aba === s }}
                className={`flex-1 items-center rounded-full py-2.5 ${
                  aba === s ? 'bg-primary' : ''
                }`}
              >
                <Text
                  className={`text-[13px] font-semibold ${
                    aba === s ? 'text-white' : 'text-muted'
                  }`}
                >
                  {s === 'ativo' ? 'Ativos' : 'Encerrados'}
                </Text>
              </Pressable>
            ))}
          </View>
        }
        renderItem={({ item }) => {
          const isDoacao = item.modalidade === 'doacao';
          const encerrado = item.status === 'encerrado';

          return (
            <View className="overflow-hidden rounded-2xl border border-line bg-surface">
              <View className="relative aspect-[16/9] w-full">
                <ListingImage fotos={item.fotos} className="h-full w-full" />
                {encerrado ? (
                  <View className="absolute inset-0 items-center justify-center bg-ink-scrim">
                    <Text className="text-[13px] font-bold uppercase tracking-wide text-white">
                      Encerrado
                    </Text>
                  </View>
                ) : null}
                <View
                  className={`absolute left-3 top-3 flex-row items-center gap-1.5 rounded-full px-3 py-1.5 ${
                    isDoacao ? 'bg-primary' : 'bg-accent'
                  }`}
                >
                  {isDoacao ? (
                    <HandHeartIcon size={13} color="#FFFFFF" />
                  ) : (
                    <TagIcon size={13} />
                  )}
                  <Text className="text-[12px] font-bold text-white">
                    {isDoacao ? 'Doação' : (item.precoTexto ?? 'À venda')}
                  </Text>
                </View>
              </View>

              <View className="gap-2 p-4">
                <Text className="text-[16px] font-bold text-ink">
                  {item.titulo}
                </Text>
                {item.detalhe ? (
                  <Text
                    className="text-[13px] leading-5 text-muted"
                    numberOfLines={2}
                  >
                    {item.detalhe}
                  </Text>
                ) : null}
                <View className="flex-row items-center gap-1">
                  <MapPinIcon size={13} color={color.muted} />
                  <Text className="text-[12px] text-muted">
                    Publicado {item.publicadoHa}
                  </Text>
                </View>

                <View className="mt-1 flex-row gap-2">
                  <Pressable
                    onPress={() =>
                      navigation.navigate('EditarAnuncio', { id: item.id })
                    }
                    accessibilityRole="button"
                    accessibilityLabel={`Editar ${item.titulo}`}
                    className="flex-1 flex-row items-center justify-center gap-1.5 rounded-full border border-primary py-2.5 active:opacity-80"
                  >
                    <PencilIcon size={15} color={color.primary} />
                    <Text className="text-[13px] font-semibold text-primary">
                      Editar
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => alternarStatus(item)}
                    disabled={agindo === item.id}
                    accessibilityRole="button"
                    accessibilityLabel={
                      encerrado
                        ? `Reativar ${item.titulo}`
                        : `Encerrar ${item.titulo}`
                    }
                    className={`flex-1 flex-row items-center justify-center gap-1.5 rounded-full bg-input py-2.5 active:opacity-80 ${
                      agindo === item.id ? 'opacity-50' : ''
                    }`}
                  >
                    {agindo === item.id ? (
                      <ActivityIndicator size="small" color={color.muted} />
                    ) : (
                      <>
                        <BanIcon size={15} color={color.muted} />
                        <Text className="text-[13px] font-semibold text-muted">
                          {encerrado ? 'Reativar' : 'Encerrar'}
                        </Text>
                      </>
                    )}
                  </Pressable>
                </View>
              </View>
            </View>
          );
        }}
        ListEmptyComponent={
          loading ? (
            <View className="items-center pt-16">
              <ActivityIndicator size="large" color={color.primary} />
            </View>
          ) : erro ? (
            <View className="items-center gap-3 px-8 pt-12">
              <Text className="text-center text-[14px] text-muted">{erro}</Text>
              <Pressable
                onPress={carregar}
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
                {aba === 'ativo'
                  ? 'Você não tem anúncios ativos. Que tal publicar um?'
                  : 'Nenhum anúncio encerrado por aqui.'}
              </Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
}
