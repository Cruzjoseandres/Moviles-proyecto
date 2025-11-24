import React from "react";
import { StatusBar } from "expo-status-bar";
import AppNavigator from "./App/navigation/AppNavigator";

export default function App() {
  console.log("App montado correctamente");
  return (
    <>
      <AppNavigator />
      <StatusBar style="auto" />
    </>
  );
}
