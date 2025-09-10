// screens/MapaKML.js
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Asset } from 'expo-asset';
import { DOMParser } from 'xmldom';
import { kml } from '@mapbox/togeojson';

export default function MapaKML() {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const loadKML = async () => {
      try {
        const asset = Asset.fromModule(require('../assets/ecopuntos.kml'));
        await asset.downloadAsync();
        const response = await fetch(asset.localUri || asset.uri);
        const kmlText = await response.text();

        const dom = new DOMParser().parseFromString(kmlText, 'text/xml');
        const geojson = kml(dom);

        const puntos = geojson.features
          .filter(f => f.geometry.type === 'Point')
          .map((f, idx) => ({
            id: idx,
            name: f.properties.name || 'Ecopunto',
            coords: {
              latitude: f.geometry.coordinates[1],
              longitude: f.geometry.coordinates[0],
            },
          }));

        setMarkers(puntos);
      } catch (err) {
        console.error('Error cargando KML:', err);
      }
    };

    loadKML();
  }, []);

  if (!markers.length) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: markers[0].coords.latitude,
        longitude: markers[0].coords.longitude,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      }}
    >
      {markers.map(m => (
        <Marker key={m.id} coordinate={m.coords} title={m.name} />
      ))}
    </MapView>
  );
}
