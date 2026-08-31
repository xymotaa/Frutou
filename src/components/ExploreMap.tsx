import { Text, View } from 'react-native';

import { MapIcon, MapPinIcon } from '@/components/icons';
import type { Listing } from '@/data/mockListings';
import { color } from '@/theme/tokens';

/**
 * Placeholder do mapa. O mapa real (expo-maps / react-native-maps) exige um
 * dev build — não roda no Expo Go. Quando migrarmos, trocar o corpo deste
 * componente por um <MapView> com marcadores em listings[].lat/lng, sem mexer
 * na ExploreScreen.
 */
export function ExploreMap({ listings }: { listings: Listing[] }) {
  return (
    <View className="flex-1 items-center justify-center bg-input px-10">
      <View className="h-16 w-16 items-center justify-center rounded-full bg-surface">
        <MapIcon size={30} color={color.primary} />
      </View>
      <Text className="mt-4 text-[16px] font-semibold text-ink">
        Mapa em breve
      </Text>
      <Text className="mt-1 text-center text-[13px] leading-5 text-muted">
        O mapa interativo chega na próxima versão do app. Por enquanto, use a
        lista para ver as {listings.length} frutas perto de você.
      </Text>

      <View className="mt-5 flex-row items-center gap-1">
        <MapPinIcon size={14} color={color.accent} />
        <Text className="text-[12px] text-muted">
          {listings.length} pontos mapeados
        </Text>
      </View>
    </View>
  );
}
