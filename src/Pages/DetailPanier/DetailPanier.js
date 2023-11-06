import React, { useEffect, useState } from 'react'
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,

} from "@material-tailwind/react";
import { toast } from "react-toastify";
import {
  FaTachometerAlt,
  FaMoneyBill,
  FaShoppingCart,
} from 'react-icons/fa';
import { deletePanier, getPanier, getPanierCount, getPanierTotal } from '../../Apis/PanierApi';
import TablePanier from '../../Components/TablePanier/TablePanier';
import { getProfil } from '../../Apis/Profile';
import { getSystementPaiement } from '../../Apis/PaiiementApi';
import Spinner from '../../Components/Spinner/Spinner';

const DetailPanier = () => {
  const [paniers, setpaniers] = useState([]);
  const [loading, setloading] = useState(true)
  const [loadingValide, setloadingValide] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    getPanier().then((membre) => {
      setpaniers(membre);
      setloading(false)
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  const [Tot, setTot] = useState(0);
  const [RadioPaiement, setRadioPaiement] = useState('1')

  useEffect(() => {
    getPanierTotal().then((membre) => {
      setTot(membre);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  const deletePanierItem = async (id) => {
    try {
      await deletePanier(id);
      const datapanier = await getPanier();
      setpaniers(datapanier);
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const [number, setnumber] = useState([])
  useEffect(() => {
    getProfil().then((membre) => {
      setnumber(membre);
    }).catch((error) => {
      console.log(error);
    });
  }, []);


  const ValiderPaiement = () => {
    if (RadioPaiement === '2') {
      toast.error(`la partie virement n'est pas encore disponimble`)
    } else {
      const phone = number.client_tel;
      const devise = "USD";
      const montant = sommeTotale;
      const refernce = "CS-" + Date.now() + Math.random().toString(36).substr(2, 9);
      setloadingValide(true)
      if(montant <= 0){
        toast.error(`Imposible de passer une commade avec 0$`)
        setloadingValide(false);
      }else{
        getSystementPaiement(devise, montant, phone, refernce)
        setloadingValide(false);
      }
    }
    

  
  }

  const [panier, setPanier] = useState([]);
  const [nombreProduits, setNombreProduits] = useState(0);
  const [sommeTotale, setSommeTotale] = useState(0);


  const handleChangeRadio = (event) => {
    setRadioPaiement(event.target.value)
  }

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('panier'));
    if (savedCart) {
      setPanier(savedCart);
      setNombreProduits(savedCart.length);

      const total = savedCart.reduce((acc, item) => acc + parseInt(item.total), 0);
      setSommeTotale(total);
      setloading(false)
    }
  }, []);


  const TABLE_HEAD = ["Image", "Produit", "Prix", "Quantite", "Total", "Retirer"];
  return (
    <>
      <div className='pt-[25px] px-[25px] bg-[#dfe1e3]'>
        <div className='pt-[25px]  px-[25px] bg-[#F8F9FC]'>
          <div>
            <Card className="h-full w-full overflow-scroll">
              <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                  <div className='flex items-center gap-3'>
                    <FaShoppingCart />
                    <Typography variant="h5" color="blue-gray">
                      Mon panier
                    </Typography>
                  </div>
                </div>
                <hr />
              </CardHeader>
              <div className='grid grid-cols-1 md:grid-cols-2'>
                <div className='w-8/13'>
                  <table className="w-full min-w-max table-auto text-left">
                    <thead>
                      <tr>
                        {TABLE_HEAD.map((head) => (
                          <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal leading-none opacity-70"
                            >
                              {head}
                            </Typography>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <TablePanier TABLE_ROWSS={panier} deletePanierItem={deletePanierItem} />
                  </table>
                  {loading && (
                    <Spinner />
                  )}
                </div>
                <div className='w-4/13'>
                  <h4 className="text-xl font-semibold mb-2">RÉSUMÉ DU PANIER :</h4>
                  <div className="bg-gray-300 shadow-lg rounded-lg overflow-hidden">
                    <div className="p-6">
                      <div className='flex items-center justify-between'>
                        <h6 className="text-xl font-semibold mb-2">TOTAL:</h6>
                        <h6 className="text-xl font-semibold mb-2">{sommeTotale} $</h6>
                      </div>
                      <hr className='mb-4' />
                      <div className=''>
                        <h6 className="text-xl font-semibold mb-2">PAIEMENT</h6>
                        <div className='flex gap-5 items-center mb-3'>
                          <input type="radio" name='t' checked={RadioPaiement === '1'} value='1' onChange={handleChangeRadio} />
                          <p>Mobile money</p>
                        </div>
                        <div className='flex gap-5 items-center'>
                          <input type="radio" name='t' checked={RadioPaiement === '2'} value='2' onChange={handleChangeRadio} />
                          <p>Virement</p>
                        </div>

                      </div>
                      <hr className='mb-2' />
                      <button onClick={ValiderPaiement} type="submit" class="w-full text-white bg-primary-600 bg-dark-purple hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        <div class="flex items-center justify-center">
                          {loadingValide && <div class="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white-900 mr-2"></div>}
                          <span class="text-center"> Passer la commade</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-20">
            <h2 className="text-xl font-bold mb-4">Mobil money</h2>
            <div className='mb-3'>

              <input type="text" name="password" id="password" placeholder="Montant" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
            </div>
            <div className='mb-20'>
              <select name="" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="">
                <option value="USD">USD</option>
                <option value="CDF">CDF</option>
              </select>
            </div>
            <div className='flex justify-between'>
              <button onClick={closeModal} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
                Fermer
              </button>
              <button onClick={closeModal} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                Valider
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DetailPanier