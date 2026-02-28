import React, { useState, useEffect } from 'react'
import './gallary.css'
import axios from 'axios'

const Gallary = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      props.showLoader();
      await axios.get('http://localhost:4000/api/gallary/get').then(resp => {
        setData(resp.data.images);
      }).catch(err => {
        console.log(err);
      }).finally(() => {
        props.hideLoader();
      });
    }
    fetchData();
  }, []);

  return (
    <div className='gallary-home'>
      {data.length === 0 && <div>No images yet.</div>}
      {data.map((item, index) => (
        <div className='gallary-item' key={item._id || index}>
          <img src={item.link} alt={`gallery-${index}`} className='gallary-image' />
        </div>
      ))}
    </div>
  )
}

export default Gallary
