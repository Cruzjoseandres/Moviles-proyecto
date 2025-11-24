import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/AppNavigator";
import { useRegisterViewModel } from "./register.viewmodel";
import { styles } from "../../../css/style";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const RegisterView: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const {
    nombrecompleto,
    setNombreCompleto,
    email,
    setEmail,
    password,
    setPassword,
    telefono,
    setTelefono,
    isLoading,
    error,
    handleRegister,
  } = useRegisterViewModel();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={styles.title}>Registrarse</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nombre Completo"
            placeholderTextColor="#888"
            value={nombrecompleto}
            onChangeText={setNombreCompleto}
            keyboardType="default"
            autoCapitalize="words"
            autoCorrect={false}
            editable={!isLoading}
          />
        </View>

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
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Teléfono"
            placeholderTextColor="#888"
            value={telefono}
            onChangeText={setTelefono}
            keyboardType="phone-pad"
            autoCapitalize="none"
            autoCorrect={false}
            editable={!isLoading}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Registrarse</Text>
          )}
        </TouchableOpacity>

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.footerText}>
              ¿Ya tienes cuenta? Inicia sesión
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterView;
