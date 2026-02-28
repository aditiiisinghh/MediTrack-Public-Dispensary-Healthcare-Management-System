import React, { useState, useEffect } from 'react'
import './header.css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const Header = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [eventpopup, setEventpopup] = useState(false);
    const [helpline, setHelpline] = useState(false);
    const [events, setEvenets] = useState([]);

    const handleOpenPopup = (popup) => {
        if (popup === "event") setEventpopup(true);
        else setHelpline(true);
    }

    const fetchEvents = async () => {
        await axios.get('http://localhost:4000/api/notification/get').then(resp => {
            setEvenets(resp.data.notifications);
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        if (eventpopup) fetchEvents();
    }, [eventpopup]);

    const handleClosePopup = (popup) => {
        if (popup === "event") setEventpopup(false);
        else setHelpline(false);
    }

    const handleLogin = () => { navigate('/login'); }

    const handleLogout = async () => {
        props.showLoader();
        await axios.post('http://localhost:4000/api/auth/logout', {}, { withCredentials: true }).then(resp => {
            localStorage.removeItem("isLogin");
            localStorage.removeItem("userInfo");
            props.handleLogin(null);
            navigate('/');
        }).catch(err => {
            toast.error(err?.response?.data?.error || "Logout failed");
        }).finally(() => {
            props.hideLoader();
        });
    }

    return (
        <div className='header'>
            <div className='header-college-details'>
                <div className='header-college-details-left'>
                    <img className='header-college-details-left-logo' src='https://static.vecteezy.com/system/resources/previews/018/902/537/original/university-college-school-badge-logo-design-image-education-badge-logo-design-university-high-school-emblem-free-vector.jpg' alt='colegeLogo' />
                    <div>
                        <div className='header-college-details-name'>राष्ट्रीय प्रौद्योगिकी संस्थान,</div>
                        <div className='header-college-details-place'>कॉलेज </div>
                        <div className='header-college-details-name'>XYZ Institute of Technology, </div>
                        <div className='header-college-details-place'>Delhi </div>
                    </div>
                </div>

                <div className='header-college-details-right'>
                    <div className='header-college-social-media'>
                        <a target='_blank' href='https://www.youtube.com/@nationalinstituteoftechnol7593'><img src='https://cdn-icons-png.flaticon.com/128/3670/3670147.png' className='header-social-media-image' /></a>
                        <a target='_blank' href='https://www.facebook.com/nitukofficial/'><img src='https://cdn-icons-png.flaticon.com/128/733/733547.png' className='header-social-media-image' /></a>
                        <a target='_blank' href='https://x.com/NIT_Uttarakhand'><img src='https://cdn-icons-png.flaticon.com/128/5968/5968830.png' className='header-social-media-image' /></a>
                        <a target='_blank' href='https://www.instagram.com/nitukofficial'><img src='https://th.bing.com/th/id/OIP.0wjhvLpjGf_-r-1lqG3QAQHaHw?rs=1&pid=ImgDetMain' className='header-social-media-image' /></a>
                    </div>
                    <input type='text' className='header-input-tags' placeholder='Search...' />
                </div>
            </div>

            <div className='navbar'>
                <Link to={'/'} className={`navbar-links ${location.pathname === "/" ? 'active-link' : null}`}>
                    Home
                </Link>
                <div onClick={props.isLogin ? handleLogout : handleLogin} className={`navbar-links ${location.pathname === "/login" ? 'active-link' : null}`}>
                    {props.isLogin ? "Logout" : "Login"}
                </div>
                <Link to={'/stock'} className={`navbar-links ${location.pathname === "/stock" ? 'active-link' : null}`}>
                    Stock View
                </Link>
                <div className='navbar-links event-link' onMouseEnter={() => handleOpenPopup("event")} onMouseLeave={() => handleClosePopup("event")}>
                    <div className='navbar-link-opt'>New Events <ArrowDropDownIcon /></div>
                    {eventpopup && (
                        <div className='event-popup'>
                            {events.length === 0 && <div className='event-popup-item'>No events yet</div>}
                            {events.map((item, index) => (
                                <div className='event-popup-item' key={index}>{item.title}</div>
                            ))}
                        </div>
                    )}
                </div>
                <div className='navbar-links event-link' onMouseEnter={() => handleOpenPopup("helpline")} onMouseLeave={() => handleClosePopup("helpline")}>
                    <div className='navbar-link-opt'>Helpline <ArrowDropDownIcon /></div>
                    {helpline && (
                        <div className='event-popup'>
                            <div className='event-popup-item'>Emergency: 112</div>
                            <div className='event-popup-item'>Ambulance: 108</div>
                            <div className='event-popup-item'>Health Center: 1346-257400</div>
                        </div>
                    )}
                </div>
            </div>

            {location.pathname === "/" && (
                <div className='header-banner'>
                    <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV0JtwxcjNmUy0HNfNwUA4bbdNgAExlepqgG2yDgpKR2emOMi79JnaSHAFMHp5FAWbhrA&usqp=CAU"} className='header-banner-image' />
                </div>
            )}

            <ToastContainer />
        </div>
    )
}

export default Header
