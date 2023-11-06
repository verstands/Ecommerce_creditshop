import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from 'axios';
import { TEInput, TERipple } from "tw-elements-react";
import { Link } from 'react-router-dom';


const Login = () => {
    const [showNan, setshowNan] = useState(true);
    const [IsMobile, setIsMobile] = useState(false);
    const navigate = useNavigate();
    const [loading, setloading] = useState(false);
    let url = 'https://apiclient.creditshop-africa.africa/api/';
    const form = useRef();

    function handleResize() {
        if (typeof window.innerWidth <= 640) {
            setshowNan(false)
            setIsMobile(true)
        } else {
            setshowNan(true)
            setIsMobile(false)
        }
    }

    useEffect(() => {
        if (typeof window != undefined) {
            window.addEventListener('resize', handleResize)
        } else {
            window.removeEventListener('resize', handleResize)
        }
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const SignInBtn = (e) => {
        e.preventDefault()
        setloading(true)

        const clientTel = form.current[0].value;
        
        if (!clientTel.startsWith("243") || clientTel.startsWith("0")) {
            setloading(false);
            toast.error("Le numéro de téléphone doit commencer par 243 et ne pas commencer par 0");
            return;
        }

        axios.post(`${url}login`,
            {
                client_tel: clientTel,
                client_mdp: form.current[1].value,
            }
        ).then((response) => {
            let token;
            if (response.data.token !== undefined) {
                token = JSON.stringify(response.data.token);
                let tokenT = token.substring(1, token.length - 1);
                localStorage.setItem("token", tokenT);
                setloading(false);
                navigate('/dashboad');
            } else {
                token = '';
            }
        }).catch((error) => {
            if (error?.response?.status === 401) {
                setloading(false)
                toast.error(`${error.response.data.message}`)
            } else if (error?.response?.status === 500) {
                setloading(false)
                toast.error(`Erreur de la connexion`)
            } else if (error?.response?.status === 404) {
                setloading(false)
                toast.error(`Service non trouvée !!!`)
            } else if (error?.response?.status === 422) {
                setloading(false)
                toast.error(`${error.response.data.message}`)
            } else if (error?.response?.status === 500) {
                setloading(false)
                toast.error(`erreur`)
            } else {
                alert(error)
                setloading(false)
            }
        })

    }
    return (
        <>
            <section class="bg-gray-50 dark:bg-gray-900">
                <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img class="w-11 h-11 rounded mr-2" src="images/logos.png" alt="logo" />
                        CreditShop
                    </a>

                    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Se connecter
                            </h1>
                            <form ref={form} onSubmit={SignInBtn} class="space-y-4 md:space-y-6">
                                <div>
                                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telephone</label>
                                    <input type="number" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ex: 243XXXXXXXX" required="" />
                                </div>
                                <div>
                                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                <div class="flex items-center justify-between">
                                    <div class="flex items-start">
                                        <div class="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                        </div>
                                        <div class="ml-3 text-sm">
                                            <label for="remember" class="text-gray-500 dark:text-gray-300">Souviens-toi de moi</label>
                                        </div>
                                    </div>
                                    <Link to="/Mdpoublier" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Mot de passe oublié</Link>
                                </div>
                                <button type="submit" class="w-full text-white bg-primary-600 bg-dark-purple hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                    <div class="flex items-center justify-center">
                                        {loading && <div class="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white-900 mr-2"></div>}
                                        <span class="text-center">Se connecter</span>
                                    </div>
                                </button>
                                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Vous n'avez pas encore de compte?  <a href="/inscription" class="font-medium text-primary-600 hover:underline dark:text-primary-500">S'inscrire</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Login