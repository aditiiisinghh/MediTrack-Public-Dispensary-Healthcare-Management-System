import React, { useState, useEffect } from 'react'
import './facility.css'
import axios from 'axios';

const Facility = (props) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    props.showLoader();
    await axios.get('http://localhost:4000/api/facility/get').then(resp => {
      setData(resp.data.facilities);
    }).catch(err => {
      console.log(err);
    }).finally(() => {
      props.hideLoader();
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='facility'>
      <div className='facility-header'>
        List of facilities available at NIT HEALTH CENTRE:
      </div>
      <div className='facility-lists'>
        {data.length === 0 && <div>No facilities added yet.</div>}
        {data.map((item, index) => (
          <div className='facility-item' key={item._id}>
            <div className='facility-title'>{index + 1}. {item.title}</div>
            <div className='facility-description'>{item.description}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Facility
