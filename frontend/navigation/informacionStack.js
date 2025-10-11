import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ScreenInformacion from "../screens/informacion";
import MapaEcoPuntos from "../screens/mapaEcoPuntos";
import InfoCambioClimatico from "../screens/infoCambioClimatico";
import InfoEconomiaCircular from "../screens/infoEconomiaCircular";
import InfoComoCuidarPlaneta from "../screens/infoComoCuidarPlaneta";

const Stack = createNativeStackNavigator();

export default function InformacionStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="InformacionHome"
        component={ScreenInformacion}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MapaEcoPuntos"
        component={MapaEcoPuntos}
        options={{ headerShown: false }}
        // options={{ title: "Volver" }}
      />
      <Stack.Screen
        name="InfoCambioClimatico"
        component={InfoCambioClimatico}
        // options={{ title: "Volver" }}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InfoEconomiaCircular"
        component={InfoEconomiaCircular}
        // options={{ title: "Volver" }}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InfoComoCuidarPlaneta" 
        component={InfoComoCuidarPlaneta} 
        // options={{ title: "Volver"}} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}