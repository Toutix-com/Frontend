import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../constants/routes';

const ErrorPage = () => {
  return (
    <div className="grid min-h-screen bg-gray-100 place-items-center ">
      <h1 className="text-4xl font-semibold text-gray-600"> 404 not found</h1>
      <Link to={routes.home} className="p-3 text-white bg-blue-500 rounded-md ">
        Home
      </Link>
    </div>
  );
};

export default ErrorPage;
