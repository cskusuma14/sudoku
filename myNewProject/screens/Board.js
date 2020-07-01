import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import LottieView from "lottie-react-native";
import styles from "../styles";
import { useSelector, useDispatch } from "react-redux";
import {
  getBoardByLevel,
  solvedBoard,
  clearBoard,
  validateBoard,
} from "../store/actions/actionBoard";

const apiURL = "https://sugoku.herokuapp.com";

const formatNumber = (number) => `0${number}`.slice(-2);

const getRemaining = (time) => {
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;
  return { mins: formatNumber(mins), secs: formatNumber(secs) };
};

export default function Board({ navigation, route }) {
  const [remainingSecs, setRemainingSecs] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const { mins, secs } = getRemaining(remainingSecs);

  const toggle = () => {
    setIsActive(!isActive);
  };
  const { username } = route.params;
  const dispatch = useDispatch();
  const { board, loading, originalBoard } = useSelector(
    (state) => state.boardReducer
  );

  const [statusSolved, setStatusSolved] = useState(false);

  const generateBoard = (level) => {
    setRemainingSecs(0);
    setIsActive(false);
    dispatch(clearBoard());
    dispatch(getBoardByLevel(level));
    setStatusSolved(true);
    setIsActive(true);
  };
  //   const tempBoard = JSON.parse(JSON.stringify(board));

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setRemainingSecs((remainingSecs) => remainingSecs + 1);
      }, 1000);
    } else if (!isActive && remainingSecs !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, remainingSecs]);

  const dataBoard = (data, indexI, indexJ) => {
    board[indexI][indexJ] = Number(data);
    Keyboard.dismiss();
  };

  const solveSudoku = () => {
    dispatch(solvedBoard(originalBoard));
    navigation.navigate("Finish", {
      username: username,
      time: 0,
      status: false,
    });
  };

  const validateSudoku = () => {
    console.log(originalBoard);
    console.log(board);
    const encodeBoard = (board) =>
      board.reduce(
        (result, row, i) =>
          result +
          `%5B${encodeURIComponent(row)}%5D${
            i === board.length - 1 ? "" : "%2C"
          }`,
        ""
      );

    const encodeParams = (params) =>
      Object.keys(params)
        .map((key) => key + "=" + `%5B${encodeBoard(params[key])}%5D`)
        .join("&");

    const data = {};
    data.board = board;

    fetch(`${apiURL}/validate`, {
      method: "POST",
      body: encodeParams(data),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.status == "solved") {
          toggle();
          dispatch(clearBoard());
          navigation.navigate("Finish", {
            username: username,
            time: remainingSecs,
            status: true,
          });
        } else {
          Alert.alert("Try Again", "Try your best");
        }
      });
  };

  function buttonOnPress() {
    navigation.navigate("Finish");
  }

  return (
    <View style={styles.container}>
      <Text>Try Your Best {username}</Text>
      <Text style={styles.timerText}>{`${mins}:${secs}`}</Text>
      {!loading ? (
        originalBoard.map((row, indexI) => {
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
        })
      ) : (
        <Text>Choose your level board.. </Text>
      )}

      <View style={styleBoard.alternativeLayoutButtonContainer}>
        {/* <Text>Generate Board Level : </Text> */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => generateBoard("easy")}
        >
          <Text>Easy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => generateBoard("medium")}
        >
          <Text>Medium</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => generateBoard("hard")}
        >
          <Text>Hard</Text>
        </TouchableOpacity>
      </View>
      {statusSolved && (
        <View style={styleBoard.alternativeLayoutButtonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => solveSudoku()}>
            <Text>Solve</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => validateSudoku()}
          >
            <Text>Validate</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styleBoard = StyleSheet.create({
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
});
