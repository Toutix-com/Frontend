import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  TEDropdown,
  TEDropdownItem,
  TEDropdownMenu,
  TEDropdownToggle,
  TERipple
} from 'tw-elements-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/auth/authSlice';
import { browserStorage } from '../../constants/storage';
import { useCookies } from 'react-cookie';

const UserDropdown = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    browserStorage.accessToken
  ]);
  const { user } = useSelector((state) => state.auth);
  console.log(user, 'user');
  const userID = useMemo(() => user?.userID, [user]);
  const dispatch = useDispatch();
  const handleLogout = () => {
    removeCookie(browserStorage.accessToken, { path: '/' });
    dispatch(logout());
  };
  return (
    <TEDropdown className="flex justify-center">
      <TERipple rippleColor="light">
        <TEDropdownToggle tag="a" className="cursor-pointer">
          <img
            src="https://www.ateamsoftsolutions.com/wp-content/uploads/2020/09/user-dummy.jpg"
            className="object-cover w-10 h-10 border-2 border-white border-opacity-50 rounded-full"
            alt="Avatar"
          />
        </TEDropdownToggle>
      </TERipple>

      <TEDropdownMenu className="mt-6">
        <TEDropdownItem>
          <Link
            to={`/users/${userID}/profile`}
            className="block w-full min-w-[160px] cursor-pointer whitespace-nowrap bg-transparent px-4 py-2 text-sm text-left font-normal pointer-events-auto text-neutral-700 bg-white hover:bg-neutral-100 active:text-neutral-800 active:bg-neutral-100 focus:bg-neutral-100 focus:text-neutral-800 focus:outline-none active:no-underline "
          >
            My Profile
          </Link>
        </TEDropdownItem>
        <TEDropdownItem>
          <Link
            to={`/users/${userID}/tickets`}
            className="block w-full min-w-[160px] cursor-pointer whitespace-nowrap bg-transparent px-4 py-2 text-sm text-left font-normal pointer-events-auto text-neutral-700 bg-white hover:bg-neutral-100 active:text-neutral-800 active:bg-neutral-100 focus:bg-neutral-100 focus:text-neutral-800 focus:outline-none active:no-underline "
          >
            My Tickets
          </Link>
        </TEDropdownItem>

        {/* <TEDropdownItem>
          <Link
            to={`/users/${userID}/events`}
            className="block w-full min-w-[160px] cursor-pointer whitespace-nowrap bg-transparent px-4 py-2 text-sm text-left font-normal pointer-events-auto text-neutral-700 bg-white hover:bg-neutral-100 active:text-neutral-800 active:bg-neutral-100 focus:bg-neutral-100 focus:text-neutral-800 focus:outline-none active:no-underline "
          >
            My Events
          </Link>
        </TEDropdownItem> */}
        <TEDropdownItem>
          <button
            onClick={handleLogout}
            className="block w-full min-w-[160px] cursor-pointer whitespace-nowrap bg-blue-500 text-white px-4 py-2 text-sm text-left font-normal pointer-events-auto  "
          >
            Logout
          </button>
        </TEDropdownItem>
      </TEDropdownMenu>
    </TEDropdown>
  );
};

export default UserDropdown;
