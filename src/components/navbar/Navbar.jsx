import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiMenu3Fill } from 'react-icons/ri';
import NavLogo from '../../assets/toutix-logo-transparent.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative flex flex-col justify-between px-4 py-4 md:flex-row md:px-10 md:py-5">
      <div className="flex items-center justify-between">
        <img className="object-contain h-10" src={NavLogo} alt="" />
        <button
          className="block md:hidden focus:outline-none"
          onClick={toggleNavbar}
        >
          <RiMenu3Fill />
        </button>
      </div>
      <nav
        className={`mt-4 md:mt-0 md:flex md:items-center font-light text-base ${isOpen ? 'block' : 'hidden'}`}
      >
        <ul className="absolute inset-x-0 z-10 flex flex-col pb-4 bg-white md:pb-0 md:flex-row md:relative top-full md:top-0 ">
          <li>
            <Link className="block px-3 py-2 md:py-0">MarketPlace</Link>
          </li>
          <li>
            <Link className="block px-3 py-2 md:py-0">Contact</Link>
          </li>
          <li>
            <Link className="block px-3 py-2 md:py-0">Event Organizer</Link>
          </li>
        </ul>
        <button className="p-2 px-4 ml-6 font-semibold text-white bg-blue-500 rounded-sm">
          Login
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
