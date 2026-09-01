import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar } from '@/components/Avatar';
import {
  ArchiveIcon,
  ChevronRightIcon,
  HandHeartIcon,
  HistoryIcon,
  LogOutIcon,
  PencilIcon,
  SettingsIcon,
  TagIcon,
} from '@/components/icons';
import { ScreenHeader } from '@/components/ScreenHeader';
import { StarRating } from '@/components/StarRating';
import { usePerfil } from '@/state/perfil';
import { signOut } from '@/state/session';
import type { MainTabScreenProps } from '@/navigation/types';
import { color } from '@/theme/tokens';

export function PerfilScreen({ navigation }: MainTabScreenProps<'Usuario'>) {
  const p = usePerfil();

  const itens = [
    {
      icon: <ArchiveIcon size={20} color={color.ink} />,
      label: 'Meus anúncios',
      onPress: () => navigation.navigate('MeusAnuncios'),
    },
    {
      icon: <HistoryIcon size={20} color={color.ink} />,
      label: 'Histórico',
      onPress: () => navigation.navigate('Historico'),
    },
    {
      icon: <SettingsIcon size={20} color={color.ink} />,
      label: 'Configurações',
      onPress: () => navigation.navigate('Configuracoes'),
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScreenHeader avatarInitial={p.inicial} avatarUri={p.fotoUri} />

      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 24, gap: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Identidade */}
        <View className="items-center pt-2">
          <Pressable
            onPress={() => navigation.navigate('EditarPerfil')}
            accessibilityRole="button"
            accessibilityLabel="Editar perfil"
            className="h-24 w-24 active:opacity-90"
          >
            <Avatar initial={p.inicial} uri={p.fotoUri} size={96} />
            <View className="absolute bottom-0 right-0 h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-accent">
              <PencilIcon size={14} color="#FFFFFF" />
            </View>
          </Pressable>

          <Text className="mt-4 text-center text-[22px] font-bold text-ink">
            {p.nome}
          </Text>
          <View className="mt-1 flex-row items-center gap-2">
            <StarRating value={p.nota} size={16} />
            <Text className="text-[13px] text-muted">
              ({p.nota.toFixed(1).replace('.', ',')})
            </Text>
          </View>
        </View>

        {/* Estatísticas */}
        <View className="flex-row gap-3">
          <View className="flex-1 items-center gap-1 rounded-2xl bg-input p-4">
            <HandHeartIcon size={24} color={color.primary} />
            <Text className="text-[22px] font-bold text-ink">
              {p.frutasDoadas}
            </Text>
            <Text className="text-[13px] text-muted">Frutas doadas</Text>
          </View>
          <View className="flex-1 items-center gap-1 rounded-2xl bg-input p-4">
            <TagIcon size={22} color={color.accent} />
            <Text className="text-[22px] font-bold text-ink">
              {p.frutasVendidas}
            </Text>
            <Text className="text-[13px] text-muted">Frutas vendidas</Text>
          </View>
        </View>

        {/* Lista de ações */}
        <View className="gap-3">
          {itens.map((it) => (
            <Pressable
              key={it.label}
              onPress={it.onPress}
              accessibilityRole="button"
              accessibilityLabel={it.label}
              className="flex-row items-center gap-3 rounded-2xl bg-input px-4 py-4 active:opacity-80"
            >
              {it.icon}
              <Text className="flex-1 text-[15px] font-semibold text-ink">
                {it.label}
              </Text>
              <ChevronRightIcon size={18} color={color.muted} />
            </Pressable>
          ))}
        </View>

        {/* Sair */}
        <View className="mt-1 items-center">
          <Pressable
            onPress={() => signOut()}
            accessibilityRole="button"
            accessibilityLabel="Sair da conta"
            className="h-12 w-full max-w-[340px] flex-row items-center justify-center gap-2 rounded-field bg-danger-soft active:opacity-80"
          >
            <LogOutIcon size={18} color={color.danger} />
            <Text className="text-[15px] font-semibold text-danger">
              Sair da conta
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
