import { Reserva } from './../../../models/reservas.models';
import { useState, useEffect } from "react";
import { Alert } from "react-native";
import {
    getReservasByLugar,
} from "../../../services/habitaciones.service";
export const reservasViewModel = (lugarId: number) => {
    const [reservas, setReservas] = useState<Reserva[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        cargarReservas();
    }, [lugarId]);

    const cargarReservas = async () => {
        setIsLoading(true);
        setError("");
        try {
            const data = await getReservasByLugar(lugarId);
            setReservas(data);
        } catch (error: any) {
            const errorMsg = error.response?.data?.message || "Error al cargar las reservas.";
            setError(errorMsg);
            Alert.alert("Error", errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    const calcularNoches = (fechaInicio: string, fechaFin: string): number => {
        const inicio = new Date(fechaInicio);
        const fin = new Date(fechaFin);
        const diffTime = Math.abs(fin.getTime() - inicio.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    return {
        reservas,
        isLoading,
        error,
        cargarReservas,
        calcularNoches,
    };
};
