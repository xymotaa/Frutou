import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AvaliacaoScreen } from '@/screens/AvaliacaoScreen';
import { DetalhesScreen } from '@/screens/DetalhesScreen';
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
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="Detalhes" component={DetalhesScreen} />
        <Stack.Screen name="MeusAnuncios" component={MeusAnunciosScreen} />
        <Stack.Screen name="Avaliacao" component={AvaliacaoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
