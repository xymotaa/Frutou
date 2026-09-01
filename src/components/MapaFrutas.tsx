import { useMemo } from 'react';
import { Platform, Text, View } from 'react-native';
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  UrlTile,
  type Region,
} from 'react-native-maps';

import type { ListingListItem } from '@/api';

/** Anúncio com coordenadas garantidas (o filtro abaixo restringe). */
type ComGeo = ListingListItem & { lat: number; lng: number };

export function temGeo(l: ListingListItem): l is ComGeo {
  return typeof l.lat === 'number' && typeof l.lng === 'number';
}

type Props = {
  listings: ListingListItem[];
  /** Chamado ao tocar num pin/callout. */
  onSelecionar: (id: string) => void;
};

const SP_FALLBACK: Region = {
  latitude: -23.55,
  longitude: -46.63,
  latitudeDelta: 0.12,
  longitudeDelta: 0.12,
};

function regiaoDe(pontos: ComGeo[]): Region {
  if (pontos.length === 0) return SP_FALLBACK;
  const lats = pontos.map((p) => p.lat);
  const lngs = pontos.map((p) => p.lng);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const latDelta = Math.max((maxLat - minLat) * 1.4, 0.02);
  const lngDelta = Math.max((maxLng - minLng) * 1.4, 0.02);
  return {
    latitude: (minLat + maxLat) / 2,
    longitude: (minLng + maxLng) / 2,
    latitudeDelta: latDelta,
    longitudeDelta: lngDelta,
  };
}

/**
 * Mapa dos anúncios. iOS usa o Apple Maps nativo (sem chave). Android usa o
 * mapa base "none" + tiles raster do OpenStreetMap (sem chave, sem Google).
 */
export function MapaFrutas({ listings, onSelecionar }: Props) {
  const comGeo = useMemo(() => listings.filter(temGeo), [listings]);

  const isAndroid = Platform.OS === 'android';

  return (
    <View className="flex-1">
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_DEFAULT}
        mapType={isAndroid ? 'none' : 'standard'}
        initialRegion={regiaoDe(comGeo)}
        showsUserLocation
        showsMyLocationButton={false}
      >
        {isAndroid && (
          <UrlTile
            urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            maximumZ={19}
            tileSize={256}
            shouldReplaceMapContent
          />
        )}

        {comGeo.map((l) => (
          <Marker
            key={l.id}
            coordinate={{ latitude: l.lat, longitude: l.lng }}
            title={l.titulo}
            description={
              l.modalidade === 'doacao'
                ? 'Doação'
                : (l.precoTexto ?? 'À venda')
            }
            onCalloutPress={() => onSelecionar(l.id)}
            onPress={() => {
              // iOS: o callout abre sozinho; no Android um toque já seleciona
              if (isAndroid) onSelecionar(l.id);
            }}
          />
        ))}
      </MapView>

      {/* Atribuição obrigatória do OpenStreetMap (Android) */}
      {isAndroid && (
        <View className="absolute bottom-1 right-1 rounded bg-surface/80 px-1.5 py-0.5">
          <Text className="text-[9px] text-muted">© OpenStreetMap</Text>
        </View>
      )}
    </View>
  );
}
