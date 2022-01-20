const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_FAVORITE':
			return {
				...state,
				myList: [...state.myList, action.payload],
			};

		case 'DELETE_FAVORITE':
			return {
        ...state,
        myList: state.myList.filter((items) => items._id !== action.payload),
			};
    case 'LOGIN_REQUEST':
      return {
        ...state,
        user: action.payload,
      };

    case 'LOGOUT_REQUEST':
      return {
        ...state,
        user: action.payload,
      };

    case 'REGISTER_REQUEST':
      return {
        ...state,
        user: action.payload,
      };

    case 'GET_VIDEO_SOURCE':
      return {
        ...state,
        playing:
          state.documentaries.find((item) => item._id === action.payload) ||
          state.movies.find((item) => item._id === action.payload) ||
          [],
      };
    case 'GET_VIDEO_SEARCH':

      if (action.payload === '') return { ...state, searchResult: [] };

      const listas = [...state.documentaries, ...state.movies];

      return {
        ...state,
        searchResult: listas.filter(item => item.title.toLowerCase().includes(action.payload.toLowerCase())),
      };

    default:
      return state;
  }
};

export default reducer;
