import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Toolkit = ({ logoName, className, divRef }: any) => (
  <div className={'z-10 w-full bg-yellow-500 p-2 px-4 ' + className} ref={divRef}>
    <div className="flex w-full items-center">
      <div className="w-1/3">
        <img src={logoName} alt="" />
      </div>
    </div>
  </div>
);

const Header = () => {
  const [logoName, setLogoName] = useState('/images/logo-white.png');
  const [toolkitBottom, setToolkitBottom] = useState(false);
  const toolkitTop = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') {
      const handleScroll = () => {
        const toolkitTopData = toolkitTop.current?.getBoundingClientRect();
        setToolkitBottom(
          !!(
            toolkitTopData?.y &&
            toolkitTopData?.height &&
            toolkitTopData?.y + toolkitTopData?.height <= 0
          ),
        );
      };

      window.addEventListener('scroll', handleScroll);

      handleScroll();

      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      setToolkitBottom(false);
    }
  }, [location]);

  return (
    <>
      <div className="z-10 w-full p-2 px-4">
        <div className="flex w-full items-center justify-center">
          <div className="w-1/3" onClick={() => navigate('/')}>
            <img src={'/images/logo-black.png'} alt="" />
          </div>
        </div>
      </div>
      <Toolkit logoName={logoName} divRef={toolkitTop} />

      <Toolkit
        logoName={logoName}
        className={
          'fixed bottom-0 w-full transition-all duration-300' +
          (toolkitBottom ? ' bottom-0' : ' -bottom-12')
        }
      />
    </>
  );
};

export default Header;
