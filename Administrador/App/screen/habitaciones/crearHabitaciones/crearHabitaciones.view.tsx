import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  Switch,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/AppNavigator";

import { styles } from "../../../css/style";
import { useCrearHabitacionesViewModel } from "./crearHabitaciones.viewmodel";


type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const crearHabitacionesView: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const params = route.params as { latitude: string; longitude: string } | undefined;

  const {
    nombre,
    setNombre,
    descripcion,
    setDescripcion,
    cantPersonas,
    setCantPersonas,
    cantCamas,
    setCantCamas,
    cantBanios,
    setCantBanios,
    cantHabitaciones,
    setCantHabitaciones,
    tieneWifi,
    setTieneWifi,
    cantVehiculosParqueo,
    setCantVehiculosParqueo,
    precioNoche,
    setPrecioNoche,
    costoLimpieza,
    setCostoLimpieza,
    ciudad,
    setCiudad,
    isLoading,
    handleCreate,
  } = useCrearHabitacionesViewModel(params?.latitude, params?.longitude);

  const onCreatePress = async () => {
    const success = await handleCreate();
    if (success) {
      navigation.navigate("Habitaciones");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Crear Lugar</Text>

          <Text style={{ fontSize: 12, color: "#666", marginBottom: 16 }}>
            📍 {params?.latitude || ""}, {params?.longitude || ""}
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Nombre del lugar"
              value={nombre}
              onChangeText={setNombre}
              editable={!isLoading}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="Descripción"
              value={descripcion}
              onChangeText={setDescripcion}
              multiline
              numberOfLines={3}
              editable={!isLoading}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Ciudad"
              value={ciudad}
              onChangeText={setCiudad}
              editable={!isLoading}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Personas (máx)"
              value={cantPersonas}
              onChangeText={setCantPersonas}
              keyboardType="numeric"
              editable={!isLoading}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Camas"
              value={cantCamas}
              onChangeText={setCantCamas}
              keyboardType="numeric"
              editable={!isLoading}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Baños"
              value={cantBanios}
              onChangeText={setCantBanios}
              keyboardType="numeric"
              editable={!isLoading}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Habitaciones"
              value={cantHabitaciones}
              onChangeText={setCantHabitaciones}
              keyboardType="numeric"
              editable={!isLoading}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Vehículos para parqueo"
              value={cantVehiculosParqueo}
              onChangeText={setCantVehiculosParqueo}
              keyboardType="numeric"
              editable={!isLoading}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Precio por noche"
              value={precioNoche}
              onChangeText={setPrecioNoche}
              keyboardType="decimal-pad"
              editable={!isLoading}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Costo de limpieza"
              value={costoLimpieza}
              onChangeText={setCostoLimpieza}
              keyboardType="decimal-pad"
              editable={!isLoading}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: 12,
              paddingHorizontal: 16,
              backgroundColor: "#fff",
              borderRadius: 12,
              marginBottom: 15,
            }}
          >
            <Text style={{ fontSize: 16, color: "#333" }}>¿Tiene WiFi?</Text>
            <Switch
              value={tieneWifi}
              onValueChange={setTieneWifi}
              disabled={isLoading}
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={onCreatePress}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Crear Lugar</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#f5f5f5", marginTop: 8 }]}
            onPress={() => navigation.goBack()}
            disabled={isLoading}
          >
            <Text style={[styles.buttonText, { color: "#666" }]}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default crearHabitacionesView;
