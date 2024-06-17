import { useState } from 'react';
import { NavBar } from '../components/NavBar';
import { useUserData } from '../others/useFetchUserData';
import '../styles/land.css';

export const Land = () => {
    const token = localStorage.getItem('token');
    const { userData } = useUserData();

    // Si no hay token, se muestra la página normal
    if (!token) {
        return (
            <>
                <NavBar />
                <h2 className='main-title'>Welcome to NotesApp</h2>
            </>
        );
    }

    // Si hay token pero userData aún no se ha cargado, mostrar mensaje de carga
    if (!userData) {
        return <p>Loading...</p>;
    }

    // Cuando haya token y userData cargado, mostrar la página completa con NavBar y título
    return (
        <>
            <NavBar user={userData.name} />
            <h2 className='main-title'>Welcome to NotesApp</h2>
        </>
    );
};
