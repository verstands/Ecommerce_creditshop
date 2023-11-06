import React from 'react'
import {
    FaTachometerAlt,
    FaRegSun,
    FaChevronRight,
    FaWrench,
    FaSignOutAlt,
    FaUser,
    FaMoneyBill,
    FaCreditCard,
    FaShoppingCart
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className='bg-dark-purple h-screen px-[15px]'>
            <div className="px-[15px] py-[30px] flex items-center justify-center border-b-[1px] border-white">
                <h1 className='text-white text-[17px] leading-[24px] font-extrabold cursor-pointer'>Credit Shop</h1>
            </div>
            <div className='flex items-center gap-[15px] py-[20px]  border-white'>
                <FaTachometerAlt color='white' />
                <Link to='/accueil' className='text-[14ax] leading-[20px] font-bold text-white'>Accueil</Link>
            </div>
            <div className='flex items-center gap-[15px] py-[20px]  border-white'>
                <FaShoppingCart color='white' />
                <Link to='/services' className='text-[14px] leading-[20px] font-bold text-white'>Services</Link>
            </div>
            <div className='flex items-center gap-[15px] py-[20px]  border-white'>
                <FaMoneyBill color='white' />
                <Link to='/paiements' className='text-[14px] leading-[20px] font-bold text-white'>Mes paiement</Link>
            </div>
            <div className='flex items-center gap-[15px] py-[20px]  border-white'>
                <FaCreditCard color='white' />
                <Link to='achatcredit' className='text-[14px] leading-[20px] font-bold text-white'>Achat Credit</Link>
            </div>
            <div className='flex items-center gap-[15px] py-[20px]  border-white'>
                <FaUser color='white' />
                <Link to='/profil' className='text-[14px] leading-[20px] font-bold text-white'>Profil</Link>
            </div>
            <div className='flex items-center gap-[15px] py-[20px]  border-white'>
                <FaSignOutAlt color='white' />
                <Link to='/Deconnexion' className='text-[14px] leading-[20px] font-bold text-white'>Se deconnecter</Link>
            </div>
        </div>
    )
}

export default Sidebar