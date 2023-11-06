import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {
    FaUserCircle,
} from 'react-icons/fa';
import { getProfil } from '../../Apis/Profile';

const FormulaireProfil = () => {
    const [loading, setloading] = useState(false);
    const [profil, setprofil] = useState([])
    const navigate = useNavigate();
    const form = useRef();

    useEffect(() => {
        getProfil().then((membre) => {
            setprofil(membre);
            setloading(false)
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const update = (e) => {
        e.preventDefault();
        alert('ok')
    }
    return (
        <div className='pt-[25px]  px-[25px] bg-[#F8F9FC]'>
            <div className='flex items-center gap-5 mb-7'>
                <FaUserCircle size={30} />
                <h1 className='text-[#5a5c69] text-[28px] leading-[34px] font-normal'>Profile</h1>
            </div>
            <form ref={form} class="space-y-4 md:space-y-6">
                <div className='md:grid md:grid-cols-2 gap-1'>
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom</label>
                        <input value={profil.client_nom} onChange={(e) => setprofil({...profil, client_nom: e.target.value}) } type="text" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required="" />
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Postnom</label>
                        <input onChange={(e) => setprofil({...profil, client_post: e.target.value}) }  value={profil.client_post}  type="text" name="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                    </div>
                </div>
                <div className='md:grid md:grid-cols-2 gap-1'>
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telephone</label>
                        <input  onChange={(e) => setprofil({...profil, client_tel: e.target.value}) } value={profil.client_tel}  type="text" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required="" />
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prenom</label>
                        <input  onChange={(e) => setprofil({...profil, client_prenom: e.target.value}) } value={profil.client_prenom}  type="text" name="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                    </div>
                </div>
                <div className='md:grid md:grid-cols-2 gap-1'>
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Adresse</label>
                        <input  onChange={(e) => setprofil({...profil, client_adresse: e.target.value}) } value={profil.client_adresse}  type="text" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required="" />
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Province</label>
                        <input  onChange={(e) => setprofil({...profil, client_province: e.target.value}) } value={profil.client_province}  type="text" name="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                    </div>
                </div>
                <div className='md:grid md:grid-cols-2 gap-1'>
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Commune</label>
                        <input  onChange={(e) => setprofil({...profil, client_commune: e.target.value}) } value={profil.client_commune}  type="text" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required="" />
                    </div>
                   
                </div>

                <button type="submit" onClick={update} class=" text-white bg-primary-600 bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    <div class="flex items-center justify-center">
                        {loading && <div class="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white-900 mr-2"></div>}
                        <span class="text-center">Modifier</span>
                    </div>
                </button>
            </form>
        </div>
    )
}

export default FormulaireProfil