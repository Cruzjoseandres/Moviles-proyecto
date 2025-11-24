import { StyleSheet } from "react-native";

export const COLORS = {
  primary: "#FF5A5F",
  textGray: "#888",
  bgLight: "#f5f5f5",
  white: "#fff",
};

export const habitacionesStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgLight,
  },
  // Estilo reutilizable para Carga, Error y Lista Vacía
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    padding: 16,
    paddingTop: 40,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  // Tarjeta de habitación
  card: {
    backgroundColor: COLORS.white,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    // Sombras
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardDescription: {
    color: "#666",
    marginBottom: 8,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  priceText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: "600",
  },

  metaText: {
    color: COLORS.textGray,
  },
  locationText: {
    color: COLORS.textGray,
    marginTop: 4,
  },
  // Botones y Errores
  errorText: {
    color: "#F44336",
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: COLORS.white,
    fontWeight: "600",
  },



  fab: {
    position: "absolute",
    bottom: 20, // Distancia desde abajo
    right: 20,  // Distancia desde la derecha
    backgroundColor: COLORS.primary,
    width: 56,
    height: 56,
    borderRadius: 28, // La mitad del ancho para hacerlo circular
    justifyContent: "center",
    alignItems: "center",
    // Sombra alta para que parezca flotar
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 999, // Asegura que esté encima de todo
  },
  fabText: {
    fontSize: 30,
    color: COLORS.white,
    lineHeight: 30, // Ayuda a centrar verticalmente símbolos como el +
    fontWeight: "bold",
  },
});