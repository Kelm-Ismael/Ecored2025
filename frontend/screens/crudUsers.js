// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { View, Text } from 'react-native';

// import { commonStyles } from '../styles/styles';

// export default function ScreenCrudUsers() {
//     return (
//         <SafeAreaView style={commonStyles.safeArea}>
//             <View style={commonStyles.container}>
//                 <Text style={commonStyles.title}>
//                     CRUD USERS
//                 </Text>
//             </View>
//         </SafeAreaView>
//     );
// }
//---------------------------------------------------


import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet } from 'react-native';

export default function ScreenCrudUsers() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/usuarios') // usar tu IP si es teléfono físico
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(err => console.error('Error al obtener usuarios:', err));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>CRUD USERS</Text>
      <FlatList
        data={usuarios}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Email: {item.email}</Text>
            <Text>Estado: {item.estado}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  item: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
});
