import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { commonStyles, informacionAppStyles } from '../styles/styles';

export default function InfoCambioClimatico() {
  return (
    <View style={commonStyles.container}>
      <ScrollView contentContainerStyle={informacionAppStyles.scroll}>
        <Text style={informacionAppStyles.title}>¿Qué es el cambio climático?</Text>
        <Text style={informacionAppStyles.text}>
          Según el Convenio Marco de Naciones Unidas (CMNUCC) se entiende por cambio climático al cambio de clima 
          atribuido directa o indirectamente a la actividad humana que altera la composición de la atmósfera mundial y se suma a la variabilidad natural del clima observada durante períodos de tiempo comparables.
        </Text>
        <Text style={informacionAppStyles.text}>
          El clima de la Tierra ha variado muchas veces a lo largo de su historia debido a cambios naturales, 
          pero, desde los últimos años del siglo XIX, la temperatura media de la superficie terrestre ha aumentado más de 0,6 ºC. Este aumento está vinculado al proceso de industrialización iniciado hace más de un siglo y, en particular, a la combustión de cantidades cada vez mayores de petróleo y carbón, la tala de bosques y algunos métodos de explotación agrícola
        </Text>
        <Text style={informacionAppStyles.text}>
          Los gases de efecto invernadero (GEI) entre los que se encuentran el dióxido de carbono (CO2), el óxido nitroso (NO2) y el metano (CH4), tienen la propiedad de absorber y reemitir la radiación infrarroja que la Tierra recibe del sol. Gracias a ellos, ocurre un fenómeno conocido como efecto invernadero natural, que permite que la Tierra mantenga una temperatura promedio 15 º C.
        </Text>
        <Text style={informacionAppStyles.text}>
          Si bien algunos de estos gases se encuentran naturalmente en la atmósfera, otros son producidos por el ser humano (de origen antrópico) como resultado de actividades vinculadas a la generación de energía, el transporte, el uso del suelo, la industria, el manejo de los residuos, etc. La acumulación de estos gases en la atmósfera potencia el efecto invernadero natural y esto se traduce en aumento de la temperatura del planeta.
        </Text>
        <Text style={informacionAppStyles.text}>
          Los científicos dejan claro que será necesario un gran cambio institucional y tecnológico para que el calentamiento global no supere los 2 º C promedio 
          sobre la superficie del planeta y para que exista una mayor probabilidad de evitar la ocurrencia de daños catastróficos e irreversibles.
        </Text>
        <Text style={informacionAppStyles.subtitle}>
          Principales consecuencias del cambio climático:
        </Text>
        <View style={informacionAppStyles.list}>
          <View style={informacionAppStyles.listItem}>
            <FontAwesome name="check" size={18} style={informacionAppStyles.icon} />
            <Text style={informacionAppStyles.listText}>El cambio de circulación de los océanos.</Text>
          </View>
          <View style={informacionAppStyles.listItem}>
            <FontAwesome name="check" size={18} style={informacionAppStyles.icon} />
            <Text style={informacionAppStyles.listText}>El aumento o disminución de las precipitaciones (según la zona geográfica).</Text>
          </View>
          <View style={informacionAppStyles.listItem}>
            <FontAwesome name="check" size={18} style={informacionAppStyles.icon} />
            <Text style={informacionAppStyles.listText}>El aumento del nivel del mar.</Text>
          </View>
          <View style={informacionAppStyles.listItem}>
            <FontAwesome name="check" size={18} style={informacionAppStyles.icon} />
            <Text style={informacionAppStyles.listText}>El retroceso de los glaciares.</Text>
          </View>
          <View style={informacionAppStyles.listItem}>
            <FontAwesome name="check" size={18} style={informacionAppStyles.icon} />
            <Text style={informacionAppStyles.listText}>El aumento de los eventos climáticos extremos.</Text>
          </View>
          <View style={informacionAppStyles.listItem}>
            <FontAwesome name="check" size={18} style={informacionAppStyles.icon} />
            <Text style={informacionAppStyles.listText}>El aumento de las olas de calor y frío.</Text>
          </View>
          <View style={informacionAppStyles.listItem}>
            <FontAwesome name="check" size={18} style={informacionAppStyles.icon} />
            <Text style={informacionAppStyles.listText}>El aumento de las migraciones forzadas.</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}