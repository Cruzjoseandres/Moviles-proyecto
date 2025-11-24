import React, { useState, useEffect, useCallback } from "react";
import { Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { habitaciones } from "../../../models/habitaciones.models";
import { habitacionesArrendatario,  } from "../../../services/habitaciones.service";
import useAuthentication from "../../../hooks/useAuthentication";

export const useHabitacionesListViewModel = () => {
  const [habitaciones, setHabitaciones] = useState<habitaciones[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { username, userId } = useAuthentication();
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if(userId){
      cargarHabitaciones();
    }
  }, [userId]);

  // Recargar cuando se regresa a esta pantalla
  useFocusEffect(
    useCallback(() => {
      if (userId) {
        cargarHabitaciones();
      }
    }, [userId])
  );

  const cargarHabitaciones = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await habitacionesArrendatario(userId);
      setHabitaciones(data);
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Error al cargar las habitaciones";
      setError(errorMsg);
      Alert.alert("Error", errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const searchHabitaciones = () => {

  };



  const refreshHabitaciones = () => {
    cargarHabitaciones();
  };

  return {
    habitaciones,
    isLoading,
    error,
    refreshHabitaciones,
    getUserName: username || "",
    search,
    setSearch,
  };
};

