import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  ApiError,
  usersApi,
  type ListingListItem,
  type ReviewPublic,
  type UserPublic,
} from '@/api';
import { Avatar } from '@/components/Avatar';
import { ChevronLeftIcon, HandHeartIcon } from '@/components/icons';
import { ListingCard } from '@/components/ListingCard';
import { StarRating } from '@/components/StarRating';
import { resolveMediaUrl } from '@/lib/media';
import type { RootStackScreenProps } from '@/navigation/types';
import { color } from '@/theme/tokens';

function msgErro(e: unknown): string {
  if (e instanceof ApiError) return e.message;
  return 'Não foi possível carregar o perfil.';
}

function ReviewCard({ review }: { review: ReviewPublic }) {
  return (
    <View className="gap-2 rounded-2xl border border-line bg-surface p-3">
      <View className="flex-row items-center gap-2">
        <Avatar
          initial={review.autor.nome.charAt(0)}
          uri={resolveMediaUrl(review.autor.fotoUrl)}
          size={32}
        />
        <View className="flex-1">
          <Text className="text-[13px] font-semibold text-ink">
            {review.autor.nome}
          </Text>
          <Text className="text-[11px] text-muted">
            {review.listingTitulo} · {review.data}
          </Text>
        </View>
        <StarRating value={review.nota} size={13} />
      </View>
      {review.comentario ? (
        <Text className="text-[13px] leading-5 text-ink">
          {review.comentario}
        </Text>
      ) : null}
    </View>
  );
}

export function PerfilPublicoScreen({
  route,
  navigation,
}: RootStackScreenProps<'PerfilPublico'>) {
  const { id } = route.params;

  const [user, setUser] = useState<UserPublic | null>(null);
  const [anuncios, setAnuncios] = useState<ListingListItem[]>([]);
  const [reviews, setReviews] = useState<ReviewPublic[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const carregar = useCallback(() => {
    setLoading(true);
    setErro(null);
    Promise.all([
      usersApi.byId(id),
      usersApi.listings(id).catch(() => [] as ListingListItem[]),
      usersApi.reviews(id).catch(() => [] as ReviewPublic[]),
    ])
      .then(([u, ls, rs]) => {
        setUser(u);
        setAnuncios(ls);
        setReviews(rs);
      })
      .catch((e) => setErro(msgErro(e)))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    carregar();
  }, [carregar]);

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
          Perfil
        </Text>
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={color.primary} />
        </View>
      ) : erro || !user ? (
        <View className="flex-1 items-center justify-center gap-3 px-8">
          <Text className="text-center text-[15px] text-muted">
            {erro ?? 'Perfil não encontrado.'}
          </Text>
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
        <FlatList
          data={anuncios}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ gap: 12, paddingHorizontal: 20 }}
          contentContainerStyle={{ paddingBottom: 28, gap: 12 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ListingCard
              listing={item}
              onPress={() => navigation.navigate('Detalhes', { id: item.id })}
            />
          )}
          ListHeaderComponent={
            <View className="gap-5 px-5 pb-2 pt-5">
              {/* Cartão de identidade */}
              <View className="items-center gap-2">
                <Avatar
                  initial={user.nome.charAt(0)}
                  uri={resolveMediaUrl(user.fotoUrl)}
                  size={88}
                />
                <Text className="text-[20px] font-bold text-ink">
                  {user.nome}
                </Text>
                <View className="flex-row items-center gap-2">
                  <StarRating value={user.nota} size={15} />
                  <Text className="text-[13px] text-muted">
                    {user.nota > 0
                      ? `${user.nota.toFixed(1).replace('.', ',')} · ${
                          user.trocas
                        } ${user.trocas === 1 ? 'troca' : 'trocas'}`
                      : 'Sem avaliações ainda'}
                  </Text>
                </View>
              </View>

              <Text className="text-[15px] font-semibold text-ink">
                Anúncios ativos
                {anuncios.length > 0 ? ` (${anuncios.length})` : ''}
              </Text>

              {anuncios.length === 0 ? (
                <View className="items-center gap-2 rounded-2xl bg-input px-6 py-8">
                  <HandHeartIcon size={28} color={color.line} />
                  <Text className="text-center text-[13px] text-muted">
                    Esta pessoa não tem anúncios ativos no momento.
                  </Text>
                </View>
              ) : null}
            </View>
          }
          ListFooterComponent={
            <View className="gap-3 px-5 pt-6">
              <Text className="text-[15px] font-semibold text-ink">
                Avaliações
                {reviews.length > 0 ? ` (${reviews.length})` : ''}
              </Text>
              {reviews.length === 0 ? (
                <Text className="text-[13px] text-muted">
                  Ainda não há comentários sobre esta pessoa.
                </Text>
              ) : (
                <View className="gap-2.5">
                  {reviews.map((r) => (
                    <ReviewCard key={r.id} review={r} />
                  ))}
                </View>
              )}
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}
