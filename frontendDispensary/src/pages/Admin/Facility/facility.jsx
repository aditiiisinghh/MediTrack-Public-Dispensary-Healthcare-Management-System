import React, { useState, useEffect } from 'react'
import './facility.css'
import { Link } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Modal from '../../../components/Modal/modal';
import FacilityModal from './FacilityModal/facilityModal';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const Facility = (props) => {
    const [modal, setModal] = useState(false);
    const [data, setData] = useState([]);
    const [clickedItem, setClickedItem] = useState(null);

    const onOFModal = () => {
        if (modal) setClickedItem(null);
        setModal(prev => !prev);
    }

    const fetchData = async () => {
        props.showLoader();
        await axios.get('http://localhost:4000/api/facility/get', { withCredentials: true }).then(resp => {
            setData(resp.data.facilities);
        }).catch(err => {
            toast.error(err?.response?.data?.error);
        }).finally(() => {
            props.hideLoader();
        });
    }

    useEffect(() => { fetchData(); }, []);

    const handleEdit = (item) => {
        setClickedItem(item);
        setModal(true);
    }

    const filterOutData = (id) => {
        let newArr = data.filter((item) => item._id !== id);
        setData(newArr);
    }

    const handlDelete = async (id) => {
        props.showLoader();
        await axios.delete(`http://localhost:4000/api/facility/delete/${id}`, { withCredentials: true }).then(resp => {
            filterOutData(id);
            toast.success("Facility Deleted");
        }).catch(err => {
            toast.error(err?.response?.data?.error);
        }).finally(() => {
            props.hideLoader();
        });
    }

    return (
        <div className='admin-facility'>
            <div className='go-back'><Link to={'/admin/dashboard'}><ArrowBackIcon /> Back To Dashboard</Link></div>

            <div className='admin-facility-header'>
                <div>Facilities</div>
                <div className='add-facility-btn' onClick={onOFModal}>Add</div>
            </div>

            <div className='admin-facility-rows'>
                {data.map((item) => (
                    <div className='admin-facility-row' key={item._id}>
                        <div className='admin-facility-info'>
                            <div className='admin-facility-title'>{item.title}</div>
                            <div className='admin-facility-desc'>{item.description}</div>
                        </div>
                        <div className='admin-facility-actions'>
                            <EditIcon onClick={() => handleEdit(item)} style={{ cursor: 'pointer' }} />
                            <DeleteIcon onClick={() => handlDelete(item._id)} style={{ cursor: 'pointer' }} />
                        </div>
                    </div>
                ))}
                {data.length === 0 && <div>No facilities added yet.</div>}
            </div>

            {modal && <Modal headers="Add Facility" handleClose={onOFModal} children={<FacilityModal clickedItem={clickedItem} />} />}
            <ToastContainer />
        </div>
    )
}

export default Facility
