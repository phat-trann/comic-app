import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Home from '~/icons/Home';
import Activity from '~/icons/Activity';
import Follow from '~/icons/Follow';
import Search from '~/icons/Search';
import Setting from '~/icons/Setting';

const MobileMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menu = [
    {
      text: 'Home',
      location: '/',
      item: <Home />,
    },
    {
      text: 'Follow',
      location: '/follow',
      item: <Follow />,
    },
    {
      text: 'Search',
      location: '/search',
      item: <Search />,
    },
    {
      text: 'Activity',
      location: '/activity',
      item: <Activity />,
    },
    {
      text: 'Setting',
      location: '/setting',
      item: <Setting />,
    },
  ];

  return (
    <div className="z-10 w-full bg-orange-600 px-4">
      <div className="flex w-full items-center">
        {menu.map((data) => (
          <div
            className={`flex w-1/5 flex-wrap items-center justify-center  py-2 ${
              location.pathname === data.location ? 'bg-white text-orange-800' : 'text-white'
            }`}
            onClick={() => navigate(data.location)}
          >
            <div className="flex w-full justify-center text-center">{data.item}</div>
            <div className="text-xs">{data.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Header = () => {
  const [logoName, setLogoName] = useState('/images/logo-black.png');
  const navigate = useNavigate();

  return (
    <>
      <div className="z-10 w-full p-2 px-4">
        <div className="flex w-full items-center justify-center">
          <div className="w-1/3" onClick={() => navigate('/')}>
            <img src={logoName} alt="" />
          </div>
        </div>
      </div>
      <MobileMenu />
    </>
  );
};

export default Header;
