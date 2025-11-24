import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Switch,
  Image,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/AppNavigator";
import { useHabitacionDetailViewModel } from "./habitacionesDetail.viewmodel";
import { styles as globalStyles } from "../../../css/style";
import useAuthentication from "../../../hooks/useAuthentication";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type HabitacionDetailRouteProp = RouteProp<RootStackParamList, "HabitacionDetail">;

const HabitacionesDetailView: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<HabitacionDetailRouteProp>();
  const { userId } = useAuthentication();
  const { roomId } = route.params;

  const {
    habitacion,
    isLoading,
    error,
    pickImage,
    actualizarLugar,
    nombre, setNombre,
    descripcion, setDescripcion,
    cantPersonas, setCantPersonas,
    cantCamas, setCantCamas,
    cantBanios, setCantBanios,
    cantHabitaciones, setCantHabitaciones,
    tieneWifi, setTieneWifi,
    cantVehiculosParqueo, setCantVehiculosParqueo,
    precioNoche, setPrecioNoche,
    costoLimpieza, setCostoLimpieza,
    ciudad, setCiudad,
    fotos,
  } = useHabitacionDetailViewModel(roomId, userId || "");

  const handleActualizar = async () => {
    const success = await actualizarLugar();
    if (success) {
      navigation.goBack();
    }
  };

  const handleVerReservas = () => {
    navigation.navigate("ReservasList", { lugarId: roomId });
  };

  if (isLoading && !habitacion) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={{ flex: 1 }}>
        <View style={globalStyles.container}>
          <Text style={globalStyles.title}>Detalle del Lugar</Text>

          {/* Fotos */}
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.label}>Fotos del lugar:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 10 }}>
              {fotos.map((foto, index) => (
                <Image
                  key={index}
                  source={{ uri: foto }}
                  style={{ width: 120, height: 120, borderRadius: 8, marginRight: 10 }}
                />
              ))}
            </ScrollView>
            <TouchableOpacity
              style={globalStyles.button}
              onPress={pickImage}
              disabled={isLoading}
            >
              <Text style={globalStyles.buttonText}>Agregar Foto</Text>
            </TouchableOpacity>
          </View>

          {/* Nombre */}
          <Text style={styles.label}>Nombre del lugar:</Text>
          <View style={globalStyles.inputContainer}>
            <TextInput
              style={globalStyles.input}
              placeholder="Nombre del lugar"
              value={nombre}
              onChangeText={setNombre}
              editable={!isLoading}
            />
          </View>

          {/* Descripción */}
          <Text style={styles.label}>Descripción:</Text>
          <View style={globalStyles.inputContainer}>
            <TextInput
              style={[globalStyles.input, { height: 80 }]}
              placeholder="Descripción"
              value={descripcion}
              onChangeText={setDescripcion}
              multiline
              numberOfLines={4}
              editable={!isLoading}
            />
          </View>

          {/* Ciudad */}
          <Text style={styles.label}>Ciudad:</Text>
          <View style={globalStyles.inputContainer}>
            <TextInput
              style={globalStyles.input}
              placeholder="Ciudad"
              value={ciudad}
              onChangeText={setCiudad}
              editable={!isLoading}
            />
          </View>

          {/* Cantidad de personas */}
          <Text style={styles.label}>Cantidad de personas:</Text>
          <View style={globalStyles.inputContainer}>
            <TextInput
              style={globalStyles.input}
              placeholder="Cantidad de personas"
              value={cantPersonas}
              onChangeText={setCantPersonas}
              keyboardType="numeric"
              editable={!isLoading}
            />
          </View>

          {/* Cantidad de camas */}
          <Text style={styles.label}>Cantidad de camas:</Text>
          <View style={globalStyles.inputContainer}>
            <TextInput
              style={globalStyles.input}
              placeholder="Cantidad de camas"
              value={cantCamas}
              onChangeText={setCantCamas}
              keyboardType="numeric"
              editable={!isLoading}
            />
          </View>

          {/* Cantidad de baños */}
            <Text style={styles.label}>Cantidad de baños:</Text>
          <View style={globalStyles.inputContainer}>
            <TextInput
              style={globalStyles.input}
              placeholder="Cantidad de baños"
              value={cantBanios}
              onChangeText={setCantBanios}
              keyboardType="numeric"
              editable={!isLoading}
            />
          </View>

          {/* Cantidad de habitaciones */}
          <Text style={styles.label}>Cantidad de habitaciones:</Text>
          <View style={globalStyles.inputContainer}>
            <TextInput
              style={globalStyles.input}
              placeholder="Cantidad de habitaciones"
              value={cantHabitaciones}
              onChangeText={setCantHabitaciones}
              keyboardType="numeric"
              editable={!isLoading}
            />
          </View>

          {/* Parqueo */}
          <Text style={styles.label}>Parqueo:</Text>
          <View style={globalStyles.inputContainer}>
            <TextInput
              style={globalStyles.input}
              placeholder="Vehículos para parqueo"
              value={cantVehiculosParqueo}
              onChangeText={setCantVehiculosParqueo}
              keyboardType="numeric"
              editable={!isLoading}
            />
          </View>

          {/* Precio por noche */}
          <Text style={styles.label}>Precio por noche:</Text>
          <View style={globalStyles.inputContainer}>
            <TextInput
              style={globalStyles.input}
              placeholder="Precio por noche"
              value={precioNoche}
              onChangeText={setPrecioNoche}
              keyboardType="decimal-pad"
              editable={!isLoading}
            />
          </View>

          {/* Costo de limpieza */}
            <Text style={styles.label}>Costo de limpieza:</Text>
          <View style={globalStyles.inputContainer}>
            <TextInput
              style={globalStyles.input}
              placeholder="Costo de limpieza"
              value={costoLimpieza}
              onChangeText={setCostoLimpieza}
              keyboardType="decimal-pad"
              editable={!isLoading}
            />
          </View>

          {/* Wi-Fi */}
          <Text style={styles.label}>Wi-Fi:</Text>
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 12,
            paddingHorizontal: 16,
            backgroundColor: "#fff",
            borderRadius: 12,
            marginBottom: 15,
          }}>
            <Text style={{ fontSize: 16, color: "#333" }}>¿Tiene WiFi?</Text>
            <Switch
              value={tieneWifi}
              onValueChange={setTieneWifi}
              disabled={isLoading}
            />
          </View>

          {error ? <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text> : null}

          <TouchableOpacity
            style={globalStyles.button}
            onPress={handleActualizar}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={globalStyles.buttonText}>Actualizar Lugar</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[globalStyles.button, { backgroundColor: "#4CAF50", marginTop: 10 }]}
            onPress={handleVerReservas}
            disabled={isLoading}
          >
            <Text style={globalStyles.buttonText}>Ver Reservas</Text>
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
});

export default HabitacionesDetailView;
