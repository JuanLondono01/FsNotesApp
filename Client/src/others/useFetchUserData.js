import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useUserData = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null); // Inicializamos userData como null
    const [updateTrigger, setUpdateTrigger] = useState(0);

    const triggerUpdate = useCallback(() => {
        setUpdateTrigger(prev => prev + 1);
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await fetch('http://localhost:2710/user/profile', {
                    headers: {
                        auth: `${token}`, // Usamos Authorization correctamente
                    },
                });

                if (response.ok) {
                    const userData = await response.json();
                    setUserData(userData);

                    // Aquí puedes manejar la lógica para mostrar los datos del usuario en tu dashboard
                } else {
                    console.error('Failed to fetch user data');
                    localStorage.removeItem('token')
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [navigate, updateTrigger]); // Aseguramos que navigate esté en la lista de dependencias

    return {
        userData,
        triggerUpdate
    };
};
