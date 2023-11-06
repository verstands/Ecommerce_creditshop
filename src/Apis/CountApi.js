
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

let token = `Bearer ${localStorage.getItem("token")}`;
let url = 'https://apiclient.creditshop-africa.africa/api/';



export const getNbrCommande = () => { 
    return axios.get(`${url}nbrcommande`,
        {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: token
            }
        }
    ).then((response) => {
        return response.data.data;
    })
    .catch((error) => {
        if (error.response && error.response.status === 401) {
            alert(error.response.data.message)
        } else {
           alert(error.response.data.message)
        }
    });
}

export const getSumCommande = () => { 
    return axios.get(`${url}sumcommande`,
        {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: token
            }
        }
    ).then((response) => {
        return response.data.data;
    })
    .catch((error) => {
        if (error.response && error.response.status === 401) {
            alert('countB')

        } else {
           alert(error.response.data.message)
        }
    });
}


export const getSumAchatCredit = () => { 
    return axios.get(`${url}sumachatcredit`,
        {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: token
            }
        }
    ).then((response) => {
        return response.data.data;
    })
    .catch((error) => {
        if (error.response && error.response.status === 401) {
            alert('countC')

        } else {
           alert(error.response.data.message)
        }
    });
}

export const getSumPaiement = () => { 
    return axios.get(`${url}sumpaiement`,
        {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: token
            }
        }
    ).then((response) => {
        return response.data.data;
    })
    .catch((error) => {
        if (error.response && error.response.status === 401) {
            alert('countD')

        } else {
           alert(error.response.data.message)
        }
    });
}