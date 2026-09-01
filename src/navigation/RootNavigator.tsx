import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AvaliacaoScreen } from '@/screens/AvaliacaoScreen';
import { ConfiguracoesScreen } from '@/screens/ConfiguracoesScreen';
import { DetalhesScreen } from '@/screens/DetalhesScreen';
import { EditarPerfilScreen } from '@/screens/EditarPerfilScreen';
import { HistoricoScreen } from '@/screens/HistoricoScreen';
import { LoginScreen } from '@/screens/LoginScreen';
import { MeusAnunciosScreen } from '@/screens/MeusAnunciosScreen';
import { SignUpScreen } from '@/screens/SignUpScreen';

import { MainTabs } from './MainTabs';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          animationDuration: 220,
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ animation: 'fade' }}
        />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{ animation: 'fade' }}
        />
        <Stack.Screen name="Detalhes" component={DetalhesScreen} />
        <Stack.Screen name="MeusAnuncios" component={MeusAnunciosScreen} />
        <Stack.Screen name="Avaliacao" component={AvaliacaoScreen} />
        <Stack.Screen name="EditarPerfil" component={EditarPerfilScreen} />
        <Stack.Screen name="Configuracoes" component={ConfiguracoesScreen} />
        <Stack.Screen name="Historico" component={HistoricoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
