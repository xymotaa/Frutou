import { Pressable, Text, View } from 'react-native';

import type { ListingListItem } from '@/api';
import { HandHeartIcon, MapPinIcon } from '@/components/icons';
import { ListingImage } from '@/components/ListingImage';
import { color } from '@/theme/tokens';

type Props = {
  listing: ListingListItem;
  onPress?: () => void;
};

export function ListingCard({ listing, onPress }: Props) {
  const isDoacao = listing.modalidade === 'doacao';
  const badgeLabel = isDoacao ? 'Doação' : (listing.precoTexto ?? 'À venda');
  const distancia = listing.distanciaTexto;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${listing.titulo}, ${
        isDoacao ? 'doação' : badgeLabel
      }, ${listing.autor.nome}${distancia ? `, a ${distancia}` : ''}`}
      className="flex-1 overflow-hidden rounded-2xl border border-line bg-surface active:opacity-90"
    >
      <View className="aspect-[3/2] w-full">
        <ListingImage fotos={listing.fotos} className="h-full w-full" />
        <View
          className={`absolute left-2 top-2 flex-row items-center gap-1 rounded-full px-2 py-1 ${
            isDoacao ? 'bg-primary' : 'bg-accent'
          }`}
        >
          {isDoacao ? <HandHeartIcon size={13} color="#FFFFFF" /> : null}
          <Text className="text-[11px] font-semibold text-white">{badgeLabel}</Text>
        </View>
      </View>

      <View className="gap-1 px-3 py-2.5">
        <Text className="text-[13px] font-semibold text-ink" numberOfLines={1}>
          {listing.titulo}
        </Text>
        <View className="flex-row items-center justify-between">
          <Text className="flex-1 text-[12px] text-muted" numberOfLines={1}>
            {listing.autor.nome}
          </Text>
          {distancia ? (
            <View className="flex-row items-center gap-0.5">
              <MapPinIcon size={13} color={color.muted} />
              <Text className="text-[12px] text-muted">{distancia}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}
