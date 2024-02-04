import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiMenu3Fill } from 'react-icons/ri';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative flex flex-col justify-between px-4 py-4 md:flex-row md:px-10 md:py-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl italic font-bold text-gray-800">TouTix</h1>
        <button
          className="block md:hidden focus:outline-none"
          onClick={toggleNavbar}
        >
          <RiMenu3Fill />
        </button>
      </div>
      <nav
        className={`mt-4 md:mt-0 md:flex md:items-center ${isOpen ? 'block' : 'hidden'}`}
      >
        <ul className="absolute inset-x-0 z-10 flex flex-col pb-4 bg-white md:pb-0 md:flex-row md:relative top-full md:top-0 ">
          <li>
            <Link className="block px-4 py-2 md:py-0">MarketPlace</Link>
          </li>
          <li>
            <Link className="block px-4 py-2 md:py-0">Contact</Link>
          </li>
          <li>
            <Link className="block px-4 py-2 md:py-0">Event Organizer</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
