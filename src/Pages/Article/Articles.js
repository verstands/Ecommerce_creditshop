import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import {
    FaUserCircle,
    FaShoppingCart,
} from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { getArticle } from '../../Apis/Articles';
import Spinner from '../../Components/Spinner/Spinner';
import { addPanier } from '../../Apis/PanierApi';

const Articles = () => {
    const [getarticles, setarticles] = useState([]);
    const [loading, setloading] = useState(true);
    const [loadingA, setloadingA] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [inputList, setInputList] = useState([]);
    const [sommeTotale, setSommeTotale] = useState(0);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const params = useParams();


    useEffect(() => {
        getArticle(params.id).then((membre) => {
            setarticles(membre);
            setloading(false)
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const OnPanier = (id) => {
        let data = {
            article: id
        }
        setloadingA(true)
        addPanier(data)
            .then(() => {
                setloadingA(false);
            })
            .catch((error) => {
                console.log(error);
                setloadingA(false);
            });
    }

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };


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
            <div className='pt-[25px] px-[25px] bg-[#dfe1e3]'>
                <div className='md:flex selection:items-center justify-between'>
                    <h1 className='text-[rgb(90,92,105)] text-center text-[28px] leading-[34px] font-normal'>
                        Les articles
                    </h1>
                    <hr className='mb-3'/>
                    <div>
                        <div>
                            <input type="text" value={searchTerm} onChange={handleSearch} name="password" id="password" placeholder="Recherche un article" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                        </div>
                    </div>
                </div>
                {loading && <Spinner />}
                <div className='grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-5 mt-[25px]' >
                    {
                        getarticles && getarticles
                            .filter((data) => {
                                if (typeof data.article_description !== 'string'
                                ) {
                                    return false; // ignore non-string values
                                }
                                return data.article_description.toLowerCase().includes(searchTerm.toLowerCase())

                            })
                            .map((ats) => {
                                return (
                                    <div>
                                        <Link to={`/onearticle/${ats.id}`}>
                                            <div >
                                                <img
                                                    src={`https://back-office.creditshop-africa.africa/activite_image/articles/${ats.article_image}`}
                                                    alt=""
                                                    className='h-[250px] w-[300px] mt-[5px] rounded-[8px] bg-white border-[2px] border-dark-purple justify-between hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease'
                                                />
                                            </div>
                                        </Link>
                                        <h3 className='font-bold'>{ats.article_nom}</h3>
                                        <p>{ats.article_description.slice(0, 50)}...</p>
                                        <div className='flex items-center justify-between'>
                                            <div className='font-bold text-red-600'>{ats.article_prix}$</div>
                                            <div className='flex items-center justify-center mt-1 mb-3 mx-10 bg-green-700 h-[40px] w-[155px] rounded text-white'>
                                                <FaShoppingCart />
                                                <button className='' onClick={() => addToCart(ats)}> Ajouter au panier</button>
                                            </div>
                                            {loadingA &&
                                                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-black mr-2"></div>
                                            }
                                        </div>
                                    </div>
                                )
                            })
                    }
                </div>
            </div>

        </>
    );
}

export default Articles