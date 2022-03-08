import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom';

import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth ,signOut } from 'firebase/auth';
import './Header.css'
import { query, collection, getDocs, where } from "firebase/firestore";

const Header = () => {
    const auth = getAuth();

    const [activeTab, setActiveTab] = useState( "Home" )
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const navigate = useNavigate()
    
    // Function
    const fetchUser = async () => {
        try {
            setImage(user.photoURL)
            setName(user.displayName)
        } catch (err) {
            console.error(err);
        }
    };
    
    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/SignIn")
        fetchUser();
    }, [user, loading]);

    function SignOut() {
        const au = getAuth();
        //console.log(au)
        signOut(au).then(() => {}).catch((error) => {});
    }

    console.log(activeTab)
    if(user){
        return (
            <div className='header'>
                <div className='logo' >{name}<img src={image}></img></div>
                <div className='header-right'>
                    <Link to='/'>
                        <p className={`${activeTab === "Home" ? "active" : ""}`} onClick={()=> setActiveTab("Home")}>
                            Trang chủ
                        </p>
                    </Link>
                    <Link to='/Room'>
                        <p className={`${activeTab === "Room" ? "active" : ""}`} onClick={()=> setActiveTab("Room")}>
                        Room Chat
                        </p>
                    </Link>
                    <Link to='/View'>
                        <p className={`${activeTab === "View" ? "active" : ""}`} onClick={()=> setActiveTab("View")}>
                        ToDo List
                        </p>
                    </Link>
                    <p onClick={SignOut}>THOÁT</p>
                </div>
            </div>
          )
    }else{
        return (
            <></>
        )
    }
}

export default Header