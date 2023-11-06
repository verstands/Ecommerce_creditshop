import React, { useEffect, useState } from 'react'
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
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
  FaTachometerAlt,
  FaMoneyBill
} from 'react-icons/fa';
import TablePaiement from '../../Components/TablePaiement/TablePaiement';
import { getPaiement } from '../../Apis/PaiiementApi';
import Spinner from '../../Components/Spinner/Spinner';
const Paiement = () => {
  const TABLE_HEAD = ["Montant", "Devise", "Date", ""];
  const [getPaiements, setgetPaiements] = useState([]);
  const [loading, setloading] = useState(true);

  const [messageA, setmessageA] = useState("")
  useEffect(() => {
    getPaiement().then((membre) => {
      setgetPaiements(membre);
      setloading(false)
      setmessageA("Aucun paiement disponible")
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <>
      <div className='pt-[25px]  px-[25px] bg-[#F8F9FC]'>
        <div>
          <Card className="h-full w-full overflow-scroll">
          <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                            <div className='flex'>
                                <div className='px-5 flex items-center'>
                                    <FaMoneyBill className='' />
                                    <div className='ml-10'>
                                        <Typography variant="h5" color="blue-gray">
                                            Paiement 
                                        </Typography>
                                        <Typography variant="h9">
                                            Liste des paiements
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardHeader>
            {
              getPaiements.length > 0 ? (
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
                  <TablePaiement TABLE_ROWS={getPaiements} />
                </table>
              ) : (
                <p className='text-center text-red-500 font-bold mt-10'>{setmessageA}</p>
              )
            }
            {loading && (
              <Spinner />
            )}
          </Card>
        </div>
      </div>
    </>
  )
}

export default Paiement