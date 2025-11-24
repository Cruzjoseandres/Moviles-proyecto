import {Arrendatario} from "./arrendatario.models";
import {fotos} from "./fotos.models";

export interface habitaciones {
    "id": number,
    "nombre": string,
    "descripcion": string,
    "cantPersonas": number,
    "cantCamas": number,
    "cantBanios": number,
    "cantHabitaciones": number,
    "tieneWifi": number,
    "cantVehiculosParqueo": number,
    "precioNoche": string,
    "costoLimpieza": string,
    "ciudad": string,
    "latitud": string,
    "longitud": string,
    "arrendatario_id": Arrendatario,
    "fotos": fotos[];
}

