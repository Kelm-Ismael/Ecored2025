import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import logo from "./assets/favicon.png";//importar img
export default function App() {
  return (
    <View style={styles.container}>
      {/**<Image source={logo} style={{width: 70, height: 70}}></Image>/**en la direccion pongo lo importado*/}
      <Image source={{ uri:"https://img.freepik.com/vector-gratis/cartel-reciclaje-tiene-hojas-planas_78370-5578.jpg"}} style={{width: 70, height: 70}}/>
      <Text style={{ color: "white" }}><h1>Bienvenidos a EcoRed</h1></Text>
      <Button color="blue" title='PULSE AQUI' onPress={()=> alert("Hola!")} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#33e242ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
