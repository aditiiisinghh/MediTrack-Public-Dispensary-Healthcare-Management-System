import React, { useState, useEffect } from 'react'
import './manageEvent.css'
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const ManageEvent = (props) => {
    const [title, setTitle] = useState("");
    const [data, setData] = useState([]);

    const fetchData = async () => {
        props.showLoader();
        await axios.get('http://localhost:4000/api/notification/get', { withCredentials: true }).then(resp => {
            setData(resp.data.notifications);
        }).catch(err => {
            toast.error(err?.response?.data?.error);
        }).finally(() => {
            props.hideLoader();
        });
    }

    useEffect(() => { fetchData(); }, []);

    const handleSubmitEvent = async (e) => {
        e.preventDefault();
        if (title.trim().length === 0) return toast.error("Please Enter Title");
        props.showLoader();
        await axios.post('http://localhost:4000/api/notification/add', { title }, { withCredentials: true }).then(resp => {
            setData([resp.data.notification, ...data]);
            setTitle("");
            toast.success("Event Added Successfully");
        }).catch(err => {
            toast.error(err?.response?.data?.error);
        }).finally(() => {
            props.hideLoader();
        });
    }

    const filterOutEvent = (id) => {
        let newArr = data.filter((item) => item._id !== id);
        setData(newArr);
    }

    const handleDeleteEvent = async (id) => {
        props.showLoader();
        await axios.delete(`http://localhost:4000/api/notification/delete/${id}`, { withCredentials: true }).then(resp => {
            filterOutEvent(id);
            toast.success("Event Deleted");
        }).catch(err => {
            toast.error(err?.response?.data?.error);
        }).finally(() => {
            props.hideLoader();
        });
    }

    return (
        <div className='add-staffs-box'>
            <form onSubmit={handleSubmitEvent} className='register-form'>
                <div className='register-form-div'>
                    <div className='register-input-box'>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} className='input-box-register' type='text' placeholder='Event Title' />
                    </div>
                </div>
                <button type='submit' className='form-btn reg-btn'>Add Event</button>
            </form>

            <div className='list-staffs'>
                {data.map((item, index) => (
                    <div className='list-staff' key={item._id}>
                        <div className='list-staff-name'>{item.title}</div>
                        <DeleteIcon className='delete-icon' onClick={() => handleDeleteEvent(item._id)} />
                    </div>
                ))}
            </div>
            <ToastContainer />
        </div>
    )
}

export default ManageEvent
