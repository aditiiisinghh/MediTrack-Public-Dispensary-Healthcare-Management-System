import React, { useState, useEffect } from 'react'
import './facilityModal.css'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const FacilityModal = (props) => {
    const [inputField, setInputField] = useState({ title: "", description: "" });

    const handleOnChange = (event, key) => {
        setInputField({ ...inputField, [key]: event.target.value });
    }

    useEffect(() => {
        if (props.clickedItem) {
            setInputField({ title: props.clickedItem.title, description: props.clickedItem.description });
        }
    }, []);

    const updateFacility = async () => {
        await axios.put(`http://localhost:4000/api/facility/update/${props.clickedItem._id}`, inputField, { withCredentials: true }).then(resp => {
            toast.success("Facility Updated Successfully");
            setTimeout(() => window.location.reload(), 1000);
        }).catch(err => {
            toast.error(err?.response?.data?.error);
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (props.clickedItem) { updateFacility(); return; }
        if (inputField.title.trim().length === 0 || inputField.description.trim().length === 0) return toast.error("Please fill all fields");
        await axios.post('http://localhost:4000/api/facility/add', inputField, { withCredentials: true }).then(resp => {
            toast.success("Facility Added Successfully");
            setTimeout(() => window.location.reload(), 1000);
        }).catch(err => {
            toast.error(err?.response?.data?.error);
        });
    }

    return (
        <div className='facilty-modal'>
            <form className='register-form' onSubmit={handleSubmit}>
                <div className='register-form-div'>
                    <div className='register-input-box'>
                        <input value={inputField.title} onChange={(e) => handleOnChange(e, "title")} className='input-box-register' type='text' placeholder='Facility Title' />
                    </div>
                    <div className='register-input-box'>
                        <textarea value={inputField.description} onChange={(e) => handleOnChange(e, "description")} className='input-box-register' placeholder='Description' rows={3} />
                    </div>
                </div>
                <button type='submit' className='form-btn reg-btn'>{props.clickedItem ? "Update" : "Add"}</button>
                <ToastContainer />
            </form>
        </div>
    )
}

export default FacilityModal
