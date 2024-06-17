import React, { useState, useEffect } from 'react';
import { useUserData } from '../others/useFetchUserData';
import { NavBar } from '../components/NavBar';
import Button from '@mui/material/Button';
import '../styles/mainp.css';
import { Link, useNavigate } from 'react-router-dom';

export const MainPage = () => {
    const navigate = useNavigate();
    const { userData } = useUserData();

    if (userData === null) {
        return <p>...Cargando</p>
    }


    return (
        <div>
            <NavBar user={userData.name} />
            <div className='container'>
                <section className='user-data'>
                    <h3 className='userData name'>{userData.name}</h3>
                    <p className='userData email'>{userData.email}</p>
                </section>
                {userData && (
                    <section className='opts-container'>
                        <Button
                            variant='contained'
                            color='buttons'
                            size='large'
                        >
                            <Link className='notes-btn' to={'/user/notes'}>
                                Notes: {userData.userNotes.length}
                            </Link>
                        </Button>
                        <Button
                            variant='contained'
                            color='options'
                            size='large'
                        >
                            <Link className='notes-btn' to={'/user/settings'}>Settings</Link>
                        </Button>
                    </section>
                )}
            </div>
        </div>
    );
};
