import { Button, StyleSheet, Text, View, Image } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/Config";

export default function GeneralScreen() {

  const [imagen, setImage] = useState('');

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
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
      <Text style={styles.title}>Cargar una imagen desde la cámara</Text>
      <Button title='Cámara' onPress={() => pickImage()} color="#8E24AA" />
      {imagen && <Image source={{ uri: imagen }} style={styles.image} />}
      <Button title="Subir" onPress={() => subir("foto2")} color="#1DE9B6" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8C9EFF',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
  },
  image: {
    width: '80%',
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
});
