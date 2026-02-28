import React, { useState, useEffect } from 'react'
import './report.css'
import SearchBox from '../../../../components/SearchBox/searchBox'
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const Report = (props) => {
    const [searchMedicineName, setSearchmedicineName] = useState("")
    const [dropdown, setDropDown] = useState(false);
    const [data, setData] = useState([]);
    const [selectedMedicine, setSelectedMedicine] = useState([]);

    const onChange = (value) => {
        setSearchmedicineName(value);
        if (value.trim().length > 0) setDropDown(true);
        else setDropDown(false);
    }

    const fetchData = async () => {
        if (searchMedicineName.trim().length === 0) { setData([]); return; }
        await axios.get(`http://localhost:4000/api/medicine/search?name=${searchMedicineName}`, { withCredentials: true }).then(resp => {
            setData(resp.data.medicines);
            setDropDown(true);
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => { fetchData(); }, [searchMedicineName]);

    const addMedicine = (item) => {
        let exist = 0;
        selectedMedicine.forEach((med) => { if (med._id === item._id) exist = 1; });
        item = { ...item, requiredQuantity: "" };
        if (exist === 0) setSelectedMedicine([...selectedMedicine, item]);
        setSearchmedicineName("");
        setDropDown(false);
    }

    const onChangeHandle = (event, ind) => {
        const arr = selectedMedicine.map((item, index) => {
            if (index === ind) return { ...item, requiredQuantity: event.target.value };
            return item;
        });
        setSelectedMedicine(arr);
    }

    const handleDelete = (id) => {
        let arr = selectedMedicine.filter((it) => it._id !== id);
        setSelectedMedicine(arr);
    }

    const checkInputInValid = () => {
        let invalid = false;
        selectedMedicine.map((item) => {
            if (item.requiredQuantity.trim().length === 0) invalid = true;
        });
        return invalid;
    }

    const handleOnSubmit = async () => {
        if (selectedMedicine.length === 0) return toast.error("Please select any medicine.");
        if (checkInputInValid()) return toast.error("Please enter all the fields.");
        await axios.post('http://localhost:4000/api/history/add', {
            roll: props.studentDetail.roll,
            student: props.studentDetail._id,
            medicines: selectedMedicine
        }, { withCredentials: true }).then(resp => {
            toast.success("Report Submitted Successfully");
            setSelectedMedicine([]);
        }).catch(err => {
            toast.error(err?.response?.data?.error);
        });
    }

    return (
        <div className='report-regieter'>
            <div className='medicine-suggestion-block'>
                <SearchBox value={searchMedicineName} onChange={onChange} placeholder="Search Medicine" />
                {dropdown && data.length > 0 && (
                    <div className='medicine-dropdown'>
                        {data.map((item, index) => (
                            <div className='medicine-dropdown-item' key={item._id} onClick={() => addMedicine(item)}>
                                {item.name} (Qty: {item.quantity})
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className='report-form-rows'>
                <div className='report-form-header'>
                    <div className='col-1-rm'>Medicine Name</div>
                    <div className='col-2-rm'>Quantity Left</div>
                    <div className='col-3-rm'>Required Quantity</div>
                    <div className='col-4-rm'>Delete</div>
                </div>

                <div className='report-form-row-block'>
                    {selectedMedicine.map((item, index) => (
                        <div className='report-form-row' key={item._id}>
                            <div className='col-1-rm'>{item.name}</div>
                            <div className='col-2-rm'>{item.quantity}</div>
                            <div className='col-3-rm'>
                                <input type='number' className='qty-input' value={item.requiredQuantity} onChange={(e) => onChangeHandle(e, index)} placeholder='Qty' />
                            </div>
                            <div className='col-4-rm'><DeleteIcon onClick={() => handleDelete(item._id)} /></div>
                        </div>
                    ))}
                </div>
            </div>

            <div className='modal-submit' onClick={handleOnSubmit}>Submit</div>
            <ToastContainer />
        </div>
    )
}

export default Report
