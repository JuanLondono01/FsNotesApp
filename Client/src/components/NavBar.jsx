import { Link } from 'react-router-dom';
import '../styles/navbar.css';
import { useEffect, useState } from 'react';

export const NavBar = ({ user }) => {
    const [userName, setUserName] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && user) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [user]);
    return (
        <div className='nav-container'>
            <Link to={'/'} className='title'>
                NotesApp
            </Link>
            {isLoggedIn ? (
                <div className='login-btn'>
                    <Link to={'/user/profile'} className='user-btn'>
                        {user}
                    </Link>
                </div>
            ) : (
                <Link to={'/access/login'} className='login-btn'>
                    Iniciar sesión
                </Link>
            )}
        </div>
    );
};
