import { useState } from "react";
import useAuthentication from "../../../hooks/useAuthentication";

export const useRegisterViewModel = () => {
  const [nombrecompleto, setNombreCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telefono, setTelefono] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { doRegister } = useAuthentication();

  const handleRegister = async () => {
    if (
      !email.trim() ||
      !password.trim() ||
      !nombrecompleto.trim() ||
      !telefono.trim()
    ) {
      setError("Todos los campos son requeridos");
      return;
    }

    setError("");
    setIsLoading(true);

    const loginData = {
      nombrecompleto: nombrecompleto.trim(),
      email: email.trim(),
      password: password,
      telefono: telefono.trim(),
    };

    const success = await doRegister(loginData);

    setIsLoading(false);

    if (!success) {
      setError("Error al iniciar sesión");
    }
  };

  return {
    nombrecompleto,
    setNombreCompleto,
    email,
    setEmail,
    password,
    setPassword,
    telefono,
    setTelefono,
    error,
    isLoading,
    handleRegister,
  };
};
