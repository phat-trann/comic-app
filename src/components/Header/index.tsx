import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Follow, Search, Activity, Setting, Notice, Language, User } from '~/icons';
import { useTranslation } from 'react-i18next';
import { Avatar, Badge, Space } from 'antd';

const IconHeader: React.FC<{ icon: JSX.Element; onClick: () => void }> = ({ icon, onClick }) => {
  return (
    <Avatar
      shape="square"
      size="large"
      icon={icon}
      className="flex cursor-pointer items-center justify-center bg-stone-200 text-orange-700"
      onClick={onClick}
    />
  );
};

const Header = () => {
  const { t } = useTranslation();
  const logoName = '/images/logo.png';
  const location = useLocation();
  const [noticeCount, setNoticeCount] = useState(0);
  const navigate = useNavigate();
  const menu = [
    {
      text: t('menu.home'),
      location: '/',
      item: <Home />,
    },
    {
      text: t('menu.follow'),
      location: '/follow',
      item: <Follow />,
    },
    {
      text: t('menu.search'),
      location: '/search',
      item: <Search />,
    },
    {
      text: t('menu.activity'),
      location: '/activity',
      item: <Activity />,
    },
    {
      text: t('menu.setting'),
      location: '/setting',
      item: <Setting />,
    },
  ];
  const onClickSection = (location: string) => {
    // setNoticeCount((current) => current + 1);
    navigate(location);
  };

  return (
    <>
      <div className="z-10 w-full p-4 pb-3 lg:p-5 lg:px-8">
        <div className="flex w-full">
          <div className="flex w-1/3 items-center dark:invert" onClick={() => onClickSection('/')}>
            <img src={logoName} alt="" className="w-32 cursor-pointer" />
          </div>
          <div className="flex w-2/3 justify-end">
            <Space size="large" className="justify-end">
              <Badge count={noticeCount} overflowCount={9}>
                <IconHeader
                  icon={<Notice />}
                  onClick={() => {
                    setNoticeCount(0);
                    navigate('/notice');
                  }}
                />
              </Badge>
              <IconHeader icon={<Language />} onClick={() => navigate('/language')} />
              <IconHeader icon={<User />} onClick={() => navigate('/user')} />
            </Space>
          </div>
        </div>
      </div>
      <div className="z-10 w-full bg-orange-600 px-4 lg:px-8">
        <div className="flex w-full items-center">
          {menu.map((data, index) => (
            <div
              key={index}
              className={`flex w-1/5 cursor-pointer flex-wrap items-center justify-center  py-2 ${
                location.pathname === data.location ? 'bg-stone-100 text-orange-800' : 'text-white'
              }`}
              onClick={() => {
                onClickSection(data.location);
              }}
            >
              <div className="flex w-full justify-center text-center">{data.item}</div>
              <div className="text-xs">{data.text}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;
