import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { getUserId, removeUserId, saveUserId, saveUsername, getUserName } from "../utils/tokenUtilities";
import { login, register } from "../services/login.service";

interface LoginData {
  email: string;
  password: string;
}

const useAuthentication = () => {
  const [userId, setUserId] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Cargar el userId guardado al iniciar
  useEffect(() => {
    loadUserId();
    loadUserName();
  }, []);

  const loadUserId = async () => {
    const savedUserId = await getUserId();
    if (savedUserId) {
      setUserId(savedUserId);
      setIsAuthenticated(true);
    }
  };

  const loadUserName = async () => {
    const savedUserName = await getUserName();
    if (savedUserName) {
      setUsername(savedUserName);
    }
  };

  const validateLogin = async (): Promise<boolean> => {
    const id = await getUserId();
    setIsAuthenticated(!!id);
    return !!id;
  };

  const doLogin = async (loginData: LoginData): Promise<boolean> => {
    try {
      const response: any = await login(loginData);
      if (response) {
        await saveUserId(response.id.toString());
        await saveUsername(response.nombrecompleto);
        setUserId(response.id.toString());
        setUsername(response.nombrecompleto);
        setIsAuthenticated(true);
        Alert.alert("Éxito", "Inicio de sesión exitoso");
        return true;
      }
      Alert.alert("Error", "Respuesta inválida del servidor");
      return false;
    } catch (error: any) {
      console.error("Error en doLogin:", error);
      const errorMsg =
        error.response?.data?.message ||
        "Error al iniciar sesión. Verifica tus credenciales.";
      Alert.alert("Error", errorMsg);
      return false;
    }
  };

  const doLogout = async (): Promise<void> => {
    await removeUserId();
    setUserId("");
    setUsername("");
    setIsAuthenticated(false);
  };

  const doRegister = async (registerData: any): Promise<boolean> => {
    try {
      const response: any = await register(registerData);
      console.log("Response del registro:", response);

      if (response) {
        await saveUserId(response.id.toString());
        await saveUsername(response.nombrecompleto);
        setUserId(response.id.toString());
        setUsername(response.nombrecompleto);
        setIsAuthenticated(true);
        Alert.alert("Éxito", "Registro exitoso");
        return true;
      }
      Alert.alert("Error", "Respuesta inválida del servidor");
      return false;
    } catch (error: any) {
      console.error("Error en doRegister:", error);
      const errorMsg =
        error.response?.data?.message ||
        "Error al registrarse. Verifica tus datos.";
      Alert.alert("Error", errorMsg);
      return false;
    }
  };

  return {
    doLogout,
    doLogin,
    doRegister,
    userId,
    username,
    isAuthenticated,
    validateLogin,
  };
};

export default useAuthentication;
