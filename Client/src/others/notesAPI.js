
import { useEffect, useState } from 'react';

export const notesApis = (formData, setFormData, triggerUpdate, setOpen) => {
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const createNote = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:2710/user/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    auth: `${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Note created');
                setShowSuccessAlert(true);
                setShowErrorAlert(false);
                setFormData({
                    title: '',
                    body: '',
                    isImportant: false,
                });
                triggerUpdate();
                setTimeout(() => {
                    setShowSuccessAlert(false)
                    setOpen(false);
                }, 1000);
            } else if (response.status === 500) {
                setShowErrorAlert(true);
                setShowSuccessAlert(false);
            }
        } catch (error) {
            console.log(error);
            setShowErrorAlert(true);
            setShowSuccessAlert(false);
        }
    };

    const deleteNote = async (id) => {

        const token = localStorage.getItem('token');
        try {
            const response = await fetch(
                `http://localhost:2710/user/notes/options/${id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'aplication/json',
                        auth: token,
                    },
                }
            );

            if (response.ok) {
                console.log('Note deleted successfully');
                setShowSuccessAlert(true);
                setTimeout(() => {
                    setShowSuccessAlert(false)
                }, 1000);
                setShowErrorAlert(false);
                setFormData({
                    title: '',
                    body: '',
                    isImportant: false,
                });
                triggerUpdate();

            } else if (response.status === 500) {
                setShowErrorAlert(true);
                setShowSuccessAlert(false);
            }else if (response.status === 404) {
                console.log('error');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const editNote = async (id) => {

            const token = localStorage.getItem('token');
            try {
                const response = await fetch(
                    `http://localhost:2710/user/notes/options/${id}`,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            auth: token,
                        },
                        body: JSON.stringify(formData)
                    }
                );
    
                if (response.ok) {
                    console.log('Note edited successfully');
                    setShowSuccessAlert(true);
                    setShowErrorAlert(false);
                    setFormData({
                        title: '',
                        body: '',
                        isImportant: false,
                    });
                    triggerUpdate();
                    setTimeout(() => {
                        setShowSuccessAlert(false)
                        setOpen(false);
                    }, 1000);
                } else if (response.status === 500) {
                    setShowErrorAlert(true);
                    setShowSuccessAlert(false);
                }else if (response.status === 404) {
                    console.log('error');
                }
            } catch (error) {
                console.log(error);
            }
    }

    return{
        createNote,
        editNote,
        deleteNote,
        showErrorAlert,
        showSuccessAlert, 
    }
};
