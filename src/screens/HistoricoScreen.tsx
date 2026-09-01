import { useMemo, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  ChevronLeftIcon,
  HandHeartIcon,
  HistoryIcon,
  TagIcon,
} from '@/components/icons';
import { ListingImage } from '@/components/ListingImage';
import { StarRating } from '@/components/StarRating';
import { mockHistorico } from '@/data/mockHistorico';
import type { RootStackScreenProps } from '@/navigation/types';
import { color } from '@/theme/tokens';

type Aba = 'todos' | 'recebi' | 'ofereci';

export function HistoricoScreen({
  navigation,
}: RootStackScreenProps<'Historico'>) {
  const [aba, setAba] = useState<Aba>('todos');

  const lista = useMemo(
    () =>
      aba === 'todos'
        ? mockHistorico
        : mockHistorico.filter((h) => h.papel === aba),
    [aba],
  );

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
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
          Histórico
        </Text>
      </View>

      <FlatList
        data={lista}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20, paddingBottom: 24, gap: 12 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="mb-1 flex-row gap-2 rounded-full bg-input p-1">
            {(
              [
                ['todos', 'Todos'],
                ['recebi', 'Recebi'],
                ['ofereci', 'Ofereci'],
              ] as const
            ).map(([value, label]) => (
              <Pressable
                key={value}
                onPress={() => setAba(value)}
                accessibilityRole="button"
                accessibilityState={{ selected: aba === value }}
                className={`flex-1 items-center rounded-full py-2 ${
                  aba === value ? 'bg-primary' : ''
                }`}
              >
                <Text
                  className={`text-[13px] font-semibold ${
                    aba === value ? 'text-white' : 'text-muted'
                  }`}
                >
                  {label}
                </Text>
              </Pressable>
            ))}
          </View>
        }
        renderItem={({ item }) => {
          const isDoacao = item.modalidade === 'doacao';
          const recebi = item.papel === 'recebi';

          return (
            <View className="flex-row gap-3 rounded-2xl border border-line bg-surface p-3">
              <ListingImage
                fotos={null}
                className="h-16 w-16 rounded-xl"
                fallbackIconSize={20}
              />

              <View className="flex-1 gap-1">
                <View className="flex-row items-center justify-between">
                  <Text className="text-[14px] font-semibold text-ink">
                    {item.titulo}
                  </Text>
                  <Text className="text-[12px] text-muted">{item.data}</Text>
                </View>

                <View className="flex-row items-center gap-1.5">
                  <View
                    className={`flex-row items-center gap-1 rounded-full px-2 py-0.5 ${
                      isDoacao ? 'bg-primary' : 'bg-accent'
                    }`}
                  >
                    {isDoacao ? (
                      <HandHeartIcon size={10} color="#FFFFFF" />
                    ) : (
                      <TagIcon size={10} color="#FFFFFF" />
                    )}
                    <Text className="text-[10px] font-bold text-white">
                      {isDoacao ? 'Doação' : item.preco}
                    </Text>
                  </View>
                  <Text className="text-[12px] text-muted">
                    {recebi ? 'de' : 'para'} {item.parceiro}
                  </Text>
                </View>

                {item.minhaNota > 0 ? (
                  <View className="flex-row items-center gap-1.5">
                    <StarRating value={item.minhaNota} size={12} />
                    <Text className="text-[11px] text-muted">
                      sua avaliação
                    </Text>
                  </View>
                ) : (
                  <Pressable
                    onPress={() =>
                      navigation.navigate('Avaliacao', {
                        nomeParceiro: item.parceiro,
                      })
                    }
                    accessibilityRole="button"
                    accessibilityLabel={`Avaliar troca com ${item.parceiro}`}
                  >
                    <Text className="text-[12px] font-semibold text-accent-dark">
                      Avaliar esta troca
                    </Text>
                  </Pressable>
                )}
              </View>
            </View>
          );
        }}
        ListEmptyComponent={
          <View className="items-center gap-2 px-8 pt-12">
            <HistoryIcon size={32} color={color.line} />
            <Text className="text-center text-[14px] text-muted">
              Nada por aqui ainda. Suas trocas concluídas vão aparecer nesta
              lista.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
