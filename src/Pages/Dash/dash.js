import React from 'react'
import { Link } from 'react-router-dom'
import {
    FaShoppingCart,
    FaUserCircle,
    FaCreditCard,
    FaUserPlus
} from 'react-icons/fa';

const Dash = () => {
    return (
        <section class="bg-gray-50 dark:bg-gray-900">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img class="w-14 h-14 rounded mr-2" src="images/logos.png" alt="logo" />
                    <div>
                        <p className='text-dark-purple'>CREDITSHOP</p>
                        <p className='text-dark-purple'>AFRICA</p>
                    </div>
                </a>
            </div>
            <div className='grid grid-cols-2 xs:grid-cols-2 p-[20px] gap-[30px] mt-[25px] pb-[15px]'>
                <Link to='/services'>
                    <div className='h-[150px] rounded-[8px] bg-white border-[2px] border-dark-purple hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease flex items-center justify-center'>
                        <div className='text-center'>
                            <center> <FaShoppingCart size={50} /></center>
                            <p className='text-[16px] font-bold'>Catalogue des produits</p>
                        </div>
                    </div>
                </Link>
                <Link>
                    <div className='h-[150px] rounded-[8px] bg-white border-[2px] border-dark-purple hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease flex items-center justify-center'>
                        <div className='text-center'>
                            <center> <FaUserPlus size={50} /></center>
                            <p className='text-[16px] font-bold'>Inscrivez-vous ici</p>
                        </div>
                    </div>
                </Link>
                <Link>
                    <div className='h-[150px] rounded-[8px] bg-white border-[2px] border-dark-purple hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease flex items-center justify-center'>
                        <div className='text-center'>
                            <center> <FaCreditCard size={50} /></center>
                            <p className='text-[16px] font-bold'>Paiement d'un compte</p>
                        </div>
                    </div>
                </Link>
                <Link>
                    <div className='h-[150px] rounded-[8px] bg-white border-[2px] border-dark-purple hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease flex items-center justify-center'>
                        <div className='text-center'>
                            <center> <FaUserCircle size={50} /></center>
                            <p className='text-[16px] font-bold'>Mon compte creditshop</p>
                        </div>
                    </div>
                </Link>
            </div>
        </section>
    )
}

export default Dash