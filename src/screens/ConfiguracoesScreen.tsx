import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SettingRow } from '@/components/SettingRow';
import {
  BellIcon,
  ChevronLeftIcon,
  HandHeartIcon,
  LogOutIcon,
  MapPinIcon,
  MessageIcon,
  SettingsIcon,
  TagIcon,
  UserIcon,
} from '@/components/icons';
import { signOut } from '@/state/session';
import type { RootStackScreenProps } from '@/navigation/types';
import { color } from '@/theme/tokens';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-2">
      <Text className="text-[13px] font-semibold uppercase tracking-wide text-muted">
        {title}
      </Text>
      <View className="gap-2">{children}</View>
    </View>
  );
}

export function ConfiguracoesScreen({
  navigation,
}: RootStackScreenProps<'Configuracoes'>) {
  const [notifMensagens, setNotifMensagens] = useState(true);
  const [notifAnuncios, setNotifAnuncios] = useState(true);
  const [notifAvaliacoes, setNotifAvaliacoes] = useState(false);
  const [localizacao, setLocalizacao] = useState(true);
  const [perfilPublico, setPerfilPublico] = useState(true);

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
          Configurações
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 24, gap: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <Section title="Notificações">
          <SettingRow
            icon={<MessageIcon size={20} color={color.ink} />}
            label="Novas mensagens"
            description="Avisar quando alguém te enviar uma mensagem"
            toggle={{ value: notifMensagens, onValueChange: setNotifMensagens }}
          />
          <SettingRow
            icon={<TagIcon size={18} color={color.ink} />}
            label="Anúncios por perto"
            description="Frutas novas no seu bairro"
            toggle={{ value: notifAnuncios, onValueChange: setNotifAnuncios }}
          />
          <SettingRow
            icon={<BellIcon size={18} color={color.ink} />}
            label="Avaliações recebidas"
            toggle={{
              value: notifAvaliacoes,
              onValueChange: setNotifAvaliacoes,
            }}
          />
        </Section>

        <Section title="Privacidade">
          <SettingRow
            icon={<MapPinIcon size={18} color={color.ink} />}
            label="Usar minha localização"
            description="Para mostrar frutas próximas e calcular distâncias"
            toggle={{ value: localizacao, onValueChange: setLocalizacao }}
          />
          <SettingRow
            icon={<UserIcon size={18} color={color.ink} />}
            label="Perfil público"
            description="Outras pessoas podem ver seu nome e avaliações"
            toggle={{ value: perfilPublico, onValueChange: setPerfilPublico }}
          />
        </Section>

        <Section title="Conta">
          <SettingRow
            icon={<UserIcon size={18} color={color.ink} />}
            label="Editar perfil"
            onPress={() => navigation.navigate('EditarPerfil')}
          />
          <SettingRow
            icon={<HandHeartIcon size={18} color={color.ink} />}
            label="Central de ajuda"
            onPress={() => {}}
          />
          <SettingRow
            icon={<SettingsIcon size={18} color={color.ink} />}
            label="Sobre o Frutou"
            description="Versão 1.0.0"
            onPress={() => {}}
          />
        </Section>

        <Pressable
          onPress={() => signOut()}
          accessibilityRole="button"
          accessibilityLabel="Sair da conta"
          className="mt-1 h-14 flex-row items-center justify-center gap-2 rounded-field bg-danger-soft active:opacity-80"
        >
          <LogOutIcon size={18} color={color.danger} />
          <Text className="text-[15px] font-semibold text-danger">
            Sair da conta
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
