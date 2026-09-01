import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ApiError, listingsApi } from '@/api';
import { Avatar } from '@/components/Avatar';
import { BottomCTA } from '@/components/BottomCTA';
import {
  BookmarkIcon,
  ChevronLeftIcon,
  ClockIcon,
  HandHeartIcon,
  HourglassIcon,
  MapPinIcon,
  MessageIcon,
  StarIcon,
  TagIcon,
  WalkIcon,
} from '@/components/icons';
import { ListingImage } from '@/components/ListingImage';
import { MiniMapa } from '@/components/MiniMapa';
import { resolveMediaUrl } from '@/lib/media';
import { iniciarConversa } from '@/state/chat';
import { useListing } from '@/state/feed';
import type { RootStackScreenProps } from '@/navigation/types';
import { color } from '@/theme/tokens';

type MetaRow = { icon: React.ReactNode; text: string };

export function DetalhesScreen({
  route,
  navigation,
}: RootStackScreenProps<'Detalhes'>) {
  const { data: listing, loading, erro, refetch } = useListing(route.params.id);
  const [salvo, setSalvo] = useState(false);
  const [salvoTocado, setSalvoTocado] = useState(false);
  const [abrindoChat, setAbrindoChat] = useState(false);
  const [erroChat, setErroChat] = useState<string | null>(null);

  // sincroniza o estado local com o valor da API na 1ª carga
  useEffect(() => {
    if (listing && !salvoTocado) setSalvo(listing.favorito);
  }, [listing, salvoTocado]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color={color.primary} />
      </SafeAreaView>
    );
  }

  if (erro || !listing) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background px-8">
        <Text className="text-center text-[15px] text-muted">
          {erro ?? 'Anúncio não encontrado.'}
        </Text>
        <View className="mt-4 flex-row gap-4">
          {erro ? (
            <Pressable onPress={refetch}>
              <Text className="text-[14px] font-semibold text-primary">
                Tentar de novo
              </Text>
            </Pressable>
          ) : null}
          <Pressable onPress={() => navigation.goBack()}>
            <Text className="text-[14px] font-semibold text-primary">Voltar</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const isDoacao = listing.modalidade === 'doacao';

  function toggleSalvo() {
    const proximo = !salvo;
    setSalvo(proximo);
    setSalvoTocado(true);
    const req = proximo
      ? listingsApi.favoritar(listing!.id)
      : listingsApi.desfavoritar(listing!.id);
    req.catch(() => setSalvo(!proximo));
  }

  async function abrirChat() {
    if (abrindoChat) return;
    setAbrindoChat(true);
    setErroChat(null);
    try {
      const id = await iniciarConversa(listing!.id);
      navigation.navigate('Chat', { id });
    } catch (e) {
      setErroChat(
        e instanceof ApiError
          ? e.message
          : 'Não foi possível abrir a conversa. Tente de novo.',
      );
    } finally {
      setAbrindoChat(false);
    }
  }

  const metas: MetaRow[] = [
    { icon: <HourglassIcon size={17} />, text: listing.disponibilidade },
  ];
  if (listing.distanciaTexto) {
    metas.push({
      icon: <MapPinIcon size={17} color={color.accent} />,
      text: `${listing.distanciaTexto} de você`,
    });
  }
  metas.push({
    icon: <ClockIcon size={17} />,
    text: `Publicado ${listing.publicadoHa}`,
  });

  const autorFoto = resolveMediaUrl(listing.autor.fotoUrl);
  const temCoords =
    typeof listing.lat === 'number' && typeof listing.lng === 'number';
  const localTexto = [
    listing.bairro,
    listing.tempoAPe ? `aprox. ${listing.tempoAPe}` : null,
  ]
    .filter(Boolean)
    .join(' · ');

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
          <ListingImage
            fotos={listing.fotos}
            className="h-full w-full"
            fallbackIconSize={40}
          />
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
              {isDoacao ? 'Doação' : (listing.precoTexto ?? 'À venda')}
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
              onPress={toggleSalvo}
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

          {listing.janelaRetirada ? (
            <View className="mt-3 flex-row items-center gap-2.5">
              <ClockIcon size={17} />
              <Text className="text-[14px] text-ink">
                Retirada: {listing.janelaRetirada}
              </Text>
            </View>
          ) : null}

          {/* Anunciante */}
          <View className="mt-5 flex-row items-center gap-3 rounded-2xl bg-input p-3">
            <Pressable
              onPress={() =>
                navigation.navigate('PerfilPublico', { id: listing.autor.id })
              }
              accessibilityRole="button"
              accessibilityLabel={`Ver o perfil de ${listing.autor.nome}`}
              className="flex-1 flex-row items-center gap-3 active:opacity-80"
            >
              <Avatar
                initial={listing.autor.nome.charAt(0)}
                uri={autorFoto}
                size={48}
              />
              <View className="flex-1">
                <Text className="text-[15px] font-semibold text-ink">
                  {listing.autor.nome}
                </Text>
                <View className="mt-0.5 flex-row items-center gap-1">
                  <StarIcon size={13} />
                  <Text className="text-[13px] text-muted">
                    {listing.autor.nota.toFixed(1).replace('.', ',')} (
                    {listing.autor.trocas} trocas)
                  </Text>
                </View>
              </View>
            </Pressable>
            <Pressable
              onPress={abrirChat}
              accessibilityRole="button"
              accessibilityLabel={`Enviar mensagem para ${listing.autor.nome}`}
              className="h-10 w-10 items-center justify-center rounded-full bg-surface active:opacity-80"
            >
              <MessageIcon size={18} color={color.primary} />
            </Pressable>
          </View>

          {/* Local */}
          {temCoords ? (
            <View className="mt-4 overflow-hidden rounded-2xl border border-line">
              <MiniMapa
                lat={listing.lat!}
                lng={listing.lng!}
                titulo={listing.titulo}
              />
              {localTexto ? (
                <View className="flex-row items-center gap-2 bg-surface px-4 py-3">
                  <MapPinIcon size={16} color={color.accent} />
                  <Text className="flex-1 text-[13px] text-ink">
                    {localTexto}
                  </Text>
                  {listing.tempoAPe ? <WalkIcon size={16} /> : null}
                </View>
              ) : null}
            </View>
          ) : localTexto ? (
            <View className="mt-4 flex-row items-center gap-2.5 rounded-2xl bg-input px-4 py-3">
              <MapPinIcon size={17} color={color.accent} />
              <Text className="flex-1 text-[13px] text-ink">{localTexto}</Text>
              {listing.tempoAPe ? <WalkIcon size={16} /> : null}
            </View>
          ) : null}
        </View>
      </ScrollView>

      {/* CTA fixo */}
      {erroChat ? (
        <Text className="bg-surface px-5 pt-2 text-center text-[12px] text-danger">
          {erroChat}
        </Text>
      ) : null}
      <BottomCTA
        label={
          abrindoChat
            ? 'Abrindo…'
            : isDoacao
              ? 'Tenho interesse'
              : 'Comprar'
        }
        onPress={abrirChat}
        disabled={abrindoChat}
        icon={
          abrindoChat ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <HandHeartIcon size={18} color="#FFFFFF" />
          )
        }
        bgClassName={isDoacao ? 'bg-primary' : 'bg-accent'}
        accessibilityLabel="Falar com quem anunciou"
      />
    </SafeAreaView>
  );
}
