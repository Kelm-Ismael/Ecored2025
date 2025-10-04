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
        options={{ title: "Información" }}
      />
      <Stack.Screen
        name="MapaEcoPuntos"
        component={MapaEcoPuntos}
        options={{ title: "Mapa EcoPuntos" }}
      />
      <Stack.Screen
        name="InfoCambioClimatico"
        component={InfoCambioClimatico}
        options={{ title: "Cambio Climático" }}
      />
      <Stack.Screen
        name="InfoEconomiaCircular"
        component={InfoEconomiaCircular}
        options={{ title: "Economia Circular" }}
      />
      <Stack.Screen
        name="InfoComoCuidarPlaneta" 
        component={InfoComoCuidarPlaneta} 
        options={{ title: "Acciones climaticas positivas"}} 
      />
    </Stack.Navigator>
  );
}
