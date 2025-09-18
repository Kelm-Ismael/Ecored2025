import { useEffect, useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../config/api';
import { commonStyles } from '../styles/styles';

export default function ResiduoPicker({ onPuntosCalculados, onChange, cantidad }) {
  const { userToken } = useContext(AuthContext);
  const [residuos, setResiduos] = useState([]);
  const [selectedResiduo, setSelectedResiduo] = useState(null);

  useEffect(() => {
    const fetchResiduos = async () => {
      try {
        const res = await fetch(`${BASE_URL}/residuos/todos`, {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        });
        const data = await res.json();
        setResiduos(data);
      } catch (error) {
        console.error('Error al cargar residuos:', error);
      }
    };

    fetchResiduos();
  }, []);

  useEffect(() => {
  const cantidadNum = parseFloat(cantidad);
  const residuoObj = residuos.find((r) => r.id === selectedResiduo);

  console.log('residuo seleccionado: ', residuoObj);

  if (isNaN(cantidadNum)) {
    console.log("Ingrese cantidad válida.");
    if (onChange) onChange(null);
    if (onPuntosCalculados) onPuntosCalculados(0);
    return;
  }

  if (cantidadNum <= 0) {
    console.log("La cantidad debe ser mayor a 0.");
    if (onChange) onChange(null);
    if (onPuntosCalculados) onPuntosCalculados(0);
    return;
  }

  if (!residuoObj) {
    console.log("Residuo no seleccionado.");
    if (onChange) onChange(null);
    if (onPuntosCalculados) onPuntosCalculados(0);
    return;
  }

  const puntosCalculados = Math.ceil((cantidadNum / residuoObj.medida) * residuoObj.pts_x_medida);

  if (onChange) {
    onChange({
      residuo: residuoObj,
      cantidad: cantidadNum,
      puntos: puntosCalculados,
    });

    console.log(
      'onChange ejecutado:',
      '\n- Residuo:', residuoObj,
      '\n- Cantidad:', cantidadNum,
      '\n- Puntos:', puntosCalculados
    );
  }

  if (onPuntosCalculados) {
    onPuntosCalculados(puntosCalculados);
  }
}, [selectedResiduo, cantidad, residuos]);



  return (
    <View>
      <Picker
        selectedValue={selectedResiduo}
        onValueChange={(itemValue) => {
            const valorNumerico = parseInt(itemValue, 10);
            console.log("Nuevo valor seleccionado:", valorNumerico);
            setSelectedResiduo(valorNumerico);
        }}
        style={commonStyles.webEntregaTipoPicker}
      >
        <Picker.Item label="Seleccionar tipo" value="" />
        {residuos.map((residuo) => (
          <Picker.Item
            key={residuo.id}
            label={`${residuo.nombre} (${residuo.unidad})`}
            value={residuo.id}
          />
        ))}
      </Picker>
    </View>
  );
}
