import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnuncioForm } from '@/components/AnuncioForm';
import { ChevronLeftIcon } from '@/components/icons';
import { getMeuAnuncio } from '@/data/mockMeusAnuncios';
import type { RootStackScreenProps } from '@/navigation/types';
import { color } from '@/theme/tokens';

export function EditarAnuncioScreen({
  route,
  navigation,
}: RootStackScreenProps<'EditarAnuncio'>) {
  const anuncio = getMeuAnuncio(route.params.id);

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

      {anuncio ? (
        <AnuncioForm
          header={null}
          inicial={{
            modo: anuncio.modalidade === 'doacao' ? 'doar' : 'vender',
            fruta: anuncio.titulo,
            preco: anuncio.preco ?? '',
            detalhes: anuncio.descricao,
            bairro: anuncio.bairro,
          }}
          submitLabel={{
            doar: 'Salvar alterações',
            vender: 'Salvar alterações',
          }}
          onSubmit={() => {
            // TODO: enviar para listingsService.update quando o backend existir.
            navigation.goBack();
          }}
        />
      ) : (
        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-[15px] text-muted">Anúncio não encontrado.</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
