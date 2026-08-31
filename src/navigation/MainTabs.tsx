import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';

import {
  CompassIcon,
  HomeIcon,
  MessageIcon,
  PlusIcon,
  UserTabIcon,
} from '@/components/icons';
import { CriarAnuncioScreen } from '@/screens/CriarAnuncioScreen';
import { ExploreScreen } from '@/screens/ExploreScreen';
import { HomeScreen } from '@/screens/HomeScreen';
import { MensagensScreen } from '@/screens/MensagensScreen';
import { PerfilScreen } from '@/screens/PerfilScreen';
import { color } from '@/theme/tokens';

import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: color.primary,
        tabBarInactiveTintColor: color.muted,
        tabBarStyle: {
          height: 72,
          paddingTop: 8,
          paddingBottom: 10,
          borderTopColor: color.line,
          backgroundColor: color.surface,
        },
        tabBarLabelStyle: { fontSize: 11, marginTop: 2 },
        tabBarItemStyle: { paddingTop: 2 },
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Início',
          tabBarIcon: ({ color: c, focused }) => (
            <HomeIcon size={24} color={c} filled={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Explorar"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ color: c, focused }) => (
            <CompassIcon size={24} color={c} filled={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Anunciar"
        component={CriarAnuncioScreen}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: () => (
            <View className="h-14 w-14 items-center justify-center rounded-full border-4 border-surface bg-accent">
              <PlusIcon size={26} color="#FFFFFF" />
            </View>
          ),
          tabBarIconStyle: { marginTop: -14 },
        }}
      />
      <Tab.Screen
        name="Mensagens"
        component={MensagensScreen}
        options={{
          tabBarIcon: ({ color: c, focused }) => (
            <MessageIcon size={24} color={c} filled={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Usuario"
        component={PerfilScreen}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color: c, focused }) => (
            <UserTabIcon size={24} color={c} filled={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
