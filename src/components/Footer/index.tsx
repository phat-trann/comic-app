import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '~/context/AppContext';

const Footer = () => {
  const logoName = '/images/logo.png';
  const { t } = useTranslation();
  const { resetHomepage, currentPage } = useContext(AppContext);
  const navigate = useNavigate();
  const onClickSection = (location: string) => {
    if (location === '/') resetHomepage(currentPage);
    navigate(location);
  };

  return (
    <div className="border-t-8 border-orange-600 bg-white">
      <div className="flex flex-wrap p-4">
        <div className="flex w-full py-2">
          <div className="flex w-1/3 items-center dark:invert" onClick={() => onClickSection('/')}>
            <img src={logoName} alt="" className="w-32 cursor-pointer" />
          </div>
        </div>
        <div className="w-full">
          {t('info.company')} &#169; {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
};

export default Footer;
