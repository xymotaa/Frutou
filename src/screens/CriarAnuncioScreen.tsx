import { SafeAreaView } from 'react-native-safe-area-context';

import { AnuncioForm } from '@/components/AnuncioForm';
import { ScreenHeader } from '@/components/ScreenHeader';
import { ScreenTitle } from '@/components/ScreenTitle';
import { usePerfil } from '@/state/perfil';
import type { MainTabScreenProps } from '@/navigation/types';

export function CriarAnuncioScreen({
  navigation,
}: MainTabScreenProps<'Anunciar'>) {
  const perfil = usePerfil();

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScreenHeader
        avatarInitial={perfil.inicial}
        avatarUri={perfil.fotoUri}
        onPressAvatar={() => navigation.navigate('Usuario')}
      />

      <AnuncioForm
        header={
          <ScreenTitle
            title="Anunciar fruta"
            subtitle="Compartilhe o que está sobrando com a comunidade."
          />
        }
        inicial={{ bairro: perfil.bairro }}
        submitLabel={{ doar: 'Publicar doação', vender: 'Publicar venda' }}
        onSubmit={() => {
          // TODO: enviar para listingsService.create quando o backend existir.
          navigation.navigate('Inicio');
        }}
      />
    </SafeAreaView>
  );
}
