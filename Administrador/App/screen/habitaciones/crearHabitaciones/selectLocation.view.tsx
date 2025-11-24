import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Alert,
} from "react-native";
import MapView, { Marker, Region, PROVIDER_GOOGLE } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/AppNavigator";
import * as Location from 'expo-location';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SelectLocationView: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const [selectedLocation, setSelectedLocation] = useState({
    latitude: -17.783333,
    longitude: -63.183333,
  });

  const [region, setRegion] = useState<Region>({
    latitude: -17.783333,
    longitude: -63.183333,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const [isLoadingLocation, setIsLoadingLocation] = useState(true);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Se necesita acceso a la ubicación');
        setIsLoadingLocation(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const currentLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      
      const currentRegion = {
        ...currentLocation,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };

      setSelectedLocation(currentLocation);
      setRegion(currentRegion);
      setIsLoadingLocation(false);
    } catch (error) {
      console.error("Error obteniendo ubicación:", error);
      Alert.alert("Error", "No se pudo obtener la ubicación actual");
      setIsLoadingLocation(false);
    }
  };

  const handleMapPress = (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  };

  const handleConfirm = () => {
    // Navegar al formulario con la ubicación seleccionada
    navigation.navigate("CreatePlace", {
      latitude: selectedLocation.latitude.toString(),
      longitude: selectedLocation.longitude.toString(),
    });
  };

  if (isLoadingLocation) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Obteniendo ubicación actual...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Selecciona la ubicación</Text>
        <Text style={styles.subtitle}>
          Toca en el mapa donde está tu lugar
        </Text>
      </View>

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={setRegion}
        onPress={handleMapPress}
      >
        {selectedLocation && (
          <Marker
            coordinate={selectedLocation}
            title="Tu lugar"
            description="Ubicación seleccionada"
          />
        )}
      </MapView>

      <View style={styles.footer}>
        <View style={styles.coordsContainer}>
          <Text style={styles.coordsText}>
            📍 Lat: {selectedLocation.latitude.toFixed(6)}
          </Text>
          <Text style={styles.coordsText}>
            Lng: {selectedLocation.longitude.toFixed(6)}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirm}
          >
            <Text style={styles.confirmButtonText}>Confirmar ubicación</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
  },
  header: {
    padding: 16,
    backgroundColor: "#007AFF",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.9,
  },
  map: {
    flex: 1,
  },
  footer: {
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  coordsContainer: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  coordsText: {
    fontSize: 14,
    color: "#333",
    marginVertical: 2,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  confirmButton: {
    flex: 2,
    padding: 16,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    alignItems: "center",
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default SelectLocationView;
