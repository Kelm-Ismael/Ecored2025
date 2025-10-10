import { useState, useEffect, useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { PickerDia, PickerMes, PickerAnio } from '../components/FechaPicker';
import WebSidebar from '../components/WebSidebar';
import { commonStyles, webInformesStyles } from '../styles/styles';
import { AuthContext } from '../context/AuthContext.js';
import { esFechaValida } from '../utils/validaciones/fecha';
import { formatearFecha } from '../utils/formatearFecha';
import { BASE_URL } from '../config/api.js';

export default function WebInformes() {
    const { userRole, authLoading, userToken } = useContext(AuthContext);

    const [diaInicio, setDiaInicio] = useState('1');
    const [mesInicio, setMesInicio] = useState('1');
    const [anioInicio, setAnioInicio] = useState(new Date().getFullYear().toString());

    const [diaFin, setDiaFin] = useState('1');
    const [mesFin, setMesFin] = useState('1');
    const [anioFin, setAnioFin] = useState(new Date().getFullYear().toString());

    const [infoData, setInfoData] = useState(null);
    const [fechaParaInforme, setFechaParaInforme] = useState(null);
    const [errorMensaje, setErrorMensaje] = useState(null);

    useEffect(() => {
        if (!authLoading) {
            const rolesAutorizados = ['superadmin', 'administrador', 'empleado', 'escuela'];
            if (!rolesAutorizados.includes(userRole?.toLowerCase())) {
                navigation.navigate('WebMain');
            }
        }
    }, [authLoading, userRole]);

    useEffect(() => {
        const hoy = new Date();
        setDiaInicio(hoy.getDate().toString());
        setMesInicio((hoy.getMonth() + 1).toString());
        setAnioInicio(hoy.getFullYear().toString());
        setDiaFin(hoy.getDate().toString());
        setMesFin((hoy.getMonth() + 1).toString());
        setAnioFin(hoy.getFullYear().toString());
    }, []);

    const obtenerFecha = (dia, mes, anio) => {
        if (!esFechaValida(dia, mes, anio)) return null;
        return new Date(`${anio}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`);
    };

    const getInformes = async () => {
        const fechaInicio = obtenerFecha(diaInicio, mesInicio, anioInicio);
        const fechaFin = obtenerFecha(diaFin, mesFin, anioFin);

        if (!fechaInicio || !fechaFin) {
            setErrorMensaje('Las fechas ingresadas no son válidas.');
            return;
        }

        if (fechaInicio >= fechaFin) {
            setErrorMensaje('La fecha de inicio no puede ser igual o posterior a la fecha de fin.');
            return;
        }

        const fechas = {
            fecha_inicio: fechaInicio.toISOString(),
            fecha_fin: fechaFin.toISOString()
        };

        try {
            const res = await fetch(`${BASE_URL}/informes/entregasPorFecha`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userToken}`,
                },
                body: JSON.stringify(fechas),
            });

            if (!res.ok) {
                throw new Error('Error al obtener los datos del informe');
            }

            const data = await res.json();
            setInfoData(data);
            setFechaParaInforme(fechas);
            setErrorMensaje(null);
        } catch (err) {
            console.error('❌ Error al obtener informe:', err);
            setErrorMensaje('Ocurrió un error al cargar el informe.');
        }
    };

    const descargarPDF = async () => {
        if (!fechaParaInforme) {
            setErrorMensaje('No hay fechas válidas para generar el PDF.');
            return;
        }

        try {
            const res = await fetch(`${BASE_URL}/informes/entregasPorFechaPDF`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userToken}`,
                },
                body: JSON.stringify(fechaParaInforme),
            });

            if (!res.ok) {
                throw new Error('Error al generar el PDF');
            }

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = '';
            link.click();
            
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error('❌ Error al descargar PDF:', err);
            setErrorMensaje('No se pudo generar el PDF.');
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
                        {/* <Text style={commonStyles.title}>Informes</Text> */}
                        <View style={webInformesStyles.accentContainer}>
                            <Text style={webInformesStyles.title}>Seleccione las fechas para generar el informe de entregas:</Text>

                            <View style={commonStyles.row}>
                                <View style={webInformesStyles.row}>
                                    <View>
                                        <Text style={webInformesStyles.inputText}>Fecha de inicio:</Text>
                                        <View style={commonStyles.row}>
                                            <PickerDia value={diaInicio} onChange={setDiaInicio} />
                                            <PickerMes value={mesInicio} onChange={setMesInicio} />
                                            <PickerAnio value={anioInicio} onChange={setAnioInicio} desde={1900} hasta={new Date().getFullYear()} />
                                        </View>
                                    </View>

                                    <View>
                                        <Text style={webInformesStyles.inputText}>Fecha de fin:</Text>
                                        <View style={commonStyles.row}>
                                            <PickerDia value={diaFin} onChange={setDiaFin} />
                                            <PickerMes value={mesFin} onChange={setMesFin} />
                                            <PickerAnio value={anioFin} onChange={setAnioFin} desde={1900} hasta={new Date().getFullYear()} />
                                        </View>
                                    </View>
                                    <TouchableOpacity 
                                        style={webInformesStyles.button}
                                        onPress={getInformes}
                                        >
                                        <Text style={webInformesStyles.buttonText}>Generar informe</Text>
                                    </TouchableOpacity>                            
                                </View>
                            </View>
                            {errorMensaje && <Text style={webInformesStyles.error}>{errorMensaje}</Text>}
                        </View>

                        {infoData && (
                            <View style={[commonStyles.accentContainerTablas, { marginTop: 15 }]}>
                                {infoData.length > 0 ? (
                                    <ScrollView style={webInformesStyles.scrollContainer}>
                                        <View style={{ flexDirection: 'row', borderBottomWidth: 1, paddingBottom: 5 }}>
                                            <Text style={{ flex: 1, fontWeight: 'bold' }}>ID</Text>
                                            <Text style={{ flex: 2, fontWeight: 'bold' }}>Locación</Text>
                                            <Text style={{ flex: 2, fontWeight: 'bold' }}>Tipo</Text>
                                            <Text style={{ flex: 2, fontWeight: 'bold' }}>Fecha y hora</Text>
                                            <Text style={{ flex: 2, fontWeight: 'bold' }}>Usuario</Text>
                                            <Text style={{ flex: 2, fontWeight: 'bold' }}>Receptor</Text>
                                        </View>

                                        {infoData.map((entrega) => (
                                            <View key={entrega.id} style={webInformesStyles.rowsTabla}>
                                                <Text style={{ flex: 1 }}>{entrega.id}</Text>
                                                <Text style={{ flex: 2 }}>{entrega.locacion}</Text>
                                                <Text style={{ flex: 2 }}>{entrega.tipo}</Text>
                                                <Text style={{ flex: 2 }}>{formatearFecha(entrega.fecha_hora)}</Text>
                                                <Text style={{ flex: 2 }}>{entrega.nombre_usuario}</Text>
                                                <Text style={{ flex: 2 }}>{entrega.nombre_receptor}</Text>
                                            </View>
                                        ))}

                                        <TouchableOpacity onPress={descargarPDF} style={webInformesStyles.button}>
                                            <Text style={webInformesStyles.buttonText}>
                                                Descargar PDF
                                            </Text>
                                        </TouchableOpacity>
                                    </ScrollView>
                                ) : (
                                    <Text style={{ marginTop: 20, alignSelf: 'center' }}>No hay resultados para ese rango de fechas.</Text>
                                )}
                            </View>
                        )}
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
