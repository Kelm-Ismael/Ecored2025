// screens/EcopuntosMapa.js
import React, { useEffect, useState } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { XMLParser } from 'fast-xml-parser'; // npm i fast-xml-parser

const KML_URL = 'https://www.google.com/maps/d/kml?forcekml=1&mid=1vrmWXqSMjCOsJEdCt-RoHVEqYuLznWI';

export default function EcopuntosMapa() {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(KML_URL);
        const text = await res.text();
        const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '' });
        const kml = parser.parse(text);

        // Buscar placemarks (pueden estar en Document/Folder/Placemark…)
        const placemarks = [];
        const walk = (node) => {
          if (!node || typeof node !== 'object') return;
          if (node.Placemark) {
            const arr = Array.isArray(node.Placemark) ? node.Placemark : [node.Placemark];
            for (const pm of arr) {
              const name = pm.name || '';
              const coordsText =
                pm.Point?.coordinates ||
                pm.LineString?.coordinates ||
                null;
              if (coordsText && pm.Point?.coordinates) {
                // KML: "lon,lat,alt"
                const [lon, lat] = String(coordsText).trim().split(/[\s,]+/).map(Number);
                placemarks.push({ name, latitude: lat, longitude: lon });
              }
            }
          }
          for (const v of Object.values(node)) walk(v);
        };
        walk(kml);

        if (!placemarks.length) throw new Error('No se encontraron puntos en el KML');
        setPoints(placemarks);
      } catch (e) {
        Alert.alert('KML', e.message);
      }
    })();
  }, []);

  const region = points.length
    ? { latitude: points[0].latitude, longitude: points[0].longitude, latitudeDelta: 0.08, longitudeDelta: 0.08 }
    : { latitude: -27.3621, longitude: -55.9008, latitudeDelta: 0.08, longitudeDelta: 0.08 }; // fallback Posadas

  return (
    <View style={{ flex: 1 }}>
      <MapView style={styles.map} initialRegion={region}>
        {points.map((p, i) => (
          <Marker key={i} coordinate={{ latitude: p.latitude, longitude: p.longitude }} title={p.name} />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({ map: { flex: 1 } });
