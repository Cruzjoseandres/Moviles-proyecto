import { useState } from "react";
import { Alert } from "react-native";
import { createPlace } from "../../../services/habitaciones.service";
import useAuthentication from "../../../hooks/useAuthentication";

export const useCrearHabitacionesViewModel = (
  latitudParam?: string,
  longitudParam?: string
) => {
  const { userId } = useAuthentication();

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [cantPersonas, setCantPersonas] = useState("");
  const [cantCamas, setCantCamas] = useState("");
  const [cantBanios, setCantBanios] = useState("");
  const [cantHabitaciones, setCantHabitaciones] = useState("");
  const [tieneWifi, setTieneWifi] = useState(true);
  const [cantVehiculosParqueo, setCantVehiculosParqueo] = useState("");
  const [precioNoche, setPrecioNoche] = useState("");
  const [costoLimpieza, setCostoLimpieza] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async (): Promise<boolean> => {
    // Validaciones
    if (!nombre.trim() || !descripcion.trim() || !ciudad.trim()) {
      Alert.alert("Error", "Completa los campos obligatorios");
      return false;
    }

    if (!precioNoche || parseFloat(precioNoche) <= 0) {
      Alert.alert("Error", "Ingresa un precio válido");
      return false;
    }

    if (!userId) {
      Alert.alert("Error", "No se encontró el ID del usuario");
      return false;
    }

    setIsLoading(true);

    const placeData = {
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      cantPersonas: parseInt(cantPersonas) ,
      cantCamas: parseInt(cantCamas) ,
      cantBanios: parseInt(cantBanios) ,
      cantHabitaciones: parseInt(cantHabitaciones) ,
      tieneWifi: tieneWifi ? 1 : 0,
      cantVehiculosParqueo: parseInt(cantVehiculosParqueo) ,
      precioNoche: precioNoche,
      costoLimpieza: costoLimpieza ,
      ciudad: ciudad.trim(),
      latitud: latitudParam ,
      longitud: longitudParam ,
      arrendatario_id: parseInt(userId),
    };

    try {
      await createPlace(placeData);
      Alert.alert("Éxito", "Lugar creado correctamente");
      setIsLoading(false);
      return true;
    } catch (error: any) {
      console.error("Error al crear lugar:", error);
      const errorMsg =
        error.response?.data?.message || "Error al crear el lugar";
      Alert.alert("Error", errorMsg);
      setIsLoading(false);
      return false;
    }
  };

  return {
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
  };
};
