import './global.css';

import { useCallback, useEffect, useState } from 'react';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { preloadImages } from '@/assets';
import { RootNavigator } from '@/navigation/RootNavigator';
import { restoreSession, useSession } from '@/state/session';

SplashScreen.preventAutoHideAsync().catch(() => {
  /* já escondida — sem problema */
});

export default function App() {
  const [assetsReady, setAssetsReady] = useState(false);
  const { status } = useSession();

  useEffect(() => {
    Asset.loadAsync(preloadImages)
      .catch(() => {
        /* segue mesmo se algum asset falhar — a tela ainda renderiza */
      })
      .finally(() => setAssetsReady(true));

    // valida o token guardado; define status = signedIn | signedOut
    restoreSession();
  }, []);

  const ready = assetsReady && status !== 'loading';

  const onLayout = useCallback(() => {
    if (ready) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [ready]);

  if (!ready) return null;

  return (
    <SafeAreaProvider onLayout={onLayout}>
      <StatusBar style="dark" />
      <RootNavigator />
    </SafeAreaProvider>
  );
}
