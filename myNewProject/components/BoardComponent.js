import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

import { useSelector, useDispatch } from "react-redux";
import {
  getBoardByLevel,
  solvedBoard,
  clearBoard,
} from "../store/actions/actionBoard";

export default function BoardComponent() {
  const dispatch = useDispatch();
  const { board } = useSelector((state) => state.boardReducer);
  // console.log(board);

  const generateBoard = (level) => {
    dispatch(clearBoard());
    dispatch(getBoardByLevel(level));
  };

  const dataBoard = (data, indexI, indexJ) => {
    board[indexI][indexJ] = Number(data);
  };

  const solveSudoku = (level) => {
    dispatch(solvedBoard(board));
  };

  return (
    <View style={styles.container}>
      {board.map((row, indexI) => {
        return (
          <View key={indexI} style={{ flexDirection: "row" }}>
            {row.map((col, indexJ) => {
              return (
                <View key={indexJ}>
                  {col == 0 ? (
                    <TextInput
                      style={styles.colx}
                      keyboardType="numeric"
                      maxLength={1}
                      onChangeText={(content) =>
                        dataBoard(content, indexI, indexJ)
                      }
                    />
                  ) : (
                    <TextInput
                      style={styles.col}
                      maxLength={1}
                      value={col}
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

      <View style={styles.alternativeLayoutButtonContainer}>
        <Text>Generate Board Level : </Text>
        <Button
          color="#841584"
          onPress={() => generateBoard("easy")}
          title="Easy"
        ></Button>
        <Button
          color="#841584"
          onPress={() => generateBoard("medium")}
          title="Medium"
        ></Button>
        <Button
          color="#841584"
          onPress={() => generateBoard("hard")}
          title="Hard"
        ></Button>
      </View>
      <Button
        color="#841584"
        onPress={() => solveSudoku()}
        title="Solve"
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: "#7a42f4",
    borderWidth: 1,
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  col: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    backgroundColor: "gray",
  },
  colx: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
});
