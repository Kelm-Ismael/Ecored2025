

// import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons';

// import ScreenInformacion from './screens/informacion';
// import ScreenBeneficio from './screens/beneficios';
// import ScreenDesafio from './screens/desafios';
// import AuthStack from './navigation/authStack';
// import { headerStyles, tabBarStyles } from './styles/styles';

// const Tab = createBottomTabNavigator();

// const tabScreenOptions = ({ route }) => ({
//   tabBarIcon: ({ focused, color, size }) => {
//     let iconName;
//     switch (route.name) {
//       case 'Informacion':
//         iconName = focused ? 'information-circle' : 'information-circle-outline';
//         break;
//       case 'Usuario':
//         iconName = focused ? 'person' : 'person-outline';
//         break;
//       case 'Beneficios':
//         iconName = focused ? 'gift' : 'gift-outline';
//         break;
//       case 'Desafios':
//         iconName = focused ? 'flash' : 'flash-outline';
//         break;
//     }
//     return <Ionicons name={iconName} size={size} color={color} />;
//   },
//   ...tabBarStyles,
// });

// export default function App() {
//   return (
//     <SafeAreaProvider>
//       <NavigationContainer>
//         <Tab.Navigator screenOptions={tabScreenOptions}>
//           <Tab.Screen
//             name="Informacion"
//             component={ScreenInformacion}
//             options={{ title: 'Información', ...headerStyles }}
//           />
//           <Tab.Screen
//             name="Usuario"
//             component={AuthStack} // Maneja Login, Registro y Perfil con auto-login
//             options={{ headerShown: false }}
//           />
//           <Tab.Screen
//             name="Beneficios"
//             component={ScreenBeneficio}
//             options={{ title: 'Beneficios', ...headerStyles }}
//           />
//           <Tab.Screen
//             name="Desafios"
//             component={ScreenDesafio}
//             options={{ title: 'Desafíos', ...headerStyles }}
//           />
//         </Tab.Navigator>
//       </NavigationContainer>
//     </SafeAreaProvider>
//   );
// }

// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import ScreenInformacion from './screens/informacion';
import ScreenBeneficio from './screens/beneficios';
import ScreenDesafio from './screens/desafios';
import ScannerQR from './screens/scannerQR';
import AuthStack from './navigation/authStack';

import { headerStyles, tabBarStyles } from './styles/styles';

const Tab = createBottomTabNavigator();

const tabScreenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    const map = {
      Informacion: focused ? 'information-circle' : 'information-circle-outline',
      Usuario:     focused ? 'person' : 'person-outline',
      Beneficios:  focused ? 'gift'   : 'gift-outline',
      Desafios:    focused ? 'flash'  : 'flash-outline',
      ScannerQR:   focused ? 'qr-code' : 'qr-code-outline',
    };
    return <Ionicons name={map[route.name]} size={size} color={color} />;
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
            component={AuthStack} // Login/Registro/Perfil con auto-login
            options={{ headerShown: false, title: 'Usuario' }}
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

          {/* Nueva pestaña: Escanear QR */}
          <Tab.Screen
            name="ScannerQR"
            component={ScannerQR}
            options={{ title: 'Escanear QR', ...headerStyles }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
