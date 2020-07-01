import React from "react";
import {
  View,
  Button,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  Image,
} from "react-native";
import styles from "../styles";
import { clearBoard } from "../store/actions/actionBoard";
import { useSelector, useDispatch } from "react-redux";

export default function Finish({ navigation, route }) {
  const { board, check } = useSelector((state) => state.boardReducer);

  console.log(check);
  const { username, time, status } = route.params;
  // console.log(time);
  const dispatch = useDispatch();
  function buttonOnPress() {
    navigation.navigate("Home");
    dispatch(clearBoard());
  }

  if (check) {
    <View style={styles.container}>
      <Text>Loading ...</Text>
    </View>;
  }
  return (
    <View style={styles.container}>
      {status ? (
        <View style={styles.container}>
          <Image
            source={require("../assets/sudoku.jpg")}
            style={styleBoard.img}
          />
          <Text>Congratss {username},</Text>
          <Text>You successfully solved the sudoku in {time} seconds</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <Text> Try your best next time {username}</Text>
          <Text>Sudoku's Answer</Text>
          {board.map((row, indexI) => {
            return (
              <View key={indexI} style={{ flexDirection: "row" }}>
                {row.map((col, indexJ) => {
                  return (
                    <View key={indexJ}>
                      {col == 0 ? (
                        <TextInput
                          style={styleBoard.colx}
                          keyboardType="number-pad"
                          maxLength={1}
                          onChangeText={(content) =>
                            dataBoard(content, indexI, indexJ)
                          }
                        />
                      ) : (
                        <TextInput
                          style={styleBoard.col}
                          maxLength={1}
                          value={String(col)}
                          onChangeText={(content) =>
                            dataBoard(content, indexI, indexJ)
                          }
                        />
                      )}
                    </View>
                  );
                })}
              </View>
            );
          })}
        </View>
      )}
      <TouchableOpacity style={styles.button} onPress={buttonOnPress}>
        <Text>Play Again</Text>
      </TouchableOpacity>
    </View>
  );
}

const styleBoard = StyleSheet.create({
  col: {
    width: (Dimensions.get("window").width - 50) / 9,
    height: (Dimensions.get("window").width - 50) / 9,
    // width: 50,
    // height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    backgroundColor: "lightblue",
  },
  colx: {
    width: (Dimensions.get("window").width - 50) / 9,
    height: (Dimensions.get("window").width - 50) / 9,
    // width: 50,
    // height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  img: {
    width: 180,
    height: 180,
    marginBottom: 15,
  },
});
