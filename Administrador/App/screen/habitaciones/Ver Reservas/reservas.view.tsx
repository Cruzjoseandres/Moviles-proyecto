import React from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StatusBar,
  Image,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/AppNavigator";
import { styles as globalStyles } from "../../../css/style";
import { reservasViewModel } from "./reservas.viewmodel";
import { Reserva } from "../../../models/reservas.models";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type ReservasListRouteProp = RouteProp<RootStackParamList, "ReservasList">;

const ReservasListView: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ReservasListRouteProp>();
  const { lugarId } = route.params;

  const {
    reservas,
    isLoading,
    error,
    cargarReservas,
    calcularNoches,
  } = reservasViewModel(lugarId);

  const formatearFecha = (fecha: string) => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const renderReservaItem = ({ item }: { item: Reserva }) => {
    const noches = calcularNoches(item.fechaInicio, item.fechaFin);
    
    return (
      <View style={styles.card}>
        {item.lugar?.fotos && item.lugar.fotos.length > 0 && (
          <Image
            source={{ uri: item.lugar.fotos[0].url }}
            style={styles.image}
            resizeMode="cover"
          />
        )}

        <View style={styles.infoContainer}>
          <Text style={styles.clientName}>
            👤 {item.cliente.nombrecompleto}
          </Text>

          <View style={styles.dateContainer}>
            <Text style={styles.label}>Llegada:</Text>
            <Text style={styles.dateText}>{formatearFecha(item.fechaInicio)}</Text>
          </View>

          <View style={styles.dateContainer}>
            <Text style={styles.label}>Salida:</Text>
            <Text style={styles.dateText}>{formatearFecha(item.fechaFin)}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.nightsText}>🌙 {noches} noches</Text>
            <Text style={styles.priceText}>${item.precioTotal}</Text>
          </View>

          <View style={styles.pricesContainer}>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Noches:</Text>
              <Text style={styles.priceValue}>${item.precioNoches}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Limpieza:</Text>
              <Text style={styles.priceValue}>${item.precioLimpieza}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Servicio:</Text>
              <Text style={styles.priceValue}>${item.precioServicio}</Text>
            </View>
          </View>

          <View style={styles.contactContainer}>
            <Text style={styles.contactText}>📧 {item.cliente.email}</Text>
            <Text style={styles.contactText}>📱 {item.cliente.telefono}</Text>
          </View>
        </View>
      </View>
    );
  };

  if (isLoading && reservas.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Cargando reservas...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={globalStyles.title}>Reservas del Lugar</Text>

        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        <FlatList
          data={reservas}
          renderItem={renderReservaItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={cargarReservas}
              colors={["#007AFF"]}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No hay reservas para este lugar
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
  },
  infoContainer: {
    padding: 16,
  },
  clientName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginRight: 8,
    width: 60,
  },
  dateText: {
    fontSize: 14,
    color: "#333",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  nightsText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
  },
  priceText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#007AFF",
  },
  pricesContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  priceLabel: {
    fontSize: 14,
    color: "#666",
  },
  priceValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  contactContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  contactText: {
    fontSize: 13,
    color: "#666",
    marginBottom: 4,
  },
  errorContainer: {
    padding: 16,
    backgroundColor: "#ffebee",
    margin: 16,
    borderRadius: 8,
  },
  errorText: {
    color: "#c62828",
    fontSize: 14,
    textAlign: "center",
  },
  emptyContainer: {
    padding: 32,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },
});

export default ReservasListView;
