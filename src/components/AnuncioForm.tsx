import { useState } from 'react';
import {
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
  ChevronRightIcon,
  ClockIcon,
  GiftIcon,
  ImageIcon,
  MapPinIcon,
  TagIcon,
} from '@/components/icons';
import { color } from '@/theme/tokens';

export type Modo = 'doar' | 'vender';

export type AnuncioValores = {
  modo: Modo;
  fruta: string;
  preco: string;
  quantidade: string;
  detalhes: string;
  bairro: string;
  horarios: string;
};

const VAZIO: AnuncioValores = {
  modo: 'doar',
  fruta: '',
  preco: '',
  quantidade: '',
  detalhes: '',
  bairro: '',
  horarios: '',
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
  onSubmit: (v: AnuncioValores) => void;
};

export function AnuncioForm({ header, inicial, submitLabel, onSubmit }: Props) {
  const [v, setV] = useState<AnuncioValores>({ ...VAZIO, ...inicial });
  const set = <K extends keyof AnuncioValores>(k: K, val: AnuncioValores[K]) =>
    setV((prev) => ({ ...prev, [k]: val }));

  const doar = v.modo === 'doar';

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
              Adicione até 5 fotos para mostrar a qualidade e o estado.
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 12, paddingTop: 4 }}
            >
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Adicionar foto"
                className="h-28 w-28 items-center justify-center gap-1 rounded-field border border-line bg-input active:opacity-80"
              >
                <CameraPlusIcon size={26} color={color.primary} />
                <Text className="text-[12px] font-semibold text-primary">
                  Adicionar
                </Text>
              </Pressable>
              {[0, 1, 2].map((i) => (
                <View
                  key={i}
                  className="h-28 w-28 items-center justify-center rounded-field border border-dashed border-line bg-surface"
                >
                  <ImageIcon size={24} color={color.line} />
                </View>
              ))}
            </ScrollView>
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

          {/* Retirada */}
          <View className="gap-1.5">
            <FieldLabel>Local aproximado</FieldLabel>
            <View className="overflow-hidden rounded-field border border-line">
              <View className="h-28 w-full items-center justify-center bg-input">
                <MapPinIcon size={24} color={color.line} />
                <Text className="mt-1 text-[12px] text-muted">Mapa em breve</Text>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Definir local no mapa"
                className="flex-row items-center gap-2 border-t border-line bg-surface px-4 py-3 active:opacity-80"
              >
                <MapPinIcon size={18} color={color.accent} />
                <View className="flex-1">
                  <Text className="text-[14px] font-semibold text-ink">
                    {v.bairro || 'Toque para definir o local'}
                  </Text>
                  <Text className="text-[12px] text-muted">
                    Só o bairro aparece no anúncio
                  </Text>
                </View>
                <ChevronRightIcon size={18} color={color.muted} />
              </Pressable>
            </View>
          </View>

          <FormField
            label="Melhores horários"
            value={v.horarios}
            onChangeText={(t) => set('horarios', t)}
            placeholder="Ex: Finais de semana, ou após as 18h"
            trailing={<ClockIcon size={18} color={color.muted} />}
          />
        </View>
      </ScrollView>

      <BottomCTA
        label={doar ? submitLabel.doar : submitLabel.vender}
        onPress={() => onSubmit(v)}
        icon={
          doar ? (
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
