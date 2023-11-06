import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTypeArticle } from '../../Apis/ServicesApi';
import Spinner from '../../Components/Spinner/Spinner';
import {FaSearch} from 'react-icons/fa';

const Service = () => {

    const [getservices, setgetservices] = useState([]);
    const [loading, setloading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getTypeArticle().then((membre) => {
            setgetservices(membre);
            setloading(false)
        }).catch((error) => {
            console.log(error);
        });
    }, []);
    

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };
    return (
        <>
            <div className='pt-[25px] px-[25px] bg-[#dfe1e3]'>
                <div className='md:flex items-center justify-between'>
                    <h1 className='text-[rgb(90,92,105)] text-center text-[28px] leading-[34px] font-normal'>
                        Les services
                    </h1>
                    <hr className='mb-3'/>
                    <div>
                        <div>
                            <input type="text" value={searchTerm} onChange={handleSearch} name="password" id="password" placeholder="Recherche service" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                        </div>
                    </div>
                </div>
                {loading && <Spinner />}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mt-[25px]'>
                    {
                        getservices && getservices
                        .filter((data) => {
                                if (typeof data.nom_type_a !== 'string'
                                ) {
                                    return false; // ignore non-string values
                                }
                                return data.nom_type_a.toLowerCase().includes(searchTerm.toLowerCase())
                              
                            })
                        .map((ki) => {
                            return (
                                <Link to={`/articles/${ki.id}`}>
                                    <div className=''>
                                        <img src={`https://back-office.creditshop-africa.africa/activite_image/${ki.image_type_a}`} className='h-[300px] w-[300px] mt-[5px] rounded-[8px] bg-white border-[2px] border-dark-purple justify-between hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease' alt="" />
                                    </div>
                                    <h3 className='px-5'>{ki.nom_type_a}</h3>
                                </Link>
                            )
                        })
                    }
                </div>

            </div>
        </>
    );
};

export default Service;