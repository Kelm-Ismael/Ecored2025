import React from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { commonStyles } from '../styles/styles.js'

export function PickerDia({ value, onChange }) {
  const dias = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  return (
    <View style={commonStyles.pickerContainer}>
      <Picker selectedValue={value} onValueChange={onChange} mode="dropdown" >
        {dias.map(dia => (
          <Picker.Item key={dia} label={dia} value={dia} />
        ))}
      </Picker>
    </View>
  );
}

export function PickerMes({ value, onChange }) {
  const meses = [
    { label: 'Enero', value: '1' },
    { label: 'Febrero', value: '2' },
    { label: 'Marzo', value: '3' },
    { label: 'Abril', value: '4' },
    { label: 'Mayo', value: '5' },
    { label: 'Junio', value: '6' },
    { label: 'Julio', value: '7' },
    { label: 'Agosto', value: '8' },
    { label: 'Septiembre', value: '9' },
    { label: 'Octubre', value: '10' },
    { label: 'Noviembre', value: '11' },
    { label: 'Diciembre', value: '12' },
  ];
  return (
    <View style={commonStyles.pickerContainer}>
      <Picker selectedValue={value} onValueChange={onChange} mode="dropdown" >
        {meses.map(mes => (
          <Picker.Item key={mes.value} label={mes.label} value={mes.value} />
        ))}
      </Picker>
    </View>
  );
}

export function PickerAnio({ value, onChange, desde = 1900, hasta }) {
  const yearHasta = hasta || new Date().getFullYear();
  const anios = [];
  for (let y = yearHasta; y >= desde; y--) {
    anios.push(y.toString());
  }
  return (
    <View style={commonStyles.pickerContainer}>
      <Picker selectedValue={value} onValueChange={onChange} mode="dropdown" >
        {anios.map(anio => (
          <Picker.Item key={anio} label={anio} value={anio} />
        ))}
      </Picker>
    </View>
  );
}