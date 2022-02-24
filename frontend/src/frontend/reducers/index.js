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
        myList: state.myList.filter(items => items._id !== action.payload),
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
          state.drama.find(item => item._id === action.payload)
          || state.animation.find(item => item._id === action.payload)
          || state.scienceFiction.find(item => item._id === action.payload)
          ||[],
      };
    case 'GET_VIDEO_SEARCH':

      if (action.payload === '') return { ...state, searchResult: [] };

      const listas = [...state.drama, ...state.animation,...state.scienceFiction];

      return {
        ...state,
        searchResult: listas.filter(item => item.title.toLowerCase().includes(action.payload.toLowerCase())),
      };

    default:
      return state;
  }
};

export default reducer;
