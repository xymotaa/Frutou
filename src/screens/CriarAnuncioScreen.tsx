import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ApiError, listingsApi } from '@/api';
import { AnuncioForm, type AnuncioValores } from '@/components/AnuncioForm';
import { ScreenHeader } from '@/components/ScreenHeader';
import { ScreenTitle } from '@/components/ScreenTitle';
import { fotosParaUpload, valoresParaInput } from '@/state/anuncio';
import { usePerfil } from '@/state/perfil';
import type { MainTabScreenProps } from '@/navigation/types';

export function CriarAnuncioScreen({
  navigation,
}: MainTabScreenProps<'Anunciar'>) {
  const perfil = usePerfil();
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  // muda a cada foco da tela → força o AnuncioForm a remontar com estado limpo
  const [formKey, setFormKey] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setEnviando(false);
      setErro(null);
      setFormKey((k) => k + 1);
    }, []),
  );

  async function publicar(v: AnuncioValores) {
    setEnviando(true);
    setErro(null);
    try {
      await listingsApi.create(valoresParaInput(v), fotosParaUpload(v.fotos));
      setEnviando(false);
      navigation.navigate('Inicio');
    } catch (e) {
      setErro(
        e instanceof ApiError
          ? e.message
          : 'Não foi possível publicar. Verifique sua conexão.',
      );
      setEnviando(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScreenHeader
        avatarInitial={perfil.inicial}
        avatarUri={perfil.fotoUri}
        onPressAvatar={() => navigation.navigate('Usuario')}
      />

      <AnuncioForm
        key={formKey}
        header={
          <ScreenTitle
            title="Anunciar fruta"
            subtitle="Compartilhe o que está sobrando com a comunidade."
          />
        }
        inicial={{ bairro: perfil.bairro }}
        submitLabel={{ doar: 'Publicar doação', vender: 'Publicar venda' }}
        onSubmit={publicar}
        enviando={enviando}
        erro={erro}
      />
    </SafeAreaView>
  );
}
