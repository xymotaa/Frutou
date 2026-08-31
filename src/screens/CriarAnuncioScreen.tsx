import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FormField } from '@/components/FormField';
import { ScreenHeader } from '@/components/ScreenHeader';
import { ScreenTitle } from '@/components/ScreenTitle';
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
import { usuarioAtual } from '@/data/mockPerfil';
import type { MainTabScreenProps } from '@/navigation/types';
import { color } from '@/theme/tokens';

type Modo = 'doar' | 'vender';

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

export function CriarAnuncioScreen({
  navigation,
}: MainTabScreenProps<'Anunciar'>) {
  const [modo, setModo] = useState<Modo>('doar');
  const [fruta, setFruta] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [detalhes, setDetalhes] = useState('');
  const [horarios, setHorarios] = useState('');

  function handlePublicar() {
    // TODO: enviar para listingsService.create quando o backend existir.
    navigation.navigate('Inicio');
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScreenHeader
        avatarInitial={usuarioAtual.inicial}
        onPressAvatar={() => navigation.navigate('Usuario')}
      />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 24 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Mesmo container de cabeçalho das outras abas: px-5 / pt-4 / gap-4 */}
          <View className="gap-5 px-5 pb-1 pt-4">
            <ScreenTitle
              title="Anunciar fruta"
              subtitle="Compartilhe o que está sobrando com a comunidade."
            />

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
                  onPress={() => setModo('doar')}
                  accessibilityRole="button"
                  accessibilityState={{ selected: modo === 'doar' }}
                  className={`flex-1 flex-row items-center justify-center gap-1.5 rounded-full py-2.5 ${
                    modo === 'doar' ? 'bg-primary' : ''
                  }`}
                >
                  <GiftIcon
                    size={16}
                    color={modo === 'doar' ? '#FFFFFF' : color.muted}
                  />
                  <Text
                    className={`text-[13px] font-semibold ${
                      modo === 'doar' ? 'text-white' : 'text-muted'
                    }`}
                  >
                    Doar (grátis)
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setModo('vender')}
                  accessibilityRole="button"
                  accessibilityState={{ selected: modo === 'vender' }}
                  className={`flex-1 flex-row items-center justify-center gap-1.5 rounded-full py-2.5 ${
                    modo === 'vender' ? 'bg-accent' : ''
                  }`}
                >
                  <TagIcon
                    size={15}
                    color={modo === 'vender' ? '#FFFFFF' : color.muted}
                  />
                  <Text
                    className={`text-[13px] font-semibold ${
                      modo === 'vender' ? 'text-white' : 'text-muted'
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
              value={fruta}
              onChangeText={setFruta}
              placeholder="Ex: Limão, Manga, Abacate..."
              trailing={<ChevronDownIcon size={18} color={color.muted} />}
            />

            {modo === 'vender' ? (
              <FormField
                label="Preço"
                value={preco}
                onChangeText={setPreco}
                placeholder="Ex: R$ 5,00 / kg"
              />
            ) : null}

            <FormField
              label="Quantidade estimada"
              value={quantidade}
              onChangeText={setQuantidade}
              placeholder="Ex: Cerca de 2 kg, 1 sacola cheia, 12 unidades"
            />

            <FormField
              label="Detalhes e condição"
              value={detalhes}
              onChangeText={setDetalhes}
              multiline
              placeholder="Diga um pouco sobre as frutas. Estão maduras? Passaram do ponto? Precisam ser colhidas no pé?"
            />

            {/* Retirada */}
            <View className="gap-1.5">
              <FieldLabel>Local aproximado</FieldLabel>
              <View className="overflow-hidden rounded-field border border-line">
                <View className="h-28 w-full items-center justify-center bg-input">
                  <MapPinIcon size={24} color={color.line} />
                  <Text className="mt-1 text-[12px] text-muted">
                    Mapa em breve
                  </Text>
                </View>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Definir local no mapa"
                  className="flex-row items-center gap-2 border-t border-line bg-surface px-4 py-3 active:opacity-80"
                >
                  <MapPinIcon size={18} color={color.accent} />
                  <View className="flex-1">
                    <Text className="text-[14px] font-semibold text-ink">
                      Toque para definir o local
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
              value={horarios}
              onChangeText={setHorarios}
              placeholder="Ex: Finais de semana, ou após as 18h"
              trailing={<ClockIcon size={18} color={color.muted} />}
            />
          </View>
        </ScrollView>

        {/* CTA */}
        <View className="border-t border-line bg-surface px-5 pb-2 pt-3">
          <Pressable
            onPress={handlePublicar}
            accessibilityRole="button"
            accessibilityLabel={
              modo === 'doar' ? 'Publicar doação' : 'Publicar venda'
            }
            className={`h-14 flex-row items-center justify-center gap-2 rounded-field active:opacity-80 ${
              modo === 'doar' ? 'bg-primary' : 'bg-accent'
            }`}
          >
            {modo === 'doar' ? (
              <GiftIcon size={18} color="#FFFFFF" />
            ) : (
              <TagIcon size={16} color="#FFFFFF" />
            )}
            <Text className="text-[15px] font-semibold text-white">
              {modo === 'doar' ? 'Publicar doação' : 'Publicar venda'}
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
