export interface Reserva {
  id: number;
  fechaInicio: string;
  fechaFin: string;
  precioTotal: string;
  precioLimpieza: string;
  precioNoches: string;
  precioServicio: string;
  created_at: string;
  updated_at: string;
  cliente: {
    id: number;
    nombrecompleto: string;
    email: string;
    telefono: string;
  };
  lugar?: {
    id: number;
    nombre: string;
    fotos?: Array<{
      id: number;
      url: string;
    }>;
  };
}
