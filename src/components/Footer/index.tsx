import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const logoName = '/images/logo.png';
  const { t } = useTranslation();

  return (
    <div className="border-t-8 border-orange-600 bg-stone-100">
      <div className="flex flex-wrap p-4">
        <div className="flex w-full py-2">
          <div className="flex w-1/3 items-center">
            <img src={logoName} alt="" className="w-32" />
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
