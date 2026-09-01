import { Platform, Text, View } from 'react-native';
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  UrlTile,
} from 'react-native-maps';

type Props = {
  lat: number;
  lng: number;
  titulo?: string;
  /** Altura do mapa em px. */
  altura?: number;
};

/**
 * Mapa pequeno e não interativo com um único marcador — usado no detalhe do
 * anúncio e (via props) no formulário. iOS: Apple Maps. Android: tiles OSM.
 */
export function MiniMapa({ lat, lng, titulo, altura = 140 }: Props) {
  const isAndroid = Platform.OS === 'android';

  return (
    <View style={{ height: altura }}>
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_DEFAULT}
        mapType={isAndroid ? 'none' : 'standard'}
        pointerEvents="none"
        initialRegion={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {isAndroid && (
          <UrlTile
            urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            maximumZ={19}
            tileSize={256}
            shouldReplaceMapContent
          />
        )}
        <Marker coordinate={{ latitude: lat, longitude: lng }} title={titulo} />
      </MapView>

      {isAndroid && (
        <View className="absolute bottom-0.5 right-0.5 rounded bg-surface/80 px-1 py-0.5">
          <Text className="text-[8px] text-muted">© OpenStreetMap</Text>
        </View>
      )}
    </View>
  );
}
