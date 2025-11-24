import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/AppNavigator";
import { useLoginViewModel } from "./login.viewmodel";
import { styles } from "../../../css/style";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const LoginView: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    error,
    handleLogin,
  } = useLoginViewModel();

  const onLoginPress = async () => {
    const success = await handleLogin();
    if (success) {
      navigation.navigate("Habitaciones");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={styles.title}>Iniciar Sesión</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Correo Electrónico"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            editable={!isLoading}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#888"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!isLoading}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={onLoginPress}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Ingresar</Text>
          )}
        </TouchableOpacity>

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.footerText}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginView;
