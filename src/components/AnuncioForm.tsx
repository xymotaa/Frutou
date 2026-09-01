import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  UrlTile,
  type Region,
} from 'react-native-maps';

import { geoApi } from '@/api';
import { BottomCTA } from '@/components/BottomCTA';
import { FormField } from '@/components/FormField';
import {
  CameraPlusIcon,
  ChevronDownIcon,
  ClockIcon,
  GiftIcon,
  MapPinIcon,
  TagIcon,
} from '@/components/icons';
import { resolveMediaUrl } from '@/lib/media';
import { pickListingPhotos } from '@/services/pickImage';
import { ensureLocation, getCoords } from '@/state/local';
import { color } from '@/theme/tokens';

export type Modo = 'doar' | 'vender';

const MAX_FOTOS = 5;

export type AnuncioValores = {
  modo: Modo;
  fruta: string;
  preco: string;
  quantidade: string;
  detalhes: string;
  bairro: string;
  horarios: string;
  lat: number | null;
  lng: number | null;
  /** URIs locais (novas) ou URLs do backend (edição). */
  fotos: string[];
};

const VAZIO: AnuncioValores = {
  modo: 'doar',
  fruta: '',
  preco: '',
  quantidade: '',
  detalhes: '',
  bairro: '',
  horarios: '',
  lat: null,
  lng: null,
  fotos: [],
};

/** Rótulo de bloco — mesmo tratamento dos rótulos de campo do app. */
function FieldLabel({ children }: { children: string }) {
  return (
    <Text
      className="text-[13px] font-semibold text-ink"
      accessibilityRole="header"
    >
      {children}
    </Text>
  );
}

type LocalPickerProps = {
  bairro: string;
  lat: number | null;
  lng: number | null;
  onChange: (patch: {
    bairro?: string;
    lat?: number | null;
    lng?: number | null;
  }) => void;
};

/**
 * Campo de local: texto "Bairro / região" + mapa com pin arrastável.
 * Digitar o texto geocodifica (GET /geo) e centraliza o pin. "Usar minha
 * localização" pega o GPS. Arrastar o pin ajusta lat/lng à mão.
 */
