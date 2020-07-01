const initialState = {
  board: [],
  status: false,
  loading: true,
  check: true,
  originalBoard: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_BOARD": {
      return {
        ...state,
        board: action.payload.board,
        loading: false,
        originalBoard: JSON.parse(JSON.stringify(action.payload.board)),
      };
    }
    case "SOLVE_BOARD": {
      return {
        ...state,
        board: action.payload.board,
        check: false,
      };
    }
    case "CLEAR_BOARD": {
      return { ...state, board: [], originalBoard: [], check: true };
    }
    case "VALIDATE_BOARD": {
      return { ...state, status: action.payload.status };
    }
    default:
      return state;
  }
};
