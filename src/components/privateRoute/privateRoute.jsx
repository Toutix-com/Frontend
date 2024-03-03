import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { routes } from '../../constants/routes';

const PrivateRoute = ({ component: Component, ...props }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      {!user ? (
        <Navigate
          to={{ pathname: routes.login, state: { from: props.location } }}
          replace
        />
      ) : (
        <Component {...props} />
      )}
    </>
  );
};

export default PrivateRoute;
