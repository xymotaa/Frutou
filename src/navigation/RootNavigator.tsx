import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AvaliacaoScreen } from '@/screens/AvaliacaoScreen';
import { ChatScreen } from '@/screens/ChatScreen';
import { ConfiguracoesScreen } from '@/screens/ConfiguracoesScreen';
import { DetalhesScreen } from '@/screens/DetalhesScreen';
import { EditarAnuncioScreen } from '@/screens/EditarAnuncioScreen';
import { EditarPerfilScreen } from '@/screens/EditarPerfilScreen';
import { HistoricoScreen } from '@/screens/HistoricoScreen';
import { LoginScreen } from '@/screens/LoginScreen';
import { MeusAnunciosScreen } from '@/screens/MeusAnunciosScreen';
import { SignUpScreen } from '@/screens/SignUpScreen';
import { useSession } from '@/state/session';

import { MainTabs } from './MainTabs';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { status } = useSession();
  const signedIn = status === 'signedIn';

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          animationDuration: 220,
        }}
      >
        {signedIn ? (
          <Stack.Group>
            <Stack.Screen
              name="Main"
              component={MainTabs}
              options={{ animation: 'fade' }}
            />
            <Stack.Screen name="Detalhes" component={DetalhesScreen} />
            <Stack.Screen name="MeusAnuncios" component={MeusAnunciosScreen} />
            <Stack.Screen name="EditarAnuncio" component={EditarAnuncioScreen} />
            <Stack.Screen name="Avaliacao" component={AvaliacaoScreen} />
            <Stack.Screen name="EditarPerfil" component={EditarPerfilScreen} />
            <Stack.Screen name="Configuracoes" component={ConfiguracoesScreen} />
            <Stack.Screen name="Historico" component={HistoricoScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
          </Stack.Group>
        ) : (
          <Stack.Group screenOptions={{ animation: 'fade' }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
