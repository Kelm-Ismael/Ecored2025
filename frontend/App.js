import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import ScreenInformacion from './screens/informacion';
import ScreenBeneficio from './screens/beneficios';
import ScreenDesafio from './screens/desafios';
import AuthStack from './navigation/authStack';

import { headerStyles, tabBarStyles } from './styles/styles';

const Tab = createBottomTabNavigator();

const tabScreenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;
    switch (route.name) {
      case 'Informacion':
        iconName = focused ? 'information-circle' : 'information-circle-outline';
        break;
      case 'Usuario':
        iconName = focused ? 'person' : 'person-outline';
        break;
      case 'Beneficios':
        iconName = focused ? 'gift' : 'gift-outline';
        break;
      case 'Desafios':
        iconName = focused ? 'flash' : 'flash-outline';
        break;
    }
    return <Ionicons name={iconName} size={size} color={color} />;
  },
  ...tabBarStyles,
});

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator screenOptions={tabScreenOptions}>
          <Tab.Screen
            name="Informacion"
            component={ScreenInformacion}
            options={{ title: 'Información', ...headerStyles }}
          />
          <Tab.Screen
            name="Usuario"
            component={AuthStack} // Stack maneja Login, Registro y Perfil
            options={{ headerShown: false }} // Evita duplicación de títulos
          />
          <Tab.Screen
            name="Beneficios"
            component={ScreenBeneficio}
            options={{ title: 'Beneficios', ...headerStyles }}
          />
          <Tab.Screen
            name="Desafios"
            component={ScreenDesafio}
            options={{ title: 'Desafíos', ...headerStyles }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
