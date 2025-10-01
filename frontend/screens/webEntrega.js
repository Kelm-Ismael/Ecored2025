import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useContext, useEffect, useState } from 'react';

import { commonStyles, colors } from '../styles/styles';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../config/api';
import WebSidebar from '../components/WebSidebar';
import ResiduoPicker from '../components/ResiduoPicker';
import { useNavigation } from '@react-navigation/native';

export default function WebEntrega() {
    const navigation = useNavigation();
    const { userId, userRole, loading, userToken } = useContext(AuthContext);
    
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const [residuoSeleccionado, setResiduoSeleccionado] = useState(null); // { residuo, cantidad, puntos }
    const [cantidad, setCantidad] = useState('');
    
    const [detalleEntrega, setDetalleEntrega] = useState([]);
    const [totalPuntos, setTotalPuntos] = useState(0);

    useEffect(() => {
        if (!loading) {
            const rolesAutorizados = ['superadmin', 'administrador', 'empleado', 'escuela'];
            if (!rolesAutorizados.includes(userRole?.toLowerCase())) {
                navigation.navigate('WebMain');
            }
        }
    }, [loading, userRole]);

    const handleSearch = async () => {
        if (!searchText.trim()) return;

        try {
            const res = await fetch(`${BASE_URL}/usuarios/buscar?q=${searchText}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });

            const data = await res.json();
            setSearchResults(data); // Mostrar lista en <View webEntregaSearchResult>
        } catch (error) {
            console.error('Error al buscar usuario:', error);
        }
    };

    const onCantidadChange = (text) => {
        setCantidad(text);
    };

    const handleAgregarDetalle = () => {
        if (!residuoSeleccionado || typeof residuoSeleccionado.cantidad !== 'number' || residuoSeleccionado.cantidad <= 0) {
            console.warn('Faltan datos para agregar o cantidad invalida');
            return;
        }

        const nuevoDetalle = {
            tipo: residuoSeleccionado.residuo,
            cantidad: residuoSeleccionado.cantidad,
            puntos: residuoSeleccionado.puntos,
        };

        setDetalleEntrega((prev) => [...prev, nuevoDetalle]);
        setTotalPuntos((prev) => prev + nuevoDetalle.puntos);

        // Limpiar campos
        setCantidad('');
        setResiduoSeleccionado(null);
    };

    const handleGenerarQR = () => {
    if (!selectedUser || detalleEntrega.length === 0) {
        console.warn("Faltan datos para generar QR.");
        return;
    }

    const qrPayload = {
        id_receptor: userId, // el usuario que recibe (quien genera el QR)
        id_usuario: selectedUser.id, // el usuario que entrega (quien escanea)
        detalle: detalleEntrega,
        total_puntos: totalPuntos,
        fecha: new Date().toISOString(),
    };

    console.log("📦 Payload QR generado:", qrPayload);

    // Navegar a pantalla con QR (pasando el payload como param)
    navigation.navigate('CodigoQR', { data: JSON.stringify(qrPayload) });
    };

  if (loading) {
    return (
      <SafeAreaView style={commonStyles.safeArea}>
        <View style={commonStyles.container}>
          <Text>Cargando...</Text>
        </View>
      </SafeAreaView>
    );
  }

    return (
        <SafeAreaView style={commonStyles.safeArea}>
            <View style={commonStyles.webMainContainer}>
                <View style={commonStyles.webSidebar}>
                    <WebSidebar />
                </View>
                <View style={commonStyles.webContent}>
                    <View style={commonStyles.webTitleContainer}>
                        <Text style={commonStyles.title}>Nueva entrega</Text>
                    </View>

                    <View style={commonStyles.webEntregaContainer}>
                        
                        <View style={commonStyles.webEntregaSearchContainer}>
                            <View>
                                <Text style={commonStyles.webEntregaSearchTitle}>Usuario:</Text>
                            </View>
                            {/* select de busqueda (cliente por apellido) */}
                            <View style={commonStyles.webEntregaSearchBar}>
                                <TextInput 
                                    style={commonStyles.webEntregaInput}
                                    placeholder="Ingrese apellido, DNI o Email"
                                    value={searchText}
                                    onChangeText={setSearchText}
                                />
                            </View>
                            <TouchableOpacity
                                style={commonStyles.webEntregaSearchIcon}
                                onPress={() => {
                                handleSearch();
                                console.log('Iniciando busqueda...');
                                }}
                            >
                                <Ionicons name="search" size={22} color={colors.secondary} />
                            </TouchableOpacity>
                        </View>
                        <View style={commonStyles.webEntregaSearchResult}>
                            {searchResults.length === 0 ? (
                                <Text style={{fontSize: 18}}>Sin resultados</Text>
                            ) : (
                                searchResults.map((user) => (
                                <View
                                    key={user.id}
                                    style={commonStyles.webEntregaSearchResultUser}
                                >
                                    <View>

                                    <Text style={{fontSize: 18}}>{user.nombre} {user.apellido} ({user.tipo_usuario}) | DNI: {user.dni}</Text>
                                    <Text style={{ fontSize: 12, color: '#666' }}>{user.email}</Text>
                                    </View>
                                    
                                    <TouchableOpacity
                                    style={commonStyles.webEntregaSearchSeleccionarButton}
                                    onPress={() => {
                                        console.log("Usuario seleccionado:", user);
                                        setSelectedUser(user);
                                    }}
                                    >
                                    <Text style={commonStyles.webEntregaSearchSeleccionarButtonText}>Seleccionar</Text>
                                    </TouchableOpacity>
                                </View>
                                ))
                            )}
                            {selectedUser && (
                                <View style={{ marginVertical: 10, padding: 10, backgroundColor: '#f0f0f0', borderRadius: 8 }}>
                                    <Text style={{ fontWeight: 'bold' }}>Usuario seleccionado:</Text>
                                    <Text>{selectedUser.nombre} {selectedUser.apellido} ({selectedUser.tipo_usuario}) | DNI: {selectedUser.dni}</Text>
                                </View>
                            )}
                        </View>
                        <View style={commonStyles.webEntregaResumen}>
                            <View style={commonStyles.webEntregaInput}>
                                <View style={commonStyles.webEntregaTipo}>
                                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>Tipo</Text>
                                    <ResiduoPicker
                                        cantidad={cantidad}
                                        onPuntosCalculados={(puntos) => {
                                            // console.log('Puntos obtenidos:', puntos);
                                        }}
                                        onChange={(data) => {
                                            // console.log('data obtenida:', data);
                                            setResiduoSeleccionado(data);
                                        }}

                                    />
                                </View>
                                <View style={commonStyles.webEntregaCantidad}>
                                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>Cantidad</Text>
                                    <TextInput
                                            keyboardType="numeric"
                                            value={cantidad}
                                            onChangeText={(text) => {
                                                // console.log('cantidad: ', text);
                                                onCantidadChange(text);
                                            }}
                                            style={commonStyles.webEntregaCantidadInput}
                                          />
                                </View>
                                <View style={commonStyles.webEntregaAgregarButton}>
                                    <TouchableOpacity style={commonStyles.webEntregaSearchIcon} onPress={handleAgregarDetalle}>
                                        <Ionicons name="add" size={18} color={colors.secondary} />
                                    </TouchableOpacity>
                                </View>
                            </View>                         

                            <View style={commonStyles.webEntregaResumenDivisor} />
                            <View style={commonStyles.webEntregaResumenDetalle}>
                                {detalleEntrega.length === 0 ? (
                                    <Text style={{ color: 'gray' }}>No hay ítems aún</Text>
                                ) : (
                                    detalleEntrega.map((item, index) => (
                                    <View key={index} style={commonStyles.webEntregaResumenItem}>
                                        <Text>{item.tipo.nombre} ({item.tipo.unidad}) - Cant: {item.cantidad}</Text>
                                        <Text>Subtotal: {item.puntos.toFixed(2)} pts</Text>
                                    </View>
                                    ))
                                )}
                            </View>
                            <View style={commonStyles.webEntregaResumenDivisor} />
                            <View style={commonStyles.webEntregaTotales}>
                                <Text style={commonStyles.webEntregaSearchTitle}>Total puntos a obtener:</Text>
                                <Text>{totalPuntos} pts</Text>
                                <TouchableOpacity
                                    style={commonStyles.webEntregaSearchIcon}
                                    onPress={() => {
                                        console.log('detalle entrega: ', detalleEntrega);
                                        console.log('Generar QR...');
                                        handleGenerarQR();
                                    }}
                                >
                                    <Text style={commonStyles.webEntregaQRButtonText}>Generar QR</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}