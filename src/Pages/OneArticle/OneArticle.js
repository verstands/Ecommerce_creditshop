import React, { useEffect, useState } from 'react'
import {
    FaUserCircle,
    FaStar,
    FaShoppingCart,
    FaFacebook,
    FaWhatsapp,
    FaInstagram
} from 'react-icons/fa';
import { getArticleOne } from '../../Apis/Articles';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Spinner from '../../Components/Spinner/Spinner';
import { toast } from "react-toastify";


const OneArticle = () => {
    const [articleOne, setarticleOne] = useState([])
    const [loading, setloading] = useState(true)
    const params = useParams();
    const [getarticles, setarticles] = useState([]);
    const [loadingA, setloadingA] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [inputList, setInputList] = useState([]);
    const [sommeTotale, setSommeTotale] = useState(0);
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    useEffect(() => {
        getArticleOne(params.id).then((membre) => {
            setarticleOne(membre);
            setloading(false)
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const addToCart = (article) => {
        if (isAddingToCart) {
          return;
        }
    
        setIsAddingToCart(true);
    
        const existingItemIndex = inputList.findIndex(
          (item) => item.produit === article.article_nom
        );
        toast.success("L'article a été ajouté au panier avec succès !");
        
        if (existingItemIndex !== -1) {
          setInputList((prevInputList) => {
            const updatedInputList = prevInputList.map((item, index) => {
              if (index === existingItemIndex) {
                const updatedQuantity = item.quantite + 1;
                const updatedTotal = article.article_prix * updatedQuantity;
    
                return {
                  ...item,
                  quantite: updatedQuantity,
                  total: updatedTotal,
                };
              }
              return item;
            });
    
            localStorage.setItem("panier", JSON.stringify(updatedInputList));
            const total = updatedInputList.reduce((acc, item) => acc + item.total, 0);
            setSommeTotale(total);
            setIsAddingToCart(false);
            return updatedInputList;
          });
        } else {
          const newCartItem = {
            image: article.article_image,
            produit: article.article_nom,
            prix: article.article_prix,
            total: article.article_prix,
            quantite: 1,
          };
    
          setInputList((prevInputList) => {
            const updatedInputList = [...prevInputList, newCartItem];
            localStorage.setItem("panier", JSON.stringify(updatedInputList));
            const total = updatedInputList.reduce((acc, item) => acc + item.total, 0);
            setSommeTotale(total);
            setIsAddingToCart(false);
            return updatedInputList;
          });
        }
    }
    return (
        <>
            <div className='pt-[25px]  px-[25px] bg-[#F8F9FC]'>
                <div className='flex items-center justify-between'>
                   
                </div>
                {
                    articleOne && (
                        <div className="md:flex border-black mt-4">
                            <div className="md:w-6/12 bg-white p-10 rounded-sm">
                                <img 
                                 src={`https://back-office.creditshop-africa.africa/activite_image/articles/${articleOne.article_image}`} 
                                 alt="images"
                                 className='h-[350px] w-[400px] mt-[5px] rounded-[8px]  border-green justify-between hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease'
                                 />
                            </div>
                            <div className="md:w-6/12 bg-white p-10 rounded-sm">
                                <div>
                                    <div className=''>
                                        <h2 className='font-bold text-4xl'>
                                            {articleOne.article_nom}
                                        </h2>
                                    </div>
                                    <div className=''>
                                        <h6 className='font-bold text-dark-purple'>
                                            {articleOne.at && articleOne.at.nom_type_a}
                                        </h6>
                                    </div>
                                    <div className='flex items-center gap-1 mt-2'>
                                        <FaStar />
                                        <FaStar />
                                        <FaStar color='red' />
                                        <FaStar color='red' />
                                        <FaStar color='red' />
                                        <p>(9 avis)</p>
                                    </div>
                                    <div className='mb-4'>
                                        <h2 className='font-bold text-4xl'>
                                            {articleOne.article_prix}$
                                        </h2>
                                    </div>
                                    <div className='mb-4'>
                                        <p className=''>
                                            {articleOne.article_description}
                                        </p>
                                    </div>
                                    <div className='mb-4 '>
                                        <div className="flex items-center">
                                            <button
                                                className="px-2 py-1 bg-red-500 text-gray-700 rounded-l-md"

                                            >
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                className=" py-1 text-center text-gray-700 bg-gray-200"
                                                value="1"

                                            />
                                            <button
                                                className="px-2 py-1 bg-red-500 text-gray-700 rounded-r-md"

                                            >
                                                +
                                            </button>
                                        </div>
                                        <div className='flex mt-6 items-center justify-center mt-1 bg-green-700 h-[40px] w-[155px] rounded text-white'>
                                            <FaShoppingCart />
                                            <button className='' onClick={() => addToCart(articleOne)}> Ajouter au panier</button>
                                        </div>
                                        <div className='flex items-center gap-2 mt-9'>
                                            <p className='font-bold '>Partager sur : </p>
                                            <Link><FaFacebook /></Link>
                                            <Link><FaWhatsapp /></Link>
                                            <Link><FaInstagram /></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                {loading && <Spinner />}
            </div>
        </>
    )
}

export default OneArticle