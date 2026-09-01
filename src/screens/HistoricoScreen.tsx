import { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ApiError, reviewsApi, type HistoricoItem } from '@/api';
import {
  ChevronLeftIcon,
  HandHeartIcon,
  HistoryIcon,
  TagIcon,
} from '@/components/icons';
import { ListingImage } from '@/components/ListingImage';
import { StarRating } from '@/components/StarRating';
import type { RootStackScreenProps } from '@/navigation/types';
import { color } from '@/theme/tokens';

type Aba = 'todos' | 'recebi' | 'ofereci';

export function HistoricoScreen({
  navigation,
}: RootStackScreenProps<'Historico'>) {
  const [aba, setAba] = useState<Aba>('todos');
  const [itens, setItens] = useState<HistoricoItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const carregar = useCallback(() => {
    setLoading(true);
    setErro(null);
    reviewsApi
      .history()
      .then(setItens)
      .catch((e) =>
        setErro(
          e instanceof ApiError
            ? e.message
            : 'Não foi possível carregar o histórico.',
        ),
      )
      .finally(() => setLoading(false));
  }, []);

  // recarrega ao voltar da tela de Avaliação
  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [carregar]),
  );

  const lista = useMemo(() => {
    const base = itens ?? [];
    return aba === 'todos' ? base : base.filter((h) => h.papel === aba);
  }, [aba, itens]);

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
                      {isDoacao ? 'Doação' : (item.precoTexto ?? 'Venda')}
                    </Text>
                  </View>
                  <Text className="text-[12px] text-muted">
                    {recebi ? 'de' : 'para'} {item.parceiro.nome}
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
                        conversationId: item.conversationId,
                        nomeParceiro: item.parceiro.nome,
                      })
                    }
                    accessibilityRole="button"
                    accessibilityLabel={`Avaliar troca com ${item.parceiro.nome}`}
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
              <HistoryIcon size={32} color={color.line} />
              <Text className="text-center text-[14px] text-muted">
                Nada por aqui ainda. Suas trocas concluídas vão aparecer nesta
                lista.
              </Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
}
