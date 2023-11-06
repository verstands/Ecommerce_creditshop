import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Layout from '../Components/Layout/Layout';
import Service from '../Pages/Service/Service';
import Paiement from '../Pages/Paiement/Paiement';
import AchatCredit from '../Pages/AchatCredit/AchatCredit';
import Profil from '../Pages/Profil/Profil';
import Page404 from '../Pages/404/Page404';
import Login from '../Pages/Login/Login';
import Articles from '../Pages/Article/Articles';
import OneArticle from '../Pages/OneArticle/OneArticle';
import SignUp from '../Pages/SignUp/SignUp';
import Acceuil from '../Pages/Acceuil/Acceuil';
import DetailPanier from '../Pages/DetailPanier/DetailPanier';
import Connexioin500 from '../Pages/500/Connexioin500';
import FormulaireProfil from '../Pages/Profil/FormulaireProfil';
import Mdpoublier from '../Pages/Mdpoublier';
import Deconnexion from '../Pages/Deconnexion/Deconnexion';
import Dash from '../Pages/Dash/dash';


const RoutePage = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Dash />} />
            <Route path="/inscription" element={<SignUp />} />
            <Route element={<Layout />}>
                <Route path="/services" element={<Service />} />
                <Route path="/paiements" element={<Paiement />} />
                <Route path="/achatcredit" element={<AchatCredit />} />
                <Route path="/profil" element={<Profil />} />
                <Route path="/articles/:id" element={<Articles />} />
                <Route path="/onearticle/:id" element={<OneArticle />} />
                <Route path="/accueil" element={<Acceuil />} />
                <Route path="/dashboad" element={<Acceuil />} />
                <Route path="/detailpanier" element={<DetailPanier />} />
                <Route path="/updateProfil" element={<FormulaireProfil />} />
            </Route>
            <Route path="*" element={<Page404 />} />
            <Route path="/page500" element={<Connexioin500 />} />
            <Route path="/Mdpoublier" element={<Mdpoublier />} />
            <Route path="/Deconnexion" element={<Deconnexion />} />
        </Routes>
    );
};

export default RoutePage