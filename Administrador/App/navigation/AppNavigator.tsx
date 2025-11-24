import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginView from "../screen/auth/login/login.view";
import RegisterView from "../screen/auth/register/register.view";
import HabitacionesView from "../screen/habitaciones/habitacioneslist/habitacionesList.view";
import SelectLocationView from "../screen/habitaciones/crearHabitaciones/selectLocation.view";
import CreatePlaceView from "../screen/habitaciones/crearHabitaciones/crearHabitaciones.view";
import HabitacionDetailView from "../screen/habitaciones/habitacionesDetail/habitacionesDetail.view";
import ReservasListView from "../screen/habitaciones/Ver Reservas/reservas.view";

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Register: undefined;
  Habitaciones: undefined;
  SelectLocation: undefined;
  CreatePlace: { latitude: string; longitude: string };
  HabitacionDetail: { roomId: number };
  ReservasList: { lugarId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginView}
          options={{ title: "Iniciar Sesión" }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterView}
          options={{ title: "Registrarse" }}
        />
        <Stack.Screen
          name="Habitaciones"
          component={HabitacionesView}
          options={{ title: "Habitaciones" }}
        />
        <Stack.Screen
          name="SelectLocation"
          component={SelectLocationView}
          options={{ title: "Seleccionar Ubicación" }}
        />
        <Stack.Screen
          name="CreatePlace"
          component={CreatePlaceView}
          options={{ title: "Crear Lugar" }}
        />
        <Stack.Screen
          name="HabitacionDetail"
          component={HabitacionDetailView}
          options={{ title: "Detalle del Lugar" }}
        />
        <Stack.Screen
          name="ReservasList"
          component={ReservasListView}
          options={{ title: "Reservas" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
