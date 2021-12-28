import Home from '../containers/Home';
import Login from '../containers/Login';
import Register from '../containers/Register';
import NotFound from '../containers/NotFound';
import Player from '../containers/Player';

const routes = (isLogged) => {
  return [
    {
      path: '/',
      exact: true,
      component: isLogged ? Home : Login,
    },
    {
      path: '/player/:id',
      exact: true,
      component: isLogged ? Player : Login,
    },
    {
      path: '/login',
      exact: true,
      component: Login,
    },
    {
      path: '/register',
      exact: true,
      component: Register,
    },
    {
      name: 'NotFound',
      component: NotFound,
    },
  ]
}

export default routes;


