import axios from 'axios';

export const setFavorite = (payload) => ({
  type: 'SET_FAVORITE',
  payload,
});

export const deleteFavorite = payload => ({
  type: 'DELETE_FAVORITE',
  payload,
});

export const loginRequest = payload => ({
  type: 'LOGIN_REQUEST',
  payload,
});

export const logoutRequest = payload => ({
  type: 'LOGOUT_REQUEST',
  payload,
});

export const registerRequest = payload => ({
  type: 'REGISTER_REQUEST',
  payload,
});

export const getVideoSource = payload => ({
  type: 'GET_VIDEO_SOURCE',
  payload,
});
export const getVideoSearch = payload => ({
  type: 'GET_VIDEO_SEARCH',
  payload,
});

export const setError = payload => ({
  type: 'SET_ERROR',
  payload,
});



export const favoriteMovie = (userId, movie) => (dispatch) => {
  const userMovie = {
    userId,
    movieId : movie._id ,
  };
  axios.post('/user-movies', userMovie).then(({data}) => {
    if(data.message === 'user movie created'){
      dispatch(setFavorite(movie))
    }
    }).catch(error => dispatch(setError(error)))
};


export const deleteMovie = (userMovieId) => (dispatch) => {

  axios.delete(`/user-movies/${userMovieId}`)
    .then(({ status }) => {
      if (status === 200) {
        dispatch(deleteFavorite(userMovieId));
      }
    })
    .catch((err) => dispatch(setError(err)));
};

export const registerUser = (payload, redirectUrl) => {
  return (dispatch) => {
    axios.post('/auth/sign-up', payload)
      .then(({ data }) => dispatch(registerRequest(data)))
      .then(() => {
        window.location.href = redirectUrl
      })
      .catch(error => dispatch(setError(error)))
  };
};

export const loginUser = ({ email, password }, redirectUrl) => {
  return (dispatch) => {
    axios({
      url: '/auth/sign-in/',
      method: 'post',
      auth: {
        username: email,
        password
      },
    })
      .then(({ data }) => {
        document.cookie = `email=${data.user.email}`;
        document.cookie = `name=${data.user.name}`;
        document.cookie = `id=${data.user.id}`;
        dispatch(loginRequest(data.user));
      })
      .then(() => {
        window.location.href = redirectUrl;
      })
      .catch(err => dispatch(setError(err)));
  }
};

export { setFavorite as default }