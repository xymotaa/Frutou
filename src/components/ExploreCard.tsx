import { memo } from 'react';
import { Pressable, Text, View } from 'react-native';

import type { ListingListItem } from '@/api';
import { HandHeartIcon, HeartIcon, MapPinIcon, TagIcon } from '@/components/icons';
import { ListingImage } from '@/components/ListingImage';
import { color } from '@/theme/tokens';

type Props = {
  listing: ListingListItem;
  favorito: boolean;
  onToggleFavorito: () => void;
  onPress?: () => void;
  onAction?: () => void;
};

function ExploreCardBase({
  listing,
  favorito,
  onToggleFavorito,
  onPress,
  onAction,
}: Props) {
  const isDoacao = listing.modalidade === 'doacao';
  const badgeLabel = isDoacao ? 'Doação' : (listing.precoTexto ?? 'À venda');
  const actionLabel = isDoacao ? 'Combinar' : 'Comprar';

  const linhaLocal = [listing.distanciaTexto, listing.detalhe]
    .filter(Boolean)
    .join(' • ');

  return (
    <View className="relative overflow-hidden rounded-3xl border border-line bg-surface">
      {/* Imagem — área de toque principal do card */}
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={`${listing.titulo}, ${
          isDoacao ? 'doação' : badgeLabel
        }, por ${listing.autor.nome}`}
        className="relative aspect-[16/10] w-full active:opacity-95"
      >
        <ListingImage fotos={listing.fotos} className="h-full w-full" />

        {/* Badge: "Doação" ou o preço por kg */}
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
          <Text className="text-[12px] font-bold text-white">{badgeLabel}</Text>
        </View>
      </Pressable>

      {/* Favoritar — irmão da área de toque, não aninhado */}
      <Pressable
        onPress={onToggleFavorito}
        accessibilityRole="button"
        accessibilityLabel={
          favorito ? 'Remover dos favoritos' : 'Salvar nos favoritos'
        }
        accessibilityState={{ selected: favorito }}
        hitSlop={8}
        className="absolute right-3 top-3 h-9 w-9 items-center justify-center rounded-full bg-surface/90"
      >
        <HeartIcon
          size={18}
          color={favorito ? color.danger : color.ink}
          filled={favorito}
        />
      </Pressable>

      {/* Conteúdo */}
      <View className="gap-2 p-4">
        <Text className="text-[18px] font-bold text-ink">{listing.titulo}</Text>

        {linhaLocal ? (
          <View className="flex-row items-center gap-1">
            <MapPinIcon size={14} color={color.muted} />
            <Text className="text-[13px] text-muted">{linhaLocal}</Text>
          </View>
        ) : null}

        <View className="mt-1 h-px bg-line" />

        <View className="mt-1 flex-row items-center justify-between">
          <View className="flex-1 flex-row items-center gap-2">
            <View className="h-7 w-7 items-center justify-center rounded-full bg-input">
              <Text className="text-[12px] font-bold text-primary">
                {listing.autor.nome.charAt(0)}
              </Text>
            </View>
            <Text className="flex-1 text-[13px] text-ink" numberOfLines={1}>
              {listing.autor.nome}
            </Text>
          </View>

          <Pressable
            onPress={onAction}
            accessibilityRole="button"
            accessibilityLabel={`${actionLabel} com ${listing.autor.nome}`}
            className={`rounded-full px-5 py-2.5 active:opacity-80 ${
              isDoacao ? 'bg-primary' : 'bg-accent'
            }`}
          >
            <Text className="text-[13px] font-semibold text-white">
              {actionLabel}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export const ExploreCard = memo(ExploreCardBase);
