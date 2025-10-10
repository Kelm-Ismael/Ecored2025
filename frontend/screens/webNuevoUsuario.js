import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

import { commonStyles, webNuevoUsuario } from '../styles/styles';
import WebSidebar from '../components/WebSidebar';
import { BASE_URL } from '../config/api';
import { AuthContext } from '../context/AuthContext';
import { PickerDia, PickerMes, PickerAnio } from '../components/FechaPicker';
import { validarEmail } from '../utils/validaciones/email';
import { esFechaValida } from '../utils/validaciones/fecha';

export default function WebNuevoUsuario() {
    const navigation = useNavigation();
    const { user, userToken, userRole, loading: authLoading } = useContext(AuthContext);
    
    const [tiposUsuario, setTiposUsuario] = useState([]);
    const [selectedTipoUsuario, setSelectedTipoUsuario] = useState(null);
    const [tiposInstitucion, setTiposInstitucion] = useState([]);
    const [selectedTipoInstitucion, setSelectedTipoInstitucion] = useState(null);
    const [esSuperAdmin, setEsSuperAdmin] = useState(false);

    const [formData, setFormData] = useState({});
    const [dia, setDia] = useState('1');
    const [mes, setMes] = useState('1');
    const [anio, setAnio] = useState(new Date().getFullYear().toString());

    useEffect(() => {
        if (!authLoading) {
            const rolesPermitidos = ['superadmin', 'administrador'];
            if (!rolesPermitidos.includes(userRole?.toLowerCase())) {
                navigation.navigate('WebMain');
            }
        }
    }, [authLoading, userRole]);


    useEffect(() => {
        const fetchTiposUsuario = async () => {
            try {
                const res = await fetch(`${BASE_URL}/usuarios/tipos`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                });
                const data = await res.json();
                setTiposUsuario(data);
            } catch (error) {
                console.error('Error al cargar tipos de usuario:', error);
            }
        };

        fetchTiposUsuario();
    }, []);

    useEffect(() => {
        const fetchTiposInstitucion = async () => {
            try {
                const res = await fetch(`${BASE_URL}/institucion/tipos`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                });
                const data = await res.json();
                setTiposInstitucion(data);
            } catch (error) {
                console.error('Error al cargar tipos de institucion:', error);
            }
        };

        fetchTiposInstitucion();
    }, []);

    const handleInputChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const resetFecha = () => {
        const hoy = new Date();
        setDia(hoy.getDate().toString());
        setMes((hoy.getMonth() + 1).toString());
        setAnio(hoy.getFullYear().toString());
    };

    useEffect(() => {
        resetFecha();
    }, []);

    const setInstitucionPorDefecto = (tipoUsuarioSeleccionado) => {
        if (
            tipoUsuarioSeleccionado?.toLowerCase() === 'escuela' &&
            tiposInstitucion.length > 0
        ) {
            const tipoEscuela = tiposInstitucion.find((tipo) =>
                tipo.institucion.toLowerCase().includes('escuela')
            );

            if (tipoEscuela) {
                setSelectedTipoInstitucion(tipoEscuela.id);
                handleInputChange('id_tipo_institucion', tipoEscuela.id);
            }
        }
    };

    const mostrarForm = () => {
        if (!selectedTipoUsuario) return null;

        const tipoId = tiposUsuario.find((t) => t.tipo_usuario === selectedTipoUsuario)?.id;
        const tipo = selectedTipoUsuario.toLowerCase();

        if (tipo === 'escuela') {
            return (
                <View style={webNuevoUsuario.containerForm}>
                    <View style={webNuevoUsuario.formRow}>
                        <View style={webNuevoUsuario.setLabelInput}>
                            <Text style={webNuevoUsuario.formLabel}>E-mail:</Text>
                            <TextInput
                                style={webNuevoUsuario.input}
                                value={formData.email || ''}
                                onChangeText={(text) => handleInputChange('email', text)}
                            />
                        </View>
                    </View>
                    <View style={webNuevoUsuario.formRow}>
                        <View style={webNuevoUsuario.setLabelInput}>
                            <Text style={webNuevoUsuario.formLabel}>Nombre:</Text>
                            <TextInput
                                style={webNuevoUsuario.input}
                                value={formData.nombre || ''}
                                onChangeText={(text) => handleInputChange('nombre', text)}
                            />
                        </View>
                    </View>
                    <View style={webNuevoUsuario.formRow}>
                        <View style={webNuevoUsuario.setLabelInput}>
                            <Text style={webNuevoUsuario.formLabel}>CUIT/CUIL:</Text>
                            <TextInput
                                style={webNuevoUsuario.input}
                                value={formData.cuit_cuil || ''}
                                onChangeText={(text) => handleInputChange('cuit_cuil', text)}
                            />
                        </View>
                    </View>
                    <View style={webNuevoUsuario.formRow}>
                        <View style={webNuevoUsuario.setLabelInput}>
                            <Text style={webNuevoUsuario.formLabel}>Tipo de institución:</Text>
                            <Picker
                                selectedValue={selectedTipoInstitucion}
                                style={webNuevoUsuario.input}
                                onValueChange={(itemValue) => {
                                    setSelectedTipoInstitucion(itemValue);
                                    handleInputChange('id_tipo_institucion', itemValue);
                                }}
                            >
                                <Picker.Item label="Seleccione tipo de institución" value={null} />
                                {tiposInstitucion.map((tipo) => (
                                    <Picker.Item
                                        key={tipo.id}
                                        label={tipo.institucion}
                                        value={tipo.id}
                                    />
                                ))}
                            </Picker>
                        </View>
                    </View>

                    {/* <Text style={commonStyles.label}>ID Tipo Usuario: {tipoId}</Text>
                    <Text style={commonStyles.label}>ID Tipo Institución: {selectedTipoInstitucion || 'No seleccionado'}</Text> */}
                </View>
            );
        }

        return (
            <View style={webNuevoUsuario.containerForm}>
                <View style={webNuevoUsuario.formRow}>
                    <View style={webNuevoUsuario.setLabelInput}>
                        <Text style={webNuevoUsuario.formLabel}>E-mail:</Text>
                        <TextInput
                            style={webNuevoUsuario.input}
                            value={formData.email || ''}
                            onChangeText={(text) => handleInputChange('email', text)}
                        />
                    </View>
                </View>
                <View style={webNuevoUsuario.formRow}>
                    <View style={webNuevoUsuario.setLabelInput}>
                        <Text style={webNuevoUsuario.formLabel}>Nombre:</Text>
                        <TextInput
                            style={webNuevoUsuario.input}
                            value={formData.nombre || ''}
                            onChangeText={(text) => handleInputChange('nombre', text)}
                        />
                    </View>
                    <View style={webNuevoUsuario.setLabelInput}>
                        <Text style={webNuevoUsuario.formLabel}>Apellido:</Text>
                        <TextInput
                            style={webNuevoUsuario.input}
                            value={formData.apellido || ''}
                            onChangeText={(text) => handleInputChange('apellido', text)}
                        />
                    </View>
                </View>
                <View style={webNuevoUsuario.formRow}>
                    <View style={webNuevoUsuario.setLabelInput}>
                        <Text style={webNuevoUsuario.formLabel}>DNI:</Text>
                        <TextInput
                            style={webNuevoUsuario.input}
                            keyboardType="numeric"
                            value={formData.dni || ''}
                            onChangeText={(text) => handleInputChange('dni', text)}
                        />
                    </View>
                    <View style={webNuevoUsuario.setLabelInput}>
                        <Text style={webNuevoUsuario.formLabel}>CUIT/CUIL:</Text>
                        <TextInput
                            style={webNuevoUsuario.input}
                            value={formData.cuit_cuil || ''}
                            onChangeText={(text) => handleInputChange('cuit_cuil', text)}
                        />
                    </View>
                </View>
                <View style={webNuevoUsuario.formRow}>
                    <View style={webNuevoUsuario.setLabelInput}>
                        <Text style={webNuevoUsuario.formLabel}>Sexo:</Text>
                        <TextInput
                            style={webNuevoUsuario.input}
                            value={formData.sexo || ''}
                            onChangeText={(text) => handleInputChange('sexo', text)}
                        />
                    </View>
                    <View style={webNuevoUsuario.setLabelInput}>
                        <Text style={webNuevoUsuario.formLabel}>Fecha de nacimiento:</Text>
                        <View style={commonStyles.row}>
                            <PickerDia value={dia} onChange={setDia} />
                            <PickerMes value={mes} onChange={setMes} />
                            <PickerAnio value={anio} onChange={setAnio} desde={1900} hasta={new Date().getFullYear()} />
                        </View>
                    </View>
                </View>
                {selectedTipoUsuario?.toLowerCase() === 'administrador' && (
                    <View style={[webNuevoUsuario.formRow, { marginTop: 10, justifyContent: 'center', alignItems: 'center' }]}>
                        <Text style={webNuevoUsuario.formLabel}>Es super admin:</Text>
                        <TouchableOpacity
                            style={[webNuevoUsuario.check, { backgroundColor: esSuperAdmin ? '#00A887' : '#fff' }]}
                            onPress={() => setEsSuperAdmin(prev => !prev)}
                        >
                            {esSuperAdmin && (
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>✓</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                )}
                {/* <Text style={commonStyles.label}>Tipo Persona: {selectedTipoUsuario} (ID: {tipoId})</Text> */}
            </View>
        );
    };

    const crearNuevoUsuario = async () => {
        const tipo = selectedTipoUsuario?.toLowerCase();
        const tipoUsuarioId = tiposUsuario.find(t => t.tipo_usuario === selectedTipoUsuario)?.id;
        const fechaNacimiento = `${anio.padStart(2, '0')}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
        
        if (!formData.email) {
            return alert('Por favor completá el e-mail.');
        }

        if (!validarEmail(formData.email)) {
            return alert('Por favor ingresá un e-mail válido.');
        }
                
        if (!formData.nombre) {
            return alert('Por favor completá el nombre.');
        }

        if (tipo === 'escuela') {
            if (!formData.cuit_cuil) {
                return alert('Por favor completá el CUIT/CUIL.');
            }
            if (!selectedTipoInstitucion) {
                return alert('Por favor seleccioná un tipo de institución.');
            }
        } else {
            if (!formData.apellido) {
                return alert('Por favor completá el apellido.');
            }

            if (!formData.dni) {
                return alert('Por favor completá el DNI.');
            }
            if (!esFechaValida(dia, mes, anio)) {
                return alert('Por favor ingresá una fecha de nacimiento válida.');
            }
            if (!formData.cuit_cuil) {
                return alert('Por favor completá el CUIT/CUIL.');
            }
        }

        const esEscuela = selectedTipoUsuario?.toLowerCase() === 'escuela';

        const datosFinales = {
            ...formData,
            ...(esEscuela
            ? {
                id_tipo_usuario: tipoUsuarioId,
                tipo_usuario: selectedTipoUsuario,
                id_tipo_institucion: selectedTipoInstitucion,
            }
            : {
                id_tipo_usuario: tipoUsuarioId,
                id_tipo_persona: tipoUsuarioId,
                tipo_usuario: selectedTipoUsuario,
                fecha_nacimiento: fechaNacimiento,
                is_super_admin: esSuperAdmin ? 1 : 0,
                usuario_creador: user.id
            })
        };

        console.log('📤 Datos enviados al servidor:', datosFinales);
        try {
            const res = await fetch(`${BASE_URL}/usuarios/nuevoFull`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datosFinales), 
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

            window.alert('El usuario fue creado correctamente.');

        }catch (err) {
            console.error('❌ Error registro:', err);
            Alert.alert('Error', 'No se pudo conectar al servidor');
        }
    };

    return (
        <SafeAreaView style={commonStyles.safeArea}>
            <View style={commonStyles.webMainContainer}>
                <View style={commonStyles.webSidebar}>
                    <WebSidebar />
                </View>

                <View style={commonStyles.webContent}>
                    <View style={commonStyles.container}>
                        <Text style={commonStyles.title}>Crear nuevo usuario</Text>
                        <View style={webNuevoUsuario.accentContainer}>
                            {tiposUsuario.length === 0 ? (
                                <ActivityIndicator size="large" />
                            ) : (
                                <>
                                <View style={webNuevoUsuario.row}>
                                    <Text style={webNuevoUsuario.label}>Seleccione el tipo de usuario a crear:</Text>
                                    <Picker
                                        selectedValue={selectedTipoUsuario}
                                        style={webNuevoUsuario.picker}
                                        onValueChange={(itemValue) => {
                                            setSelectedTipoUsuario(itemValue);
                                            setFormData({}); // reset formulario
                                            setSelectedTipoInstitucion(null);
                                            resetFecha();
                                            setInstitucionPorDefecto(itemValue);
                                            setEsSuperAdmin(false);
                                        }}
                                    >
                                    <Picker.Item label="Tipos de usuario" value={null} />
                                        {tiposUsuario.map((tipo) => (
                                            <Picker.Item
                                            key={tipo.id}
                                            label={tipo.tipo_usuario}
                                            value={tipo.tipo_usuario}
                                            />
                                        ))}
                                    </Picker>
                                </View>
                                    {mostrarForm()}
                                <TouchableOpacity 
                                    style={webNuevoUsuario.button}
                                    onPress={crearNuevoUsuario}
                                >
                                    <Text style={webNuevoUsuario.buttonText}>Crear nuevo usuario</Text>
                                </TouchableOpacity>  
                                </>

                            )}
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}