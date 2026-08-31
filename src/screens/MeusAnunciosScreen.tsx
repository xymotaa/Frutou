import { useMemo, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { fruitArt } from '@/components/fruits';
import {
  BanIcon,
  ChevronLeftIcon,
  HandHeartIcon,
  MapPinIcon,
  PencilIcon,
  TagIcon,
} from '@/components/icons';
import { mockMeusAnuncios, type StatusAnuncio } from '@/data/mockMeusAnuncios';
import type { RootStackScreenProps } from '@/navigation/types';
import { color } from '@/theme/tokens';

export function MeusAnunciosScreen({
  navigation,
}: RootStackScreenProps<'MeusAnuncios'>) {
  const [aba, setAba] = useState<StatusAnuncio>('ativo');

  const lista = useMemo(
    () => mockMeusAnuncios.filter((a) => a.status === aba),
    [aba],
  );

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
        data={lista}
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
          const Art = fruitArt[item.fruta];
          const isDoacao = item.modalidade === 'doacao';
          const encerrado = item.status === 'encerrado';

          return (
            <View className="overflow-hidden rounded-2xl border border-line bg-surface">
              <View className="relative aspect-[16/9] w-full">
                <Art />
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
                    {isDoacao ? 'Doação' : item.preco}
                  </Text>
                </View>
              </View>

              <View className="gap-2 p-4">
                <Text className="text-[16px] font-bold text-ink">
                  {item.titulo}
                </Text>
                <Text className="text-[13px] leading-5 text-muted" numberOfLines={2}>
                  {item.descricao}
                </Text>
                <View className="flex-row items-center gap-1">
                  <MapPinIcon size={13} color={color.muted} />
                  <Text className="text-[12px] text-muted">
                    {item.bairro}, a {item.distancia}
                  </Text>
                </View>

                <View className="mt-1 flex-row gap-2">
                  <Pressable
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
                    accessibilityRole="button"
                    accessibilityLabel={
                      encerrado
                        ? `Reativar ${item.titulo}`
                        : `Encerrar ${item.titulo}`
                    }
                    className="flex-1 flex-row items-center justify-center gap-1.5 rounded-full bg-input py-2.5 active:opacity-80"
                  >
                    <BanIcon size={15} color={color.muted} />
                    <Text className="text-[13px] font-semibold text-muted">
                      {encerrado ? 'Reativar' : 'Encerrar'}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          );
        }}
        ListEmptyComponent={
          <View className="items-center gap-2 px-8 pt-12">
            <HandHeartIcon size={32} color={color.line} />
            <Text className="text-center text-[14px] text-muted">
              {aba === 'ativo'
                ? 'Você não tem anúncios ativos. Que tal publicar um?'
                : 'Nenhum anúncio encerrado por aqui.'}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
