import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import BoardComponent from "./components/BoardComponent";
import { Provider } from "react-redux";
import store from "./store";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Board from "./screens/Board";
import Home from "./screens/Home";
import Finish from "./screens/Finish";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      {/* <View style={styles.container}>
        <Text style={{ marginTop: "10%", fontSize: 16, color: "black" }}>
          SUGOKU ORION FOX
        </Text>
        <BoardComponent />
      </View> */}
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "aliceblue",
            },
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={Home}
            // options={{
            //   title: "Welcome to the Jungle",
            //   headerTintColor: "red",
            // }}
          />
          <Stack.Screen
            name="Board"
            component={Board}
            options={{ headerLeft: null }}
          />
          <Stack.Screen
            name="Finish"
            component={Finish}
            options={{ headerLeft: null }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
