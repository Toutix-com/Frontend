import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiMenu3Fill } from 'react-icons/ri';
import NavLogo from '../../assets/toutix-logo-transparent.png';
import { TERipple } from 'tw-elements-react';
import AuthModal from '../auth/AuthModal';
import { routes } from '../../constants/routes';
import UserDropdown from '../user/UserDropdown';
import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAuthModal } from '../../store/auth/authSlice';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthModalOpen } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative flex justify-between px-4 py-4 md:px-10 md:py-5">
      <div className="flex items-center justify-between">
        <Link to={routes.home}>
          <img className="object-contain h-10" src={NavLogo} alt="" />
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <nav
          className={`mt-4 md:mt-0 md:flex md:items-center font-light text-sm md:text-base ${isOpen ? 'block' : 'hidden'}`}
        >
          <ul className="absolute inset-x-0 z-10 flex flex-col px-4 pb-4 bg-white md:items-center md:pb-0 md:flex-row md:relative top-full md:top-0 ">
            <TERipple>
              <Link to={routes.marketplace} className="block px-3 py-2 md:py-0">
                MarketPlace
              </Link>
            </TERipple>

            <TERipple>
              <Link to={routes.createEvent} className="block px-3 py-2 md:py-0">
                Create Event
              </Link>
            </TERipple>
            <TERipple>
              <Link className="block px-3 py-2 md:py-0">Contact</Link>
            </TERipple>
            <TERipple>
              <button
                onClick={() => dispatch(toggleAuthModal(true))}
                className="p-2 px-4 mt-4 font-medium text-white bg-blue-500 rounded-md md:ml-6 md:mt-0"
              >
                Login
              </button>
            </TERipple>
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <UserDropdown />
          <button
            className="block md:hidden focus:outline-none"
            onClick={toggleNavbar}
          >
            {isOpen ? <MdClose /> : <RiMenu3Fill />}
          </button>
        </div>
      </div>

      <AuthModal
        showModal={isAuthModalOpen}
        setShowModal={(value) => dispatch(toggleAuthModal(value))}
        enableClose
      />
    </div>
  );
};

export default Navbar;
