import { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

/**
 * Preferências locais (toggles de Configurações). Sem endpoint nesta versão —
 * ficam só no device. SecureStore no nativo, localStorage no web.
 */

export type Prefs = {
  notifMensagens: boolean;
  notifAnuncios: boolean;
  notifAvaliacoes: boolean;
  localizacao: boolean;
  perfilPublico: boolean;
};

const DEFAULTS: Prefs = {
  notifMensagens: true,
  notifAnuncios: true,
  notifAvaliacoes: false,
  localizacao: true,
  perfilPublico: true,
};

const KEY = 'frutou.prefs';
const isWeb = Platform.OS === 'web';

async function ler(): Promise<Prefs> {
  try {
    const raw = isWeb
      ? (globalThis.localStorage?.getItem(KEY) ?? null)
      : await SecureStore.getItemAsync(KEY);
    if (!raw) return DEFAULTS;
    return { ...DEFAULTS, ...(JSON.parse(raw) as Partial<Prefs>) };
  } catch {
    return DEFAULTS;
  }
}

async function gravar(p: Prefs): Promise<void> {
  try {
    const raw = JSON.stringify(p);
    if (isWeb) globalThis.localStorage?.setItem(KEY, raw);
    else await SecureStore.setItemAsync(KEY, raw);
  } catch {
    /* segue só em memória */
  }
}

/**
 * Hook de preferências. Carrega do storage uma vez; cada `set` persiste.
 */
export function usePrefs(): {
  prefs: Prefs;
  pronto: boolean;
  set: <K extends keyof Prefs>(k: K, v: Prefs[K]) => void;
} {
  const [prefs, setPrefs] = useState<Prefs>(DEFAULTS);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    ler().then((p) => {
      setPrefs(p);
      setPronto(true);
    });
  }, []);

  const set = useCallback(
    <K extends keyof Prefs>(k: K, v: Prefs[K]) => {
      setPrefs((prev) => {
        const next = { ...prev, [k]: v };
        void gravar(next);
        return next;
      });
    },
    [],
  );

  return { prefs, pronto, set };
}
