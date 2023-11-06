import React, { useRef, useState } from 'react'
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const Mdpoublier = () => {
    const [loading, setloading] = useState(false);
    const [code, setcode] = useState(0)
    const [SaveTelephone, setSaveTelephone] = useState(0)
    const [isOpen, setIsOpen] = useState(false)
    const [codeActive, setcodeActive] = useState(true)
    const [codeActive2, setcodeActive2] = useState(false)
    const [codeActive3, setcodeActive3] = useState(false)
    const form = useRef();
    const form2 = useRef();
    const form3 = useRef();
    const navigate = useNavigate();
    let url = 'https://apiclient.creditshop-africa.africa/api/';


    const VerifyCode = (e) => {
        e.preventDefault()
        setloading(true)
        let message = "Vootre code est : "
        const telephone = form.current[0].value;
        try {
            axios.get(`${url}Smsapp/${telephone}/${message}`,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                }
            ).then((response) => {
                if (response.data && response.data.code) {
                    setcode(response.data.code)
                    toast.success(`CreditShop vous a envoyé un code par sms`)
                    setcodeActive(false)
                    setcodeActive2(true)
                    setSaveTelephone(telephone)
                    setloading(false)
                } else {
                    navigate('/page500')
                }
            }).catch((error) => {
                if (error.response && error.response.data && error.response.data.message) {
                    if (error.response && error.response.status === 403) {
                        toast.error(`${error.response.data.message}`)
                    } else {
                        Swal.fire({
                            icon: 'error',
                            text: `Erreur de la connexion`,
                            confirmButtonText: 'OK'
                        });
                    }
                } else {
                    navigate('/page500')
                }
            });
        } catch (error) {
            navigate('/page500')
        }

    }
    const [count, setcount] = useState(0)
    const VerifyCodeVrai = (e) => {
        e.preventDefault()
        setloading(true)
        const codeS = form2.current[0].value;
        if (count == 2) {
            navigate('/')
        } else {
            if (code === parseInt(codeS)) {
                setcodeActive2(false)
                setcodeActive3(true)
                toast.success(`Le code est validé`)
                setloading(false)
            } else {
                setcount(prevCount => prevCount + 1);
                toast.error(`Le code est incorrect`)
            }
        }
    };

    const ReiniCode = (e) => {
        e.preventDefault()
        setloading(true)
        const passwordR = form3.current[0].value;
        const passwordRD = form3.current[1].value;
        if (parseInt(passwordR) === parseInt(passwordRD)) {
            axios.get(`${url}PasswordRein/${SaveTelephone}/${passwordR}`,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                }
            ).then((response) => {
                if (response.data && response.data.message) {
                    toast.success(`${response.data.data}`);
                    navigate('/')
                } else {
                    navigate('/page500')
                }
            }).catch((error) => {
                if (error.response && error.response.data && error.response.data.message) {
                    alert(`${url}PasswordRein/${SaveTelephone}/${passwordR}`)
                    setloading(false)
                } else {
                    navigate('/page500')
                }
            });
        }else{
            toast.error(`Le deux mot de passe ne corespodent pas !`);
        }
    };
    return (
        <>
            <section class="bg-gray-50 dark:bg-gray-900">
                <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img class="w-11 h-11 rounded mr-2" src="images/logos.png" alt="logo" />
                        CreditShop
                    </a>
                    <div class="w-auto bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Mot de passe oublier
                            </h1>
                            <form ref={form} onSubmit={VerifyCode} >
                                {
                                    codeActive && (
                                        <>
                                            <div>
                                                <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Veuillez saisir vote numero de telephone</label>
                                                <input type="number" name="nom" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                            </div>
                                            <br />
                                            <button type="submit" class="w-full text-white bg-primary-600 bg-dark-purple hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                                <div class="flex items-center justify-center">
                                                    {loading && <div class="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white-900 mr-2"></div>}
                                                    <span class="text-center">Envoyer</span>
                                                </div>
                                            </button>
                                        </>
                                    )
                                }
                            </form>
                            {
                                codeActive2 && (
                                    <>
                                        <form ref={form2} onSubmit={VerifyCodeVrai}>
                                            <div>
                                                <p className='text-red-500 mb-3'>Vous avez que 2 essaie <strong>({count}/2)</strong></p>
                                                <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Entrez le code </label>
                                                <input type="number" name="nom" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                            </div>
                                            <br />
                                            <button onClick={VerifyCodeVrai} type="submit" class="w-full text-white bg-primary-600 bg-dark-purple hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                                <div class="flex items-center justify-center">
                                                    {loading && <div class="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white-900 mr-2"></div>}
                                                    <span class="text-center">Verify</span>
                                                </div>
                                            </button>
                                        </form>

                                    </>
                                )
                            }

                            {
                                codeActive3 && (
                                    <>
                                        <form ref={form3} onSubmit={ReiniCode}>
                                            <div>
                                                <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Entrez votre nouveau Mot de passe </label>
                                                <input type="text" name="nom" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                                <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirmatio de Mot de passe </label>
                                                <input type="text" name="nom" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                            </div>
                                            <br />
                                            <button type="submit" class="w-full text-white bg-primary-600 bg-dark-purple hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                                <div class="flex items-center justify-center">
                                                    {loading && <div class="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white-900 mr-2"></div>}
                                                    <span class="text-center">Reinitialisaer</span>
                                                </div>
                                            </button>
                                        </form>

                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </section>


        </>
    )
}

export default Mdpoublier