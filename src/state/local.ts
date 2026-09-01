import { useSyncExternalStore } from 'react';
import * as Location from 'expo-location';

/**
 * Localização do usuário para o feed (ordenar/filtrar por distância).
 * Sem permissão → coords ficam `null` e o app simplesmente não manda `lat/lng`
 * (o backend ordena por data nesse caso).
 */

export type Coords = { lat: number; lng: number };

type LocalState = {
  status: 'idle' | 'pedindo' | 'ok' | 'negado';
  coords: Coords | null;
};

let state: LocalState = { status: 'idle', coords: null };
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function set(next: Partial<LocalState>) {
  state = { ...state, ...next };
  emit();
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function useLocal(): LocalState {
  return useSyncExternalStore(
    subscribe,
    () => state,
    () => state,
  );
}

export function getCoords(): Coords | null {
  return state.coords;
}

let inflight: Promise<void> | null = null;

/**
 * Garante que já tentamos obter a localização uma vez. Idempotente: chamadas
 * simultâneas compartilham a mesma promessa; depois de resolver (ok/negado)
 * não repete sozinha.
 */
export function ensureLocation(): Promise<void> {
  if (state.status === 'ok' || state.status === 'negado') return Promise.resolve();
  if (inflight) return inflight;

  inflight = (async () => {
    set({ status: 'pedindo' });
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        set({ status: 'negado', coords: null });
        return;
      }
      const pos = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      set({
        status: 'ok',
        coords: { lat: pos.coords.latitude, lng: pos.coords.longitude },
      });
    } catch {
      // GPS off, timeout, etc. — segue sem coords.
      set({ status: 'negado', coords: null });
    } finally {
      inflight = null;
    }
  })();

  return inflight;
}
