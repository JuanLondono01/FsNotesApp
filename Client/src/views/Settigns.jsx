import React from 'react';
import { NavBar } from '../components/NavBar';
import { useUserData } from '../others/useFetchUserData';
import '../styles/settings.css';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Settings = () => {
    const { userData } = useUserData();
    const navigate = useNavigate();

    if (userData === null) {
        return <p>...Cargando</p>;
    }

    const handleLogOut = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleDeleteAccount = async () => {
        if (confirm('Do you want to delete your account?')) {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(
                    `http://localhost:2710/user/settings/${userData._id}`,
                    {
                        method: 'DELETE',
                        headers: {
                            'auth': `${token}`,
                        },
                    }
                );
                if (response.ok) {
                    alert('User deleted successfully');
                    localStorage.removeItem('token');
                    navigate('/');
                } else {
                    alert('Error deleting the account');
                }
            } catch (error) {
                console.log('Error', error);
            }
        }
    };

    return (
        <>
            <NavBar user={userData.name} />

            <section className='container'>
                <h3 className='name'>{userData.name}</h3>
                <div className='settings-container'>
                    <Button
                        variant='contained'
                        color='dark'
                        fullWidth
                        onClick={handleLogOut}
                    >
                        LogOut
                    </Button>
                    <Button
                        variant='contained'
                        color='red'
                        fullWidth
                        onClick={handleDeleteAccount}
                    >
                        Delete account
                    </Button>
                </div>
            </section>
        </>
    );
};
