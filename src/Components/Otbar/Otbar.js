import React, { useEffect, useState } from 'react';
import {
  FaSearch,
  FaRegBell,
  FaEnvelope,
  FaUserCircle,
  FaBars,
  FaSignOutAlt,
  FaUser,
  FaMoneyBill,
  FaCreditCard,
  FaShoppingCart,
  FaTachometerAlt,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getPanierCount } from '../../Apis/PanierApi';
import { getProfil } from '../../Apis/Profile';

const Otbar = () => {
  const [open, setOpen] = useState(false);
  const [openBtnDwn, setOpenBtnDwn] = useState(false);
  const [panier, setPanier] = useState([]);
  const [nombreProduits, setNombreProduits] = useState(0);
  const [sommeTotale, setSommeTotale] = useState(0);
  const [profil, setProfil] = useState({ client_prenom: '', client_nom: '' });
  let token = `Bearer ${localStorage.getItem("token")}`;
  
  const showDropDown = () => {
    setOpen(!open);
  };

  const showBtnDropDown = () => {
    setOpenBtnDwn(!openBtnDwn);
  };

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('panier'));
    if (savedCart) {
      setPanier(savedCart);
      setNombreProduits(savedCart.length);

      const total = savedCart.reduce((acc, item) => acc + item.total, 0);
      setSommeTotale(total);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('panier', JSON.stringify(panier));
    setNombreProduits(panier.length);
    const total = panier.reduce((acc, item) => acc + item.total, 0);
    setSommeTotale(total);
  }, [panier]);

  useEffect(() => {
    getProfil()
      .then((membre) => {
        setProfil(membre);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className='flex items-center justify-between h-[70px] shadow-lg px-[25px]'>

        {
          window.innerWidth > 640 && (
            <div className='flex items-center rounded-[5px]'>
              <div className='bg-red-500 h-8 w-8 flex justify-center rounded gap-[20px]'>
                <button>
                  <FaBars />
                </button>
              </div>
            </div>
          )
        }
        <div className='flex items-center gap-[15px] relative'>
          <div className='flex items-center border-r-[1px] pr-[25px] gap-[25px]'>
            <FaEnvelope size={30} />
            <div className='flex items-center'>
              <Link to='/detailpanier'>
                <FaShoppingCart size={30} className='mr-2' />
              </Link>
              <Link to='/detailpanier'>
                <span className='bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs'>
                  {nombreProduits}
                </span>
              </Link>
            </div>
          </div>
          <div className='flex items-center gap-[15px] relative' onClick={showDropDown}>
            {token.length > 0 && <p>{profil.client_prenom} {profil.client_nom}</p>} 
            <div className='h-[50px] w-[50px] rounded-full flex items-center justify-center cursor-pointer'>
              <FaUserCircle className='text-[40px]' />
            </div>
            {open && token.length > 0 && (
              <div className='bg-white border h-[120px] w-[150px] absolute bottom-[-135px] z-20 right-0 pt-[15px] pl-[15px]'>
                <p className='flex gap-3'>
                  <Link to='/profil' className='hover:text-dark-purple font-semibold'>
                    Profile
                  </Link>
                </p>
                <p className='flex gap-3'>
                  <Link to='/parametre' className='hover:text-dark-purple font-semibold'>
                    Parametre
                  </Link>
                </p>
                <p className='flex gap-3'>
                  <Link to='/Deconnexion' className='hover:text-dark-purple font-semibold'>
                    Se deconnecter
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      {openBtnDwn && (
        <div>
          <div className='rounded-[2px] bg-dark-purple border-[4px] border-dark-purple  items-center justify-between px-[30px] hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease'>
            <div className='flex gap-5 py-2'>
              <FaTachometerAlt color='white' />
              <Link to='/dashboard' className='text-white text-[15px] leading-[17px] font-bold'>
                Accueil
              </Link>
            </div>
            <div className='flex gap-5 py-2'>
              <FaShoppingCart color='white' />
              <Link to='/services' className='text-white text-[15px] leading-[17px] font-bold'>
                Services
              </Link>
            </div>
            <div className='flex gap-5 py-2'>
              <FaMoneyBill color='white' />
              <Link to='/paiements' className='text-whitetext-[15px] leading-[17px] font-bold'>Mes paiements</Link>
            </div>
            <div className='flex gap-5 py-2'>
              <FaTachometerAlt color='white' />
              <Link to='/achatcredit' className='text-white text-[15px] leading-[17px] font-bold'>
                Achat Credit
              </Link>
            </div>
            <div className='flex gap-5 py-2'>
              <FaTachometerAlt color='white' />
              <Link to='/profil' className='text-white text-[15px] leading-[17px] font-bold'>
                Profil
              </Link>
            </div>
            <div className='flex gap-5 py-2'>
              <FaSignOutAlt color='white' />
              <Link to='/Deconnexion' className='text-white text-[15px] leading-[17px] font-bold'>
                Se deconnecter
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Otbar;