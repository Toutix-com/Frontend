import React, { useMemo, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { RiMenu3Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { TERipple } from 'tw-elements-react';
import NavLogo from '../../assets/toutix-logo-transparent.png';
import { routes } from '../../constants/routes';
import { toggleAuthModal } from '../../store/auth/authSlice';
import AuthModal from '../auth/AuthModal';
import UserDropdown from '../user/UserDropdown';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthModalOpen, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const isNavbarTransparent = useMemo(() => {
    return [routes.home, routes.marketplace, routes.login].includes(pathname);
  }, [pathname]);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={` ${isNavbarTransparent ? 'absolute top-0 inset-x-0 bg-transparent  z-50 text-white ' : 'relative bg-gray-200 shadow-md '}   w-full px-4 py-4 md:px-10 md:py-5`}
    >
      <div className="flex justify-between w-full max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <Link to={routes.home}>
            <img
              className={`object-contain h-10 drop-shadow-md ${!isNavbarTransparent && 'invert'} `}
              src={NavLogo}
              alt=""
            />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <nav
            className={`mt-4 md:mt-0 md:flex md:items-center font-light text-sm md:text-base ${isOpen ? 'block' : 'hidden'}`}
          >
            <ul className="absolute inset-x-0 z-10 flex flex-col px-4 pb-4  md:items-center md:pb-0 md:flex-row md:relative top-full md:top-0 ">
              <TERipple>
                <Link
                  to={routes.marketplace}
                  className={`block px-3 py-2 md:py-0 font-medium hover:font-semibold ${pathname === routes.marketplace ? 'underline' : 'hover:underline '} underline-offset-4`}
                >
                  MarketPlace
                </Link>
              </TERipple>

              <TERipple>
                <Link
                  to="#"
                  className={`block px-3 py-2 md:py-0 font-medium hover:font-semibold ${pathname === routes.aboutUs ? 'underline' : 'hover:underline '} underline-offset-4`}
                >
                  About Us
                </Link>
              </TERipple>
              <TERipple>
                <Link
                  to="#"
                  className={`block px-3 py-2 md:py-0 font-medium hover:font-semibold ${pathname === routes.contact ? 'underline' : 'hover:underline '} underline-offset-4`}
                >
                  Contact
                </Link>
              </TERipple>
              {!user && (
                <TERipple>
                  <button
                    onClick={() => dispatch(toggleAuthModal(true))}
                    className="p-2 px-4 mt-4 font-medium text-white bg-blue-500 rounded-md md:ml-6 md:mt-0"
                  >
                    Login
                  </button>
                </TERipple>
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            {user && <UserDropdown />}

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
    </div>
  );
};

export default Navbar;
