import React from 'react';
import { useDispatch } from 'react-redux';
import AuthModal from '../../components/auth/AuthModal';
import { toggleAuthModal } from '../../store/auth/authSlice';

const LoginPage = () => {
  const dispatch = useDispatch();

  return (
    <div className="grid w-full h-screen p-4 bg-center bg-no-repeat bg-cover md:p-10 lg:p-20 place-items-center bg-home-bg-banner">
      <AuthModal
        showModal={true}
        setShowModal={(value) => dispatch(toggleAuthModal(value))}
      />
    </div>
  );
};

export default LoginPage;
