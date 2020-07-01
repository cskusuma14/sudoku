import React, { useState } from "react";
import {
  View,
  Button,
  Text,
  Alert,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import styles from "../styles";

export default function Home({ navigation }) {
  const [text, setText] = useState("");
  function buttonOnPress() {
    navigation.navigate("Board", {
      username: text,
    });
  }

  return (
    <View style={styleHome.container}>
      <Image source={require("../assets/sudoku.jpg")} style={styleHome.img} />
      <Text style={styleHome.title}>Sudoku OrionFox</Text>
      <TextInput
        placeholder="Input Username"
        placeholderTextColor="black"
        style={{
          padding: 4,
          borderWidth: 2,
          borderColor: "black",
          width: "80%",
        }}
        onChangeText={(text) => setText(text)}
        value={text}
      ></TextInput>
      {text != "" && (
        <TouchableOpacity style={styles.button} onPress={buttonOnPress}>
          <Text>Start</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styleHome = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#18394C",
  },
  button: {
    alignItems: "center",
    backgroundColor: "gray",
    padding: 10,
    margin: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    color: "white",
  },
  img: {
    width: 180,
    height: 180,
    marginBottom: 15,
  },
});
