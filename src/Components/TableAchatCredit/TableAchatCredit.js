import React from 'react'
import {
    FaTachometerAlt,
} from 'react-icons/fa';
import { PencilIcon } from "@heroicons/react/24/solid";
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

const TableAchatCredit = ({ TABLE_ROWS }) => {
    return (
        <>
            <tbody>
                {TABLE_ROWS}
            </tbody>
        </>
    )
}

export default TableAchatCredit