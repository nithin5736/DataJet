// import React from 'react'
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const LoginSucess = () => {
    const navigate = useNavigate();
    const { accesstoken } = useParams();
    useEffect(() => {
        console.log("type:  ",typeof(accesstoken));
        // localStorage.setItem("test", "abcd");
        if (accesstoken !== undefined) {
            localStorage.setItem('accessToken', accesstoken)
            console.log("newtesttoken  ",localStorage.getItem('accessToken'));
            navigate('/')
        } else {
            navigate('/login')
        }

    }, []);

    return (
        <div>
            Logged In
        </div>
    )
}

export default LoginSucess
