import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert, Button, Platform, Text, TextInput, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useState, useEffect } from 'react';
import { commonStyles } from '../styles/styles';
import { BASE_URL } from '../config/api.js'
import { esFechaValida } from '../utils/validaciones/fecha';

import { PickerDia, PickerMes, PickerAnio } from '../components/FechaPicker';

export default function ScreenRegistro({navigation}) {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [dni, setDni] = useState('');

     // fecha web
    const [dia, setDia] = useState('1');
    const [mes, setMes] = useState('1');
    const [anio, setAnio] = useState(new Date().getFullYear().toString());

    // fecha movil
    const [fechaNacimiento, setFechaNacimiento] = useState(null); // objeto Date
    const [mostrarPicker, setMostrarPicker] = useState(false);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [enviando, setEnviando] = useState(false);

    useEffect(() => {
        const hoy = new Date();
        if (Platform.OS === 'web') {
            setDia(hoy.getDate().toString());
            setMes((hoy.getMonth() + 1).toString());
            setAnio(hoy.getFullYear().toString());
        } else {
            setFechaNacimiento(new Date());
        }
    }, []);

    const abrirPicker = () => setMostrarPicker(true);

    const onChangeFecha = (event, selectedDate) => {
        setMostrarPicker(false);
        if (selectedDate) {
            setFechaNacimiento(selectedDate);
        }
    };

    const obtenerFechaDesdePickers = () => {
        if (!esFechaValida(dia, mes, anio)) return null;
        return new Date(`${anio}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`);
    };

    const handleRegister = async () => {
        console.log('➡️ Entrando a handleRegister');

        let fechaFinal = Platform.OS === 'web' ? obtenerFechaDesdePickers() : fechaNacimiento;

        if (!fechaFinal) {
            console.log('❌ Fecha inválida detectada', { fechaFinal });
            return Alert.alert('Fecha inválida', 'Ingresá una fecha de nacimiento válida.');
        }
        
        const diaStr = fechaFinal.getDate().toString();
        const mesStr = (fechaFinal.getMonth() + 1).toString();
        const anioStr = fechaFinal.getFullYear().toString();

        if (!esFechaValida(diaStr, mesStr, anioStr)) {
            console.log('❌ Fecha inválida según esFechaValida()', { diaStr, mesStr, anioStr });
            return Alert.alert('Fecha inválida', 'Ingresá una fecha de nacimiento válida.');
        }
        
        if (!nombre || !apellido || !dni || !email || !password) {
            console.log('❌ Falta completar campos:', { nombre, apellido, dni, email, password });
            return Alert.alert('Campos', 'Completá todos los campos.');
        }

        const fechaFormateada = `${anio.padStart(4, '0')}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
        console.log('📅 Fecha formateada enviada:', fechaFormateada);

        try {
            setEnviando(true);

            const nuevoUsuarioData = {
                nombre,
                apellido,
                dni,
                fechaNacimiento: fechaFormateada,
                email,
                contrasenia: password
            };

            console.log('📤 Datos enviados al servidor:', nuevoUsuarioData); 

            // Registrar nuevo usuario 
            const res = await fetch(`${BASE_URL}/usuarios/nuevo`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoUsuarioData), 
            });

            console.log('🧾 Código de estado HTTP:', res.status);
            const raw = await res.text();
            console.log('📨 Texto completo de respuesta:', raw);

            let data = {};

            try {
                data = JSON.parse(raw);
            } catch (e) {
                console.warn('⚠️ No se pudo parsear la respuesta como JSON');
            }

            if (!res.ok || !data?.token) {
                console.log('❌ Registro fallido - Token no recibido o error:', data);
                return Alert.alert('Error', data?.error || 'No se pudo registrar');
            }

            // // obtener perfil
            // const perfilRes = await fetch(`${BASE_URL}/usuarios/perfil`, {
            //     headers: { Authorization: `Bearer ${data.token}` },
            // });

        
            // const perfilRaw = await perfilRes.text();
            // console.log('👤 Respuesta de perfil:', perfilRaw);

            // let perfil = {};
            // try {
            //     perfil = JSON.parse(perfilRaw);
            // } catch (e) {
            //     console.warn('⚠️ No se pudo parsear perfil como JSON');
            // }

            // console.log('👤 Perfil recibido:', perfil);
            // if (!perfil?.id) {
            //     return Alert.alert('Error', 'No se pudo obtener el perfil del usuario');
            // }

            if (Platform.OS === 'web') {
                window.alert('Tu usuario fue creado correctamente. Iniciá sesión para continuar.');
                navigation.navigate('Login', { email });
            } else {
                Alert.alert(
                    'Registro exitoso',
                    'Tu usuario fue creado correctamente. Iniciá sesión para continuar.',
                    [
                        {
                            text: 'Ir al login',
                            onPress: () => navigation.navigate('Login', { email }),
                        },
                    ]
                );
            }

        } catch (err) {
            console.error('❌ Error registro:', err);
            Alert.alert('Error', 'No se pudo conectar al servidor');
        } finally {
            setEnviando(false);
        }
    };

    return (
        <SafeAreaView style={commonStyles.safeArea}>
            <View style={commonStyles.container}>
                <Text style={commonStyles.title}>
                    Registrate
                </Text>
                <View style={commonStyles.accentContainer}>
                    <Text>Nombre:</Text>
                    <TextInput
                        style={commonStyles.input}
                        value={nombre}
                        onChangeText={setNombre}
                    />
                    <Text>Apellido:</Text>
                    <TextInput
                        style={commonStyles.input}
                        value={apellido}
                        onChangeText={setApellido}
                    />
                    <Text>DNI:</Text>
                    <TextInput
                        style={commonStyles.input}
                        value={dni}
                        onChangeText={setDni}
                        keyboardType="numeric"
                    />
                    <Text>Fecha de nacimiento:</Text>
                    {Platform.OS === 'web' ? (
                        <View style={commonStyles.row}>
                            <PickerDia value={dia} onChange={setDia} />
                            <PickerMes value={mes} onChange={setMes} />
                            <PickerAnio value={anio} onChange={setAnio} desde={1900} hasta={new Date().getFullYear()} />
                        </View>
                    ) : (
                        <>
                            <Button
                                title={fechaNacimiento ? fechaNacimiento.toLocaleDateString() : 'Seleccionar fecha'}
                                onPress={abrirPicker}
                            />
                            {mostrarPicker && (
                                <DateTimePicker
                                    value={fechaNacimiento || new Date()}
                                    mode="date"
                                    onChange={onChangeFecha}
                                    maximumDate={new Date()}
                                />
                            )}
                        </>
                    )}
                    <Text>E-mail:</Text>
                    <TextInput
                        style={commonStyles.input}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <Text>Contraseña</Text>
                    <TextInput
                        style={commonStyles.input}
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    <Button 
                        title={enviando ? 'Enviando...' : 'Crear nuevo usuario'}
                        onPress={handleRegister}
                        disabled={enviando}
                    />
                    {/* link a crear nuevo usuario o al perfil if inicio de sesion -> redirect mi screenUsuario/perfilUsuario*/}
                </View>
            </View>
        </SafeAreaView>
    );
}