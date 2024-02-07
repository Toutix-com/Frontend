import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiMenu3Fill } from 'react-icons/ri';
import NavLogo from '../../assets/toutix-logo-transparent.png';
import { TERipple } from 'tw-elements-react';
import AuthModal from '../auth/AuthModal';
import { routes } from '../../constants/routes';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative flex flex-col justify-between px-4 py-4 md:flex-row md:px-10 md:py-5">
      <div className="flex items-center justify-between">
        <Link to={routes.home}>
          <img className="object-contain h-10" src={NavLogo} alt="" />
        </Link>
        <button
          className="block md:hidden focus:outline-none"
          onClick={toggleNavbar}
        >
          <RiMenu3Fill />
        </button>
      </div>
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
            <Link className="block px-3 py-2 md:py-0">Contact</Link>
          </TERipple>
          <TERipple>
            <Link className="block px-3 py-2 md:py-0">Event Organizer</Link>
          </TERipple>
          <TERipple>
            <button
              onClick={() => setShowModal(true)}
              className="p-2 px-4 mt-4 font-medium text-white bg-blue-500 rounded-md md:ml-6 md:mt-0"
            >
              Login
            </button>
          </TERipple>
        </ul>
      </nav>
      <AuthModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

export default Navbar;