function LocalPicker({ bairro, lat, lng, onChange }: LocalPickerProps) {
  const isAndroid = Platform.OS === 'android';
  const [buscando, setBuscando] = useState(false);
  const [pegandoGps, setPegandoGps] = useState(false);
  const mapRef = useRef<MapView>(null);
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  const temPin = typeof lat === 'number' && typeof lng === 'number';

  const regiao: Region = {
    latitude: lat ?? -23.55,
    longitude: lng ?? -46.63,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };

  function animarPara(la: number, ln: number) {
    mapRef.current?.animateToRegion(
      { latitude: la, longitude: ln, latitudeDelta: 0.01, longitudeDelta: 0.01 },
      300,
    );
  }

  function aoDigitar(texto: string) {
    onChange({ bairro: texto });
    if (debounce.current) clearTimeout(debounce.current);
    if (texto.trim().length < 3) return;
    debounce.current = setTimeout(async () => {
      setBuscando(true);
      try {
        const r = await geoApi.search(texto.trim());
        if (r[0]) {
          onChange({
            lat: r[0].lat,
            lng: r[0].lng,
            bairro: r[0].bairro ?? texto,
          });
          animarPara(r[0].lat, r[0].lng);
        }
      } catch {
        /* mantém o texto; sem coords */
      } finally {
        setBuscando(false);
      }
    }, 700);
  }

  async function usarMinhaLocalizacao() {
    setPegandoGps(true);
    try {
      await ensureLocation();
      const c = getCoords();
      if (c) {
        onChange({ lat: c.lat, lng: c.lng });
        animarPara(c.lat, c.lng);
      }
    } finally {
      setPegandoGps(false);
    }
  }

  return (
    <View className="gap-2">
      <FormField
        label="Bairro / região"
        value={bairro}
        onChangeText={aoDigitar}
        placeholder="Ex: Vila Madalena, Centro..."
        trailing={
          buscando ? (
            <ActivityIndicator size="small" color={color.muted} />
          ) : (
            <MapPinIcon size={18} color={color.muted} />
          )
        }
      />

      <View className="overflow-hidden rounded-field border border-line">
        <View style={{ height: 160 }}>
          <MapView
            ref={mapRef}
            style={{ flex: 1 }}
            provider={PROVIDER_DEFAULT}
            mapType={isAndroid ? 'none' : 'standard'}
            initialRegion={regiao}
            onPress={(e) => {
              const { latitude, longitude } = e.nativeEvent.coordinate;
              onChange({ lat: latitude, lng: longitude });
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
            {temPin && (
              <Marker
                draggable
                coordinate={{ latitude: lat!, longitude: lng! }}
                onDragEnd={(e) => {
                  const { latitude, longitude } = e.nativeEvent.coordinate;
                  onChange({ lat: latitude, lng: longitude });
                }}
              />
            )}
          </MapView>
          {isAndroid && (
            <View className="absolute bottom-0.5 right-0.5 rounded bg-surface/80 px-1 py-0.5">
              <Text className="text-[8px] text-muted">© OpenStreetMap</Text>
            </View>
          )}
        </View>

        <Pressable
          onPress={usarMinhaLocalizacao}
          disabled={pegandoGps}
          accessibilityRole="button"
          accessibilityLabel="Usar minha localização"
          className="flex-row items-center justify-center gap-2 border-t border-line bg-surface py-3 active:opacity-80"
        >
          {pegandoGps ? (
            <ActivityIndicator size="small" color={color.primary} />
          ) : (
            <MapPinIcon size={16} color={color.primary} />
          )}
          <Text className="text-[13px] font-semibold text-primary">
            Usar minha localização
          </Text>
        </Pressable>
      </View>

      <Text className="text-[12px] text-muted">
        {temPin
          ? 'Toque no mapa ou arraste o pino para ajustar. Só o bairro aparece no anúncio.'
          : 'Digite o bairro ou use sua localização para marcar no mapa.'}
      </Text>
    </View>
  );
}

type Props = {
  /** Cabeçalho do formulário (varia entre criar e editar). */
  header: React.ReactNode;
  inicial?: Partial<AnuncioValores>;
  submitLabel: { doar: string; vender: string };
  onSubmit: (v: AnuncioValores) => void | Promise<void>;
  /** Mostrado no CTA quando o envio falha. */
  erro?: string | null;
  enviando?: boolean;
};

export function AnuncioForm({
  header,
  inicial,
  submitLabel,
  onSubmit,
  erro,
  enviando,
}: Props) {
  const [v, setV] = useState<AnuncioValores>({ ...VAZIO, ...inicial });
  const [tocouSubmit, setTocouSubmit] = useState(false);
  const set = <K extends keyof AnuncioValores>(k: K, val: AnuncioValores[K]) =>
    setV((prev) => ({ ...prev, [k]: val }));

  const doar = v.modo === 'doar';
  const semFoto = v.fotos.length === 0;

  async function adicionarFotos() {
    const restantes = MAX_FOTOS - v.fotos.length;
    if (restantes <= 0) return;
    const novas = await pickListingPhotos(restantes);
    if (novas.length) set('fotos', [...v.fotos, ...novas].slice(0, MAX_FOTOS));
  }

  function removerFoto(uri: string) {
    set(
      'fotos',
      v.fotos.filter((f) => f !== uri),
    );
  }

  function handleSubmit() {
    setTocouSubmit(true);
    if (semFoto) return;
    void onSubmit(v);
  }

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-5 px-5 pb-1 pt-4">
          {header}

          {/* Fotos */}
          <View className="gap-2">
            <FieldLabel>Fotos da fruta</FieldLabel>
            <Text className="text-[13px] leading-5 text-muted">
              Pelo menos 1 foto. Adicione até {MAX_FOTOS} para mostrar a
              qualidade e o estado.
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 12, paddingTop: 4 }}
            >
              {v.fotos.length < MAX_FOTOS ? (
                <Pressable
                  onPress={adicionarFotos}
                  accessibilityRole="button"
                  accessibilityLabel="Adicionar foto"
                  className="h-28 w-28 items-center justify-center gap-1 rounded-field border border-line bg-input active:opacity-80"
                >
                  <CameraPlusIcon size={26} color={color.primary} />
                  <Text className="text-[12px] font-semibold text-primary">
                    Adicionar
                  </Text>
                </Pressable>
              ) : null}

              {v.fotos.map((uri) => (
                <Pressable
                  key={uri}
                  onPress={() => removerFoto(uri)}
                  accessibilityRole="button"
                  accessibilityLabel="Remover esta foto"
                  className="h-28 w-28 overflow-hidden rounded-field border border-line active:opacity-80"
                >
                  <Image
                    source={{ uri: resolveMediaUrl(uri) ?? uri }}
                    resizeMode="cover"
                    className="h-full w-full"
                  />
                  <View className="absolute right-1 top-1 h-6 w-6 items-center justify-center rounded-full bg-ink-scrim">
                    <Text className="text-[13px] font-bold text-white">×</Text>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
            {tocouSubmit && semFoto ? (
              <Text className="text-[12px] font-medium text-danger">
                Adicione pelo menos uma foto para publicar.
              </Text>
            ) : null}
          </View>

          {/* Modo doar / vender */}
          <View className="gap-2">
            <FieldLabel>O que você quer fazer?</FieldLabel>
            <View className="flex-row gap-2 rounded-full bg-input p-1">
              <Pressable
                onPress={() => set('modo', 'doar')}
                accessibilityRole="button"
                accessibilityState={{ selected: doar }}
                className={`flex-1 flex-row items-center justify-center gap-1.5 rounded-full py-2.5 ${
                  doar ? 'bg-primary' : ''
                }`}
              >
                <GiftIcon size={16} color={doar ? '#FFFFFF' : color.muted} />
                <Text
                  className={`text-[13px] font-semibold ${
                    doar ? 'text-white' : 'text-muted'
                  }`}
                >
                  Doar (grátis)
                </Text>
              </Pressable>
              <Pressable
                onPress={() => set('modo', 'vender')}
                accessibilityRole="button"
                accessibilityState={{ selected: !doar }}
                className={`flex-1 flex-row items-center justify-center gap-1.5 rounded-full py-2.5 ${
                  !doar ? 'bg-accent' : ''
                }`}
              >
                <TagIcon size={15} color={!doar ? '#FFFFFF' : color.muted} />
                <Text
                  className={`text-[13px] font-semibold ${
                    !doar ? 'text-white' : 'text-muted'
                  }`}
                >
                  Vender
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Campos */}
          <FormField
            label="Qual é a fruta?"
            value={v.fruta}
            onChangeText={(t) => set('fruta', t)}
            placeholder="Ex: Limão, Manga, Abacate..."
            trailing={<ChevronDownIcon size={18} color={color.muted} />}
          />

          {!doar ? (
            <FormField
              label="Preço"
              value={v.preco}
              onChangeText={(t) => set('preco', t)}
              placeholder="Ex: R$ 5,00 / kg"
            />
          ) : null}

          <FormField
            label="Quantidade estimada"
            value={v.quantidade}
            onChangeText={(t) => set('quantidade', t)}
            placeholder="Ex: Cerca de 2 kg, 1 sacola cheia, 12 unidades"
          />

          <FormField
            label="Detalhes e condição"
            value={v.detalhes}
            onChangeText={(t) => set('detalhes', t)}
            multiline
            placeholder="Diga um pouco sobre as frutas. Estão maduras? Passaram do ponto? Precisam ser colhidas no pé?"
          />

          <LocalPicker
            bairro={v.bairro}
            lat={v.lat}
            lng={v.lng}
            onChange={(patch) => setV((prev) => ({ ...prev, ...patch }))}
          />

          <FormField
            label="Melhores horários"
            value={v.horarios}
            onChangeText={(t) => set('horarios', t)}
            placeholder="Ex: Finais de semana, ou após as 18h"
            trailing={<ClockIcon size={18} color={color.muted} />}
          />

          {erro ? (
            <Text className="text-center text-[13px] text-danger">{erro}</Text>
          ) : null}
        </View>
      </ScrollView>

      <BottomCTA
        label={doar ? submitLabel.doar : submitLabel.vender}
        onPress={handleSubmit}
        disabled={enviando}
        icon={
          enviando ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : doar ? (
            <GiftIcon size={18} color="#FFFFFF" />
          ) : (
            <TagIcon size={16} color="#FFFFFF" />
          )
        }
        bgClassName={doar ? 'bg-primary' : 'bg-accent'}
      />
    </KeyboardAvoidingView>
  );
}
