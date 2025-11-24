import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { habitaciones } from "../../../models/habitaciones.models";
import { 
  getLugarById, 
  updateLugar, 
  uploadLugarFoto 
} from "../../../services/habitaciones.service";
import * as ImagePicker from 'expo-image-picker';

export const useHabitacionDetailViewModel = (roomId: number, arrendatarioId: string) => {
  const [habitacion, setHabitacion] = useState<habitaciones | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Estados del formulario
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [cantPersonas, setCantPersonas] = useState("");
  const [cantCamas, setCantCamas] = useState("");
  const [cantBanios, setCantBanios] = useState("");
  const [cantHabitaciones, setCantHabitaciones] = useState("");
  const [tieneWifi, setTieneWifi] = useState(false);
  const [cantVehiculosParqueo, setCantVehiculosParqueo] = useState("");
  const [precioNoche, setPrecioNoche] = useState("");
  const [costoLimpieza, setCostoLimpieza] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");
  const [fotos, setFotos] = useState<string[]>([]);

  useEffect(() => {
    cargarDetalle();
  }, [roomId]);

  const cargarDetalle = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await getLugarById(roomId);
      setHabitacion(data);
      
      // Rellenar el formulario con los datos existentes
      setNombre(data.nombre || "");
      setDescripcion(data.descripcion || "");
      setCantPersonas(data.cantPersonas?.toString() || "");
      setCantCamas(data.cantCamas?.toString() || "");
      setCantBanios(data.cantBanios?.toString() || "");
      setCantHabitaciones(data.cantHabitaciones?.toString() || "");
      setTieneWifi(data.tieneWifi === 1);
      setCantVehiculosParqueo(data.cantVehiculosParqueo?.toString() || "");
      setPrecioNoche(data.precioNoche || "");
      setCostoLimpieza(data.costoLimpieza || "");
      setCiudad(data.ciudad || "");
      setLatitud(data.latitud || "");
      setLongitud(data.longitud || "");
      
      if (data.fotos && data.fotos.length > 0) {
        setFotos(data.fotos.map((f: any) => f.url));
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Error al cargar el detalle";
      setError(errorMsg);
      Alert.alert("Error", errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permiso denegado", "Se necesita acceso a la galería");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0].uri) {
      await subirFoto(result.assets[0].uri);
    }
  };

  const subirFoto = async (uri: string) => {
    setIsLoading(true);
    try {
      await uploadLugarFoto(roomId, uri);
      Alert.alert("Éxito", "Foto subida correctamente");
      await cargarDetalle();
    } catch (error: any) {
      Alert.alert("Error", "No se pudo subir la foto");
    } finally {
      setIsLoading(false);
    }
  };

  const actualizarLugar = async () => {
    if (!nombre || !ciudad || !precioNoche) {
      Alert.alert("Error", "Por favor completa los campos requeridos");
      return false;
    }

    setIsLoading(true);
    setError("");

    try {
      const lugarData = {
        nombre,
        descripcion,
        cantPersonas: parseInt(cantPersonas) || 0,
        cantCamas: parseInt(cantCamas) || 0,
        cantBanios: parseInt(cantBanios) || 0,
        cantHabitaciones: parseInt(cantHabitaciones) || 0,
        tieneWifi: tieneWifi ? 1 : 0,
        cantVehiculosParqueo: parseInt(cantVehiculosParqueo) || 0,
        precioNoche,
        costoLimpieza,
        ciudad,
        latitud,
        longitud,
        arrendatario_id: parseInt(arrendatarioId),
      };

      await updateLugar(roomId, lugarData);
      Alert.alert("Éxito", "Lugar actualizado correctamente");
      return true;
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Error al actualizar el lugar";
      setError(errorMsg);
      Alert.alert("Error", errorMsg);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    habitacion,
    isLoading,
    error,
    cargarDetalle,
    pickImage,
    actualizarLugar,
    // Estados del formulario
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
    latitud, setLatitud,
    longitud, setLongitud,
    fotos,
  };
};
