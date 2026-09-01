import { ActionSheetIOS, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

/**
 * Abre a galeria para escolher uma imagem (quadrada, para foto de perfil).
 * Retorna a URI local escolhida ou null se o usuário cancelar / negar acesso.
 */
export async function pickProfilePhoto(): Promise<string | null> {
  const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!perm.granted) return null;

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.7,
  });

  if (result.canceled || !result.assets?.[0]) return null;
  return result.assets[0].uri;
}

/**
 * Abre a galeria com seleção múltipla para as fotos de um anúncio.
 * Retorna as URIs locais escolhidas (no máximo `max`); `[]` se cancelar / negar.
 */
export async function pickListingPhotos(max = 5): Promise<string[]> {
  const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!perm.granted) return [];

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsMultipleSelection: true,
    selectionLimit: max,
    quality: 0.7,
  });

  if (result.canceled || !result.assets?.length) return [];
  return result.assets.slice(0, max).map((a) => a.uri);
}

type AcaoFoto =
  | { tipo: 'trocar'; uri: string }
  | { tipo: 'remover' }
  | { tipo: 'cancelar' };

/**
 * Mostra um menu (ActionSheet no iOS, Alert no Android) para trocar ou remover
 * a foto de perfil. Quando `temFoto` é falso, o menu só oferece "Escolher foto".
 */
export async function escolherAcaoFoto(temFoto: boolean): Promise<AcaoFoto> {
  return new Promise((resolve) => {
    const trocarLabel = temFoto ? 'Trocar foto' : 'Escolher foto';

    const aoTrocar = async () => {
      const uri = await pickProfilePhoto();
      resolve(uri ? { tipo: 'trocar', uri } : { tipo: 'cancelar' });
    };

    if (Platform.OS === 'ios') {
      const options = temFoto
        ? [trocarLabel, 'Remover foto', 'Cancelar']
        : [trocarLabel, 'Cancelar'];
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options,
          destructiveButtonIndex: temFoto ? 1 : undefined,
          cancelButtonIndex: options.length - 1,
        },
        (i) => {
          if (i === 0) aoTrocar();
          else if (temFoto && i === 1) resolve({ tipo: 'remover' });
          else resolve({ tipo: 'cancelar' });
        },
      );
      return;
    }

    const buttons = [
      { text: trocarLabel, onPress: aoTrocar },
      ...(temFoto
        ? [
            {
              text: 'Remover foto',
              style: 'destructive' as const,
              onPress: () => resolve({ tipo: 'remover' }),
            },
          ]
        : []),
      {
        text: 'Cancelar',
        style: 'cancel' as const,
        onPress: () => resolve({ tipo: 'cancelar' }),
      },
    ];
    Alert.alert('Foto de perfil', undefined, buttons, { cancelable: true });
  });
}
