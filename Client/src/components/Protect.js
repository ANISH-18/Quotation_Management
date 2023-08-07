import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';

export default function Protect(props) {

    const { Component } = props;
    const navigate = useNavigate();

    useEffect(() => {
        let userid = localStorage.getItem('userid');
        console.log(">>>>>>>>", userid);
        if (!userid) {
            navigate("/login");
        }
    }, []);

    return (
        <div>
            <Component />
        </div>
    )
}
