import React, { useState, useEffect } from 'react'
import './nearByModal.css'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const NearByModal = (props) => {
    const [inputField, setInputField] = useState({ name: "", address: "", contact: "" });

    const handleOnChange = (event, key) => {
        setInputField({ ...inputField, [key]: event.target.value });
    }

    useEffect(() => {
        if (props.clickedItem) {
            setInputField({ name: props.clickedItem.name, address: props.clickedItem.address, contact: props.clickedItem.contact });
        }
    }, []);

    const updateFunc = async () => {
        await axios.put(`http://localhost:4000/api/hospital/update/${props.clickedItem._id}`, inputField, { withCredentials: true }).then(resp => {
            toast.success("Hospital Updated Successfully");
            setTimeout(() => window.location.reload(), 1000);
        }).catch(err => {
            toast.error(err?.response?.data?.error);
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (inputField.name.trim().length === 0 || inputField.address.trim().length === 0 || inputField.contact.trim().length === 0) return toast.error("Enter all the fields");
        if (props.clickedItem) { updateFunc(); return; }
        await axios.post('http://localhost:4000/api/hospital/add', inputField, { withCredentials: true }).then(resp => {
            toast.success("Hospital Added Successfully");
            setTimeout(() => window.location.reload(), 1000);
        }).catch(err => {
            toast.error(err?.response?.data?.error);
        });
    }

    return (
        <form className='register-form' onSubmit={handleSubmit}>
            <div className='register-form-div'>
                <div className='register-input-box'>
                    <input value={inputField.name} onChange={(e) => handleOnChange(e, "name")} className='input-box-register' type='text' placeholder='Hospital Name' />
                </div>
                <div className='register-input-box'>
                    <input value={inputField.address} onChange={(e) => handleOnChange(e, "address")} className='input-box-register' type='text' placeholder='Address' />
                </div>
                <div className='register-input-box'>
                    <input value={inputField.contact} onChange={(e) => handleOnChange(e, "contact")} className='input-box-register' type='text' placeholder='Contact Number' />
                </div>
            </div>
            <button type='submit' className='form-btn reg-btn'>{props.clickedItem ? "Update" : "Add"}</button>
            <ToastContainer />
        </form>
    )
}

export default NearByModal
