import React, { useState, useEffect } from 'react'
import './manageMedicine.css'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchBox from '../../../components/SearchBox/searchBox';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '../../../components/Modal/modal';
import MedicineModal from './MedicineModal/medicineModal';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const ManageMedicine = (props) => {
    const [medicineSearch, setMedicineSearch] = useState("")
    const [addModal, setAddModal] = useState(false);
    const [clickedMedicine, setClickedMedicine] = useState(null);
    const [data, setData] = useState([]);

    const onOffmodal = () => {
        if (addModal) setClickedMedicine(null);
        setAddModal(prev => !prev);
    }

    const onChangeValue = (value) => { setMedicineSearch(value); }

    const fetchData = async () => {
        props.showLoader();
        const url = medicineSearch.trim().length > 0
            ? `http://localhost:4000/api/medicine/search?name=${medicineSearch}`
            : `http://localhost:4000/api/medicine/get`;

        await axios.get(url, { withCredentials: true }).then(resp => {
            setData(resp.data.medicines);
        }).catch(err => {
            toast.error(err?.response?.data?.error);
        }).finally(() => {
            props.hideLoader();
        });
    }

    const handleEdit = (item) => {
        setClickedMedicine(item);
        setAddModal(true);
    }

    const filterOutMedicine = (id) => {
        let newArr = data.filter((item) => item._id !== id);
        setData(newArr);
    }

    const handleDelete = async (id) => {
        props.showLoader();
        await axios.delete(`http://localhost:4000/api/medicine/delete/${id}`, { withCredentials: true }).then(resp => {
            filterOutMedicine(id);
            toast.success("Medicine Deleted");
        }).catch(err => {
            toast.error(err?.response?.data?.error);
        }).finally(() => {
            props.hideLoader();
        });
    }

    useEffect(() => { fetchData(); }, [medicineSearch]);

    return (
        <div className='manageMedicine'>
            <div className='go-back'><Link to={'/admin/dashboard'}><ArrowBackIcon /> Back To Dashboard</Link></div>

            <div className='top-manage-medicine'>
                <SearchBox placeholder="Search Medicine" value={medicineSearch} onChange={onChangeValue} />
                <div className='add-manage-medicine' onClick={onOffmodal}>Add</div>
            </div>

            <div className='manageMedicine-card'>
                <div className='report-form-rows'>
                    <div className='report-form-header'>
                        <div className='col-1-mng'>Medicine Name</div>
                        <div className='col-2-mng'>Quantity</div>
                        <div className='col-3-mng'>Usage</div>
                        <div className='col-4-mng'>Actions</div>
                    </div>

                    <div className='report-form-row-block'>
                        {data.map((item, index) => (
                            <div className='report-form-row' key={item._id}>
                                <div className='col-1-mng'>{item.name}</div>
                                <div className='col-2-mng'>{item.quantity}</div>
                                <div className='col-3-mng'>{item.usage}</div>
                                <div className='col-4-mng'>
                                    <EditIcon onClick={() => handleEdit(item)} />
                                    <DeleteIcon onClick={() => handleDelete(item._id)} />
                                </div>
                            </div>
                        ))}
                        {data.length === 0 && (
                            <div className='report-form-row'>
                                <div>No medicines yet</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {addModal && <Modal header="Add Medicine" handleClose={onOffmodal} children={<MedicineModal clickedMedicine={clickedMedicine} showLoader={props.showLoader} hideLoader={props.hideLoader} />} />}
            <ToastContainer />
        </div>
    )
}

export default ManageMedicine
