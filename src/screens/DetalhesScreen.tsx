import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { fruitArt } from '@/components/fruits';
import {
  BookmarkIcon,
  ChevronLeftIcon,
  ClockIcon,
  HandHeartIcon,
  HourglassIcon,
  MapIcon,
  MapPinIcon,
  MessageIcon,
  StarIcon,
  TagIcon,
  WalkIcon,
} from '@/components/icons';
import { getListing } from '@/data/mockListings';
import type { RootStackScreenProps } from '@/navigation/types';
import { color } from '@/theme/tokens';

type MetaRow = { icon: React.ReactNode; text: string };

export function DetalhesScreen({
  route,
  navigation,
}: RootStackScreenProps<'Detalhes'>) {
  const listing = getListing(route.params.id);
  const [salvo, setSalvo] = useState(false);

  if (!listing) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background px-8">
        <Text className="text-[15px] text-muted">Anúncio não encontrado.</Text>
        <Pressable onPress={() => navigation.goBack()} className="mt-4">
          <Text className="text-[14px] font-semibold text-primary">Voltar</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const Art = fruitArt[listing.fruta];
  const isDoacao = listing.modalidade === 'doacao';

  const metas: MetaRow[] = [
    { icon: <HourglassIcon size={17} />, text: listing.disponibilidade },
    { icon: <MapPinIcon size={17} color={color.accent} />, text: `${listing.distancia} de você` },
    { icon: <ClockIcon size={17} />, text: `Publicado ${listing.publicadoHa}` },
  ];

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
          Detalhes da fruta
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View className="relative aspect-[4/3] w-full">
          <Art />
          <View
            className={`absolute left-4 top-4 flex-row items-center gap-1.5 rounded-full px-3 py-1.5 ${
              isDoacao ? 'bg-primary' : 'bg-accent'
            }`}
          >
            {isDoacao ? (
              <HandHeartIcon size={13} color="#FFFFFF" />
            ) : (
              <TagIcon size={13} />
            )}
            <Text className="text-[12px] font-bold text-white">
              {isDoacao ? 'Doação' : listing.preco}
            </Text>
          </View>
        </View>

        {/* Card que sobe sobre a imagem */}
        <View className="-mt-5 rounded-t-3xl bg-surface px-5 pt-5">
          <View className="flex-row items-start justify-between gap-3">
            <Text className="flex-1 text-[20px] font-bold text-ink">
              {listing.titulo}
            </Text>
            <Pressable
              onPress={() => setSalvo((v) => !v)}
              accessibilityRole="button"
              accessibilityLabel={salvo ? 'Remover dos salvos' : 'Salvar anúncio'}
              accessibilityState={{ selected: salvo }}
              hitSlop={8}
              className="h-9 w-9 items-center justify-center rounded-full bg-input"
            >
              <BookmarkIcon
                size={18}
                color={salvo ? color.primary : color.muted}
                filled={salvo}
              />
            </Pressable>
          </View>

          {/* Meta */}
          <View className="mt-3 gap-2.5">
            {metas.map((m, i) => (
              <View key={i} className="flex-row items-center gap-2.5">
                {m.icon}
                <Text className="text-[14px] text-ink">{m.text}</Text>
              </View>
            ))}
          </View>

          <View className="my-4 h-px bg-line" />

          {/* Descrição */}
          <Text className="text-[15px] font-bold text-ink">Descrição</Text>
          <Text className="mt-2 text-[14px] leading-6 text-muted">
            {listing.descricao}
          </Text>

          {/* Anunciante */}
          <View className="mt-5 flex-row items-center gap-3 rounded-2xl bg-input p-3">
            <View className="h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-surface">
              <Text className="text-[16px] font-bold text-primary">
                {listing.autor.charAt(0)}
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-[15px] font-semibold text-ink">
                {listing.autor}
              </Text>
              <View className="mt-0.5 flex-row items-center gap-1">
                <StarIcon size={13} />
                <Text className="text-[13px] text-muted">
                  {listing.autorNota.toFixed(1).replace('.', ',')} ({listing.autorTrocas}{' '}
                  trocas)
                </Text>
              </View>
            </View>
            <Pressable
              onPress={() => navigation.navigate('Main', { screen: 'Mensagens' })}
              accessibilityRole="button"
              accessibilityLabel={`Enviar mensagem para ${listing.autor}`}
              className="h-10 w-10 items-center justify-center rounded-full bg-surface active:opacity-80"
            >
              <MessageIcon size={18} color={color.primary} />
            </Pressable>
          </View>

          {/* Mini-mapa (placeholder até o mapa real) */}
          <View className="mt-4 overflow-hidden rounded-2xl border border-line">
            <View className="h-28 w-full items-center justify-center bg-input">
              <MapIcon size={26} color={color.line} />
              <Text className="mt-1 text-[12px] text-muted">
                Mapa em breve
              </Text>
            </View>
            <View className="flex-row items-center gap-2 bg-surface px-4 py-3">
              <WalkIcon size={17} />
              <Text className="text-[13px] text-ink">
                Aprox. {listing.tempoAPe}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* CTA fixo */}
      <View className="border-t border-line bg-surface px-5 pb-2 pt-3">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Demonstrar interesse neste anúncio"
          className={`h-14 flex-row items-center justify-center gap-2 rounded-field active:opacity-80 ${
            isDoacao ? 'bg-primary' : 'bg-accent'
          }`}
        >
          <HandHeartIcon size={18} color="#FFFFFF" />
          <Text className="text-[15px] font-semibold text-white">
            Tenho interesse
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
