import { useState } from 'react';
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

          <FormField
            label="Bairro / região"
            value={v.bairro}
            onChangeText={(t) => set('bairro', t)}
            placeholder="Ex: Vila Madalena, Centro..."
            trailing={<MapPinIcon size={18} color={color.muted} />}
          />
          <Text className="-mt-3 text-[12px] text-muted">
            Só o bairro aparece no anúncio.
          </Text>

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
