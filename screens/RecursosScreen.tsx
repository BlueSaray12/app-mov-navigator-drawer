import { StyleSheet, Text, View, Button, Image } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/Config";

export default function RecursosScreen() {
  const [imagen, setImagen] = useState("");

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      aspect: [16, 9],
    });

    if (!result.canceled) {
      console.log(result);
      setImagen(result.assets[0].uri);
    } else {
      alert("No seleccionaste ninguna imagen.");
    }
  };

  async function subir(nombre: string) {
    const storageRef = ref(storage, "test/" + nombre);

    try {
      const response = await fetch(imagen);
      const blob = await response.blob();

      await uploadBytes(storageRef, blob, { contentType: "image/jpg" });
      console.log("La imagen se subió con éxito");

      const imageURL = await getDownloadURL(storageRef);
      console.log("URL de descarga de la imagen", imageURL);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Galería de Imágenes</Text>
      <Button title="Seleccionar Imagen" onPress={() => pickImageAsync()} color="#F9A825" />
      {imagen && <Image source={{ uri: imagen }} style={styles.image} />}
      <Button title="Subir" onPress={() => subir("foto1")} color="#CCFF90" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FCE4EC",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2c3e50",
  },
  image: {
    width: "80%",
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
});