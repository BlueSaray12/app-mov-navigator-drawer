import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/Config";
import WelcomeScreen from "./WelcomeScreen";

export default function LoginScreen({ navigation }: any) {
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  function login() {
    signInWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        console.log("Credenciales Correctas");
        setCorreo("");
        setContrasenia("");
        navigation.navigate("Drawer_Welcome");

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Acceso Denegado");
        Alert.alert("Error, en las credenciales");
        console.log(errorCode);
        console.log(errorMessage);

        switch (errorCode) {
          case "auth/missing-password":
            Alert.alert("Error", "No puede ingresar una contraseña en blanco");
            break;
        
          case "auth/wrong-password":
            Alert.alert("Error", "Error de las credenciales");
            break;
        
          default:
            Alert.alert("Error", "Comuníquese con el administrador");
            break;
        }
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="Ingrese su email"
        onChangeText={(texto) => setCorreo(texto)}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingrese su contraseña"
        onChangeText={(texto) => setContrasenia(texto)}
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.button} onPress={() => login()}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.registerText}
        onPress={() => navigation.navigate("Registro")}
      >
        <Text style={styles.registerLink}>¿No tienes una cuenta? Regístrate aquí</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F06292",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "#333333",
  },
  input: {
    height: 40,
    borderColor: "#cccccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    width: "100%",
  },
  button: {
    backgroundColor: "#FFE57F",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#880E4F",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerText: {
    marginTop: 20,
  },
  registerLink: {
    color: "#212121",
    fontSize: 16,
    fontWeight: "bold",
  },
});

