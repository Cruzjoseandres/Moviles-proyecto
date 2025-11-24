import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/AppNavigator";
import { useHabitacionesListViewModel } from "./habitacionesList.viewmodel";
import { habitaciones } from "../../../models/habitaciones.models";
import { styles as globalStyles, styles } from "../../../css/style"; // Renombrado para evitar conflicto
import { habitacionesStyles, COLORS } from "../../../css/habitacionesStyle"; // Importamos el nuevo estilo


type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HabitacionesView: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { habitaciones, isLoading, error, refreshHabitaciones, getUserName, search, setSearch } = useHabitacionesListViewModel();

  const renderRoomItem = ({ item }: { item: habitaciones }) => (
    <TouchableOpacity
      style={habitacionesStyles.card}
      onPress={() => {
        navigation.navigate("HabitacionDetail", { roomId: item.id });
      }}
    >
      {item.fotos && item.fotos.length > 0 && (
        <Image
          source={{ uri: item.fotos[0].url }}
          style={{
            width: "100%",
            height: 200,
            borderRadius: 12,
            marginBottom: 12,
          }}
          resizeMode="cover"
        />
      )}

      <Text style={habitacionesStyles.cardTitle}>{item.nombre || ""}</Text>

      {item.descripcion && (
        <Text style={habitacionesStyles.cardDescription}>{item.descripcion || ""}</Text>
      )}

      <View style={habitacionesStyles.rowBetween}>
        <Text style={habitacionesStyles.priceText}>
          ${item.precioNoche || 0} / noche
        </Text>
        {item.cantPersonas && (
          <Text style={habitacionesStyles.metaText}>
            Capacidad: {item.cantPersonas || 0} personas
          </Text>
        )}
      </View>

      {item.ciudad && (
        <Text style={habitacionesStyles.locationText}>
          📍 {item.ciudad || ""}
        </Text>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={habitacionesStyles.container}>

        <View style={habitacionesStyles.header}>
          <Text style={habitacionesStyles.headerTitle}>
            Bienvenido {getUserName || "Usuario"}
          </Text>
        </View>

        {isLoading && habitaciones.length === 0 ? (
          <View style={habitacionesStyles.centeredView}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={[habitacionesStyles.metaText, { marginTop: 16 }]}>
              Cargando habitaciones...
            </Text>
          </View>
        ) : error ? (
          <View style={habitacionesStyles.centeredView}>
            <Text style={habitacionesStyles.errorText}>{error}</Text>
            <TouchableOpacity
              style={habitacionesStyles.retryButton}
              onPress={refreshHabitaciones}
            >
              <Text style={habitacionesStyles.retryButtonText}>Reintentar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={habitaciones}
            renderItem={renderRoomItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingVertical: 8 }}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={refreshHabitaciones}
                colors={[COLORS.primary]}
              />
            }
            ListEmptyComponent={
              <View style={habitacionesStyles.centeredView}>
                <Text style={habitacionesStyles.metaText}>
                  No hay habitaciones disponibles
                </Text>
              </View>
            }
          />
        )}

        <TouchableOpacity
          style={habitacionesStyles.fab}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("SelectLocation")}
        >
          <Text style={habitacionesStyles.fabText}>+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HabitacionesView;