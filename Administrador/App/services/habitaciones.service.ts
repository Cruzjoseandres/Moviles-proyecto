import axios from "axios";
import { habitaciones } from "../models/habitaciones.models";
import { Reserva } from "../models/reservas.models";

const API_URL = "https://airbnbmob2.site/api";

export const habitacionesArrendatario = (id: string): Promise<habitaciones[]> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}/lugares/arrendatario/${id}`)
      .then((response) => {
        resolve(response.data);
        console.log("entra a habitacionesArrendatario");
      })
      .catch((error) => {
        console.error("Error fetching rooms:", error);
        reject(error);
      });
  });
};

export const fetchRoomById = (id: string): Promise<habitaciones> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}/habitaciones/${id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error("Error fetching room by id:", error);
        reject(error);
      });
  });
};

export const createRoom = (roomData: any): Promise<habitaciones> => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/habitaciones`, roomData)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error("Error creating room:", error);
        reject(error);
      });
  });
};

export const updateRoom = (id: string, roomData: any): Promise<habitaciones> => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${API_URL}/habitaciones/${id}`, roomData)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error("Error updating room:", error);
        reject(error);
      });
  });
};

export const deleteRoom = (id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${API_URL}/habitaciones/${id}`)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        console.error("Error deleting room:", error);
        reject(error);
      });
  });
};

export const createPlace = (placeData: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/lugares`, placeData)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error("Error creating place:", error);
        reject(error);
      });
  });
};

export const getLugarById = (id: number): Promise<habitaciones> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}/lugares/${id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error("Error fetching lugar by id:", error);
        reject(error);
      });
  });
};

export const updateLugar = (id: number, lugarData: any): Promise<habitaciones> => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${API_URL}/lugares/${id}`, lugarData)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error("Error updating lugar:", error);
        reject(error);
      });
  });
};

export const uploadLugarFoto = (id: number, photoUri: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    const uniqueName = `photo_${timestamp}_${random}.jpg`;
    
    // @ts-ignore
    formData.append('foto', {
      uri: photoUri,
      type: 'image/jpeg',
      name: uniqueName,
    });

    axios
      .post(`${API_URL}/lugares/${id}/foto`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error("Error uploading foto:", error);
        reject(error);
      });
  });
};

export const getReservasByLugar = (lugarId: number): Promise<Reserva[]> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}/reservas/lugar/${lugarId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reservas:", error);
        reject(error);
      });
  });
};

