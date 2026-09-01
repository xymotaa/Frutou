import { useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ApiError, listingsApi } from '@/api';
import { AnuncioForm, type AnuncioValores } from '@/components/AnuncioForm';
import { ChevronLeftIcon } from '@/components/icons';
import { resolveMediaUrls } from '@/lib/media';
import { fotosParaUpload, valoresParaInput } from '@/state/anuncio';
import { useListing } from '@/state/feed';
import type { RootStackScreenProps } from '@/navigation/types';
import { color } from '@/theme/tokens';

export function EditarAnuncioScreen({
  route,
  navigation,
}: RootStackScreenProps<'EditarAnuncio'>) {
  const { id } = route.params;
  const { data: anuncio, loading, erro } = useListing(id);
  const [enviando, setEnviando] = useState(false);
  const [erroEnvio, setErroEnvio] = useState<string | null>(null);

  async function salvar(v: AnuncioValores) {
    setEnviando(true);
    setErroEnvio(null);
    try {
      // O backend substitui TODAS as fotos quando `fotos` é enviado. Só mandamos
      // quando o usuário adicionou alguma nova — nesse caso as antigas são
      // trocadas pelas novas. Sem foto nova, os campos de texto seguem sozinhos.
      const novas = fotosParaUpload(v.fotos);
      await listingsApi.update(
        id,
        valoresParaInput(v),
        novas.length ? novas : undefined,
      );
      navigation.goBack();
    } catch (e) {
      setErroEnvio(
        e instanceof ApiError
          ? e.message
          : 'Não foi possível salvar. Verifique sua conexão.',
      );
      setEnviando(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
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
          Editar anúncio
        </Text>
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={color.primary} />
        </View>
      ) : erro || !anuncio ? (
        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-center text-[15px] text-muted">
            {erro ?? 'Anúncio não encontrado.'}
          </Text>
        </View>
      ) : (
        <AnuncioForm
          header={null}
          inicial={{
            modo: anuncio.modalidade === 'doacao' ? 'doar' : 'vender',
            fruta: anuncio.titulo,
            preco: anuncio.precoTexto ?? '',
            quantidade: anuncio.disponibilidade,
            detalhes: anuncio.descricao,
            bairro: anuncio.bairro ?? '',
            horarios: anuncio.janelaRetirada ?? '',
            lat: anuncio.lat,
            lng: anuncio.lng,
            fotos: resolveMediaUrls(anuncio.fotos),
          }}
          submitLabel={{
            doar: 'Salvar alterações',
            vender: 'Salvar alterações',
          }}
          onSubmit={salvar}
          enviando={enviando}
          erro={erroEnvio}
        />
      )}
    </SafeAreaView>
  );
}
