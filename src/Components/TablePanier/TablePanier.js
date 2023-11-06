import React from 'react'
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
import {
    FaTrash,
    FaShoppingCart,
} from 'react-icons/fa';
import { getPanierTotal } from '../../Apis/PanierApi';

const TablePanier = ({ TABLE_ROWSS, deletePanierItem }) => {

    const handleDelete = (id) => {
        deletePanierItem(id);
    };
    return (
        <tbody>
            {Array.isArray(TABLE_ROWSS) &&
                TABLE_ROWSS.map((kf) => (
                    <tr key={kf.id} className="even:bg-blue-gray-50/50">
                        <td className="p-4">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                <img
                                    src={`https://back-office.creditshop-africa.africa/activite_image/articles/${kf.image}`}
                                    alt=""
                                    className='h-[50px] w-[50px] rounded flex items-center justify-center cursor-pointer'
                                />
                            </Typography>
                        </td>
                        <td className="p-4">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                {kf.produit}
                            </Typography>
                        </td>
                        <td className="p-4">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                {kf.prix}
                            </Typography>
                        </td>
                        <td className="p-4">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                {kf.quantite}
                            </Typography>
                        </td>
                        <td className="p-4">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                {kf.total}
                            </Typography>
                        </td>
                        <td className="p-4">
                            <button onClick={() => handleDelete(kf.id)}>
                                <FaTrash color='red' />
                            </button>
                        </td>
                    </tr>
                ))}
        </tbody>
    )
}

export default TablePanier