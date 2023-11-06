
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

let token = `Bearer ${localStorage.getItem("token")}`;
let url = 'https://apiclient.creditshop-africa.africa/api/';



export const getPanierCount = () => {
    return axios.get(`${url}panierCount`,
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
            if (error.response && error.response.status === 403) {
                return error.response.data.message
            } else {
                window.location.href = '/';
            }
        });
}

export const getPanier = () => {
    return axios.get(`${url}paniers`,
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
            if (error.response && error.response.status === 403) {
                return error.response.data.message
            } else {
                window.location.href = '/';
            }
        });
}

export const getPanierTotal = () => {
    return axios.get(`${url}TotalPanier`,
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
                window.location.href = "/";
            } else {
                toast.error(`${error.response.data.message}`)
            }
        });
}


export const deletePanier = (id) => {
    Swal.fire({
        title: 'Êtes-vous sûr de vouloir retirer ce produit ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimer',
        cancelButtonText: 'Non, annuler'
    }).then((result) => {
        if (result.isConfirmed) {
            axios
                .delete(`${url}panier/${id}`, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: token
                    }
                })
                .then((response) => {
                    Swal.fire({
                        icon: 'success',
                        text: `${response.data.message}`,
                        confirmButtonText: 'OK'
                    });
                    
                })
                .catch((error) => {
                    alert(error);
                });
        }
    });
};

export const addPanier = (data) => {
        return axios.post(`${url}panier`, data,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }).then((response) => {
                Swal.fire({
                    icon: 'success',
                    text: `${response.data.message}`,
                    confirmButtonText: 'OK'
                })
            }).catch((error) => {
                if (error.response && error.response.status === 422) {
                    Swal.fire({
                        icon: 'error',
                        text: `Tous les champs sont obligatoire !`,
                    });
                } else if (error.response.status === 500) {
                    Swal.fire({
                        icon: 'error',
                        text: 'Erreur de la connexion !!!',
                        confirmButtonText: 'OK'
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        text: `${error.response.data.message}`,
                        confirmButtonText: 'OK'
                    })
                }
            })
}
