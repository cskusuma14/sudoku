const apiURL = "https://sugoku.herokuapp.com";

export function getBoardByLevel(level) {
  return (dispatch) => {
    fetch(`${apiURL}/board?difficulty=${level}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        dispatch({
          type: "SET_BOARD",
          payload: { board: data.board },
        });
      });
  };
}

export function clearBoard() {
  return (dispatch) => {
    dispatch({
      type: "CLEAR_BOARD",
      payload: { board: [], originalBoard: [] },
    });
  };
}

export function solvedBoard(board) {
  const data = {};
  data.board = board;

  return (dispatch) => {
    fetch(`${apiURL}/solve`, {
      method: "POST",
      body: encodeParams(data),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => res.json())
      .then((resData) => {
        // console.log(data);
        dispatch({
          type: "SOLVE_BOARD",
          payload: { board: resData.solution },
        });
      });
  };
}

export function validateBoard(board) {
  const data = {};
  data.board = board;

  return (dispatch) => {
    fetch(`${apiURL}/validate`, {
      method: "POST",
      body: encodeParams(data),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log(resData);
        dispatch({
          type: "VALIDATE_BOARD",
          payload: { status: resData.status },
        });
      });
  };
}

const encodeBoard = (board) =>
  board.reduce(
    (result, row, i) =>
      result +
      `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? "" : "%2C"}`,
    ""
  );

const encodeParams = (params) =>
  Object.keys(params)
    .map((key) => key + "=" + `%5B${encodeBoard(params[key])}%5D`)
    .join("&");
