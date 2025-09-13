import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert, Button, Platform, Text, TextInput, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useState, useEffect } from 'react';
import { commonStyles } from '../styles/styles';
import BASE_URL from '../config/api.js'
import { esFechaValida } from '../utils/validaciones/fecha';

export default function ScreenRegistro({navigation}) {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [dni, setDni] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState(null); // objeto Date
    const [fechaInputWeb, setFechaInputWeb] = useState(''); // solo para web
    const [mostrarPicker, setMostrarPicker] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [enviando, setEnviando] = useState(false);

    useEffect(() => {
        if (Platform.OS === 'web') {
            const hoy = new Date();
            const hoyStr = hoy.toISOString().split('T')[0];
            setFechaInputWeb(hoyStr);
            setFechaNacimiento(hoy);
        }
    }, []);

    const abrirPicker = () => setMostrarPicker(true);

    const onChangeFecha = (event, selectedDate) => {
        setMostrarPicker(false);
        if (selectedDate) {
            setFechaNacimiento(selectedDate);
        }
    };

    const parseFechaDesdeInputWeb = () => {
        const [anio, mes, dia] = fechaInputWeb.split('-');
        if (!anio || !mes || !dia) return null;

        if (!esFechaValida(dia, mes, anio)) return null;

        return new Date(`${anio}-${mes}-${dia}`);
    };

    const handleRegister = async () => {
        let fechaFinal = fechaNacimiento;

        if (Platform.OS === 'web') {
            fechaFinal = parseFechaDesdeInputWeb();
        }

        if (!fechaFinal) {
            return Alert.alert('Fecha inválida', 'Ingresá una fecha de nacimiento válida.');
        }
        
        const dia = fechaNacimiento.getDate().toString();
        const mes = (fechaNacimiento.getMonth() + 1).toString(); // 0-indexed
        const anio = fechaNacimiento.getFullYear().toString();

        if (!esFechaValida(dia, mes, anio)) {
            return Alert.alert('Fecha inválida', 'Ingresá una fecha de nacimiento válida.');
        }
        
        if (!nombre || !apellido || !dni || !email || !password) {
            return Alert.alert('Campos', 'Completá todos los campos.');
        }

        const fechaFormateada = `${anio.padStart(4, '0')}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;

        try {
            setEnviando(true);

            const bodyToSend = {
                nombre,
                apellido,
                dni,
                fechaNacimiento: fechaFormateada,
                email,
                contrasenia: password,
            };

            console.log('📤 Datos enviados al servidor:', bodyToSend);

            // Registrar nuevo usuario
            const res = await fetch(`${BASE_URL}/api/usuarios/nuevo`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyToSend), 
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
                return Alert.alert('Error', data?.error || 'No se pudo registrar');
            }

            await AsyncStorage.setItem('token', data.token);

            // obtener perfil
            const perfilRes = await fetch(`${BASE_URL}/api/usuarios/perfil/${data.id_usuario}`, {
                headers: { Authorization: `Bearer ${data.token}` },
            });

        
            const perfilRaw = await perfilRes.text();
            console.log('👤 Respuesta de perfil:', perfilRaw);

            let perfil = {};
            try {
                perfil = JSON.parse(perfilRaw);
            } catch (e) {
                console.warn('⚠️ No se pudo parsear perfil como JSON');
            }

            if (!perfil?.id_usuario) {
                return Alert.alert('Error', 'No se pudo obtener el perfil del usuario');
            }

            navigation.replace('PerfilUsuario', { id: perfil.id_usuario });

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
                        <TextInput
                            style={commonStyles.input}
                            placeholder="YYYY-MM-DD"
                            value={fechaInputWeb}
                            onChangeText={(text) => {
                                setFechaInputWeb(text);
                                const [year, month, day] = text.split('-');
                                const date = new Date(`${year}-${month}-${day}`);
                                if (!isNaN(date.getTime())) {
                                    setFechaNacimiento(date);
                                } else {
                                    setFechaNacimiento(null);
                                }
                            }}
                            editable={true}
                        />
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