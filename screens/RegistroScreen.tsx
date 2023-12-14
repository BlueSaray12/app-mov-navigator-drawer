import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/Config";
import { signOut } from "firebase/auth";

export default function RegistroScreen({ navigation }: any) {
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  function registro() {
    createUserWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Usuario Registrado");
        navigation.navigate("Login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
  
        switch (errorCode) {
          case "auth/email-already-in-use":
            Alert.alert("La dirección de correo ya esta siendo utilizada");
            break;
          case "auth/invalid-email":
            Alert.alert("La dirección de correo no es válida");
            break;
          default:
            Alert.alert("Mensaje", "Error al registrarse");
        }
      });
  }
  

  function logout() {
    signOut(auth)
      .then(() => {
        console.log("Cerrar Sesión");
        navigation.navigate("Login");
        setCorreo(""); 
        setContrasenia("");
      })
      .catch((error) => {
        console.error("Error al cerrar sesión", error);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>REGISTRO</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese Correo"
        onChangeText={(texto) => setCorreo(texto)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Ingrese Contraseña"
        onChangeText={(texto) => setContrasenia(texto)}
        value={contrasenia}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={() => registro()}>
        <Text style={styles.buttonText}>Registro</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={() => logout()}>
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
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
    backgroundColor: "#FFEBEE",
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
    backgroundColor: "#E1BEE7",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  logoutButton: {
    backgroundColor: "#BBDEFB",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
