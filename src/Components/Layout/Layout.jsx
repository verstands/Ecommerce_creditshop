import React, { useEffect, useState } from 'react';
import { FaEnvelope, FaRegBell, FaSearch, FaUser, FaUserCircle } from 'react-icons/fa';
import Sidebar from '../Sidebar/Sidebar';
import Otbar from '../Otbar/Otbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {windowWidth > 640 ? (
        <div className="flex">
          <div className="md:basis-[20%] md:h-[100vh] sticky top-0">
            <Sidebar />
          </div>
          <div className="md:basis-[80%] border">
            <div className="sticky top-0">
              <Otbar />
            </div>
            <Outlet />
          </div>
        </div>
      ) : (
        <div className='basis-[100%] h-[100vh]'>
          <Otbar />
          <Outlet />
        </div>
      )}
    </>
  );
};

export default Layout;