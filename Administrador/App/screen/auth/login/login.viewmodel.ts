import { useState } from "react";
import useAuthentication from "../../../hooks/useAuthentication";

export const useLoginViewModel = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { doLogin } = useAuthentication();

  const handleLogin = async (): Promise<boolean> => {
    if (!email.trim() || !password.trim()) {
      setError("Todos los campos son requeridos");
      return false;
    }

    setError("");
    setIsLoading(true);

    const loginData = {
      email: email.trim(),
      password: password,
    };

    const success = await doLogin(loginData);
    setIsLoading(false);

    if (!success) {
      setError("Error al iniciar sesión");
      return false;
    }

    return true;
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLoading,
    handleLogin,
  };
};
