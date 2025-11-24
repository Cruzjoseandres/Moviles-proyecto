import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_ID_KEY = "@airbnb_user_id";
const USER_NAME_KEY = "@airbnb_username";

export const saveUserId = async (userId: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(USER_ID_KEY, userId);
  } catch (error) {
    console.error("Error al guardar el user ID:", error);
  }
};

export const saveUsername = async (username: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(USER_NAME_KEY, username);
  } catch (error) {
    console.error("Error al guardar el username:", error);
  }
}


export const getUserId = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(USER_ID_KEY);
  } catch (error) {
    console.error("Error al obtener el user ID:", error);
    return null;
  }
};


export const getUserName = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(USER_NAME_KEY);
  } catch (error) {
    console.error("Error al obtener el nombre:", error);
    return null;
  }
};

export const removeUserId = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(USER_ID_KEY);
  } catch (error) {
    console.error("Error al eliminar el user ID:", error);
  }
};


export const saveAccessToken = saveUserId;
export const getAccessToken = getUserId;
export const removeAccessToken = removeUserId;
