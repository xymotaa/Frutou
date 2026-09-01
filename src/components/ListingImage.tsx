import { useState } from 'react';
import { Image, View } from 'react-native';

import { ImageIcon } from '@/components/icons';
import { resolveMediaUrl } from '@/lib/media';
import { color } from '@/theme/tokens';

type Props = {
  /** URLs de foto do anúncio; usamos a `[0]` como capa. */
  fotos: string[] | null | undefined;
  /** Classe de aspecto/tamanho do container (ex.: "aspect-[3/2] w-full"). */
  className?: string;
  /** Tamanho do ícone no fallback sem foto. */
  fallbackIconSize?: number;
};

/**
 * Capa de um anúncio. Enquanto a imagem carrega, mostra um skeleton cinza.
 * Sem foto (dados legados) ou em caso de erro de carregamento, mostra um
 * placeholder neutro com ícone.
 */
export function ListingImage({
  fotos,
  className = 'aspect-[3/2] w-full',
  fallbackIconSize = 28,
}: Props) {
  const uri = resolveMediaUrl(fotos?.[0]);
  const [carregando, setCarregando] = useState(true);
  const [falhou, setFalhou] = useState(false);

  const mostrarPlaceholder = !uri || falhou;

  return (
    <View className={`${className} overflow-hidden bg-input`}>
      {!mostrarPlaceholder ? (
        <Image
          source={{ uri: uri! }}
          resizeMode="cover"
          onLoadStart={() => setCarregando(true)}
          onLoadEnd={() => setCarregando(false)}
          onError={() => {
            setFalhou(true);
            setCarregando(false);
          }}
          className="h-full w-full"
        />
      ) : null}

      {(mostrarPlaceholder || carregando) && (
        <View className="absolute inset-0 items-center justify-center bg-input">
          {mostrarPlaceholder && (
            <ImageIcon size={fallbackIconSize} color={color.line} />
          )}
        </View>
      )}
    </View>
  );
}
