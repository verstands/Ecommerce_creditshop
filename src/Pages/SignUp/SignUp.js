import React, { useEffect, useRef, useState } from 'react'
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { TEInput, TERipple } from "tw-elements-react";
import { addUser } from '../../Apis/UserApi';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
  const [showNan, setshowNan] = useState(true)
  const [IsMobile, setIsMobile] = useState(false)
  const [loading, setloading] = useState(false);
  const form = useRef();
  const navigate = useNavigate();


  let token = `Bearer ${localStorage.getItem("token")}`;
  let url = 'https://apiclient.creditshop-africa.africa/api/';



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

  const Save = (e) => {
    e.preventDefault()
    setloading(true)
    const postData = {
      client_tel: form.current[4].value,
      client_mdp: form.current[5].value,
      client_nom: form.current[0].value,
      client_post: form.current[1].value,
      client_prenom: form.current[2].value,
      client_carte: 0,
      client_adresse: form.current[3].value,
      client_commune: form.current[6].value,
      client_date_creation: 0,
      client_agent_activa: 0,
      client_activation: 0,
      client_profil: 0,
      client_agent: 0,
      client_etat: 1,
      client_province: form.current[7].value,
    }
    axios.post(`${url}SignUpUser`, postData,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: token
        }
      }).then((response) => {
        setloading(false);
        navigate('/');
      }).catch((error) => {

        if (error.response && error.response.status === 422) {
          toast.error(`${error.response.data.message}`)
          setloading(false)
        } else if (error.response.status === 500) {
          toast.error(`${error.response.data.message}`)
          setloading(false)
        } else if (error.response.status === 401) {
          window.location.href = "/";
        } else {
          toast.error(`${error.response.data.message}`)
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
          <div class="w-auto bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                S'isncrire
              </h1>
              <form ref={form} onSubmit={Save}>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom</label>
                    <input type="text" name="nom" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="SD" required="" />
                  </div>
                  <div>
                    <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Postnom</label>
                    <input type="text" name="postnom" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="SD" required="" />
                  </div>
                  <div>
                    <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prenom</label>
                    <input type="text" name="prenom" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="SD" required="" />
                  </div>
                  <div>
                    <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Adresse</label>
                    <textarea type="text" name="adresse" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
                  </div>
                  <div>
                    <label for="number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telephone</label>
                    <input type="number" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="2438XXXXXXXXX" required="" />
                  </div>
                  <div>
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de passe</label>
                    <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                  </div>
                  <div>
                    <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Commune</label>
                    <input type="text" name="text" id="password" placeholder="commune" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                  </div>
                  <div>
                    <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Province</label>
                    <select name="" className='class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"' id="">
                      <option value="s">ss</option>
                      <option value="ss">ss</option>
                    </select>
                  </div>
                </div>
                <br />
                <button type="submit" class="w-full text-white bg-primary-600 bg-dark-purple hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  <div class="flex items-center justify-center">
                    {loading && <div class="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white-900 mr-2"></div>}
                    <span class="text-center">S'inscrire</span>
                  </div>
                </button>
                <p class="text-sm font-light text-white-500 dark:white-400">
                  Vous avez encore de compte?  <a href="/" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Se connecter</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignUp