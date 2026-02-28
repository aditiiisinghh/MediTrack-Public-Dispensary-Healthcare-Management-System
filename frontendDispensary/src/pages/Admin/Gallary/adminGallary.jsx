import React, { useState, useEffect } from 'react'
import './adminGallary.css'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddModal from './AddModal/addModal';
import DeleteModal from './DeleteModal/deleteModal';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const AdminGallary = (props) => {
    const [addModal, setAddModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [data, setData] = useState([]);
    const [clickedItem, setClickedItem] = useState(null);

    const setAddModalFunc = () => { setAddModal(prev => !prev); }

    const setDeleteModalFunc = (item = null) => {
        if (deleteModal) setClickedItem(null);
        else setClickedItem(item);
        setDeleteModal(prev => !prev);
    }

    const fetchData = async () => {
        props.showLoader();
        await axios.get('http://localhost:4000/api/gallary/get', { withCredentials: true }).then(resp => {
            setData(resp.data.images);
        }).catch(err => {
            toast.error(err?.response?.data?.error);
        }).finally(() => {
            props.hideLoader();
        });
    }

    useEffect(() => { fetchData(); }, []);

    return (
        <div className='gallary-admin'>
            <div className='go-back'><Link to={'/admin/dashboard'}><ArrowBackIcon /> Back To Dashboard</Link></div>

            <div className='add-pic-gallary-btn' onClick={setAddModalFunc}>Add</div>

            <div className='gallary-home'>
                {data.map((item) => (
                    <div className='gallary-item admin-gallary-item' key={item._id}>
                        <img src={item.link} alt='gallery' className='gallary-image' />
                        <div className='delete-gallary-btn' onClick={() => setDeleteModalFunc(item)}>Delete</div>
                    </div>
                ))}
                {data.length === 0 && <div>No images in gallery yet.</div>}
            </div>

            {addModal && <AddModal onClose={setAddModalFunc} />}
            {deleteModal && <DeleteModal clickedItem={clickedItem} onClose={setDeleteModalFunc} />}
            <ToastContainer />
        </div>
    )
}

export default AdminGallary
