import { useState, useEffect } from 'react';
import { NavBar } from '../components/NavBar';
import { useUserData } from '../others/useFetchUserData';
import '../styles/notes.css';
import Alert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import BasicModal from '../components/Modal';
import { notesApis } from '../others/notesAPI';
import EditModal from '../components/EditModal';

export const Notes = () => {
    const { userData, triggerUpdate } = useUserData();
    const [showAlert, setShowAlert] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        body: '',
        isImportant: false,
    });

    const { deleteNote, showErrorAlert, showSuccessAlert } =
        notesApis(formData, setFormData, triggerUpdate);

    if (userData === null) {
        return <p>...Cargando</p>;
    }

    return (
        <>
            <NavBar user={userData.name} />

            <section className='notes-container'>
                <h2 className='notes-title'>
                    Notes: {userData.userNotes.length}
                </h2>
                <BasicModal triggerUpdate={triggerUpdate} />

                {showErrorAlert && (
                    <Alert severity='error'>Error al eliminar la nota</Alert>
                )}
                {showSuccessAlert && (
                    <Alert severity='success'>
                        Nota eliminada correctamente
                    </Alert>
                )}

                <section className='notes'>
                    {userData.userNotes.map((note) => (
                        <div
                            className={note.isImportant ? 'Important' : 'Note'}
                            key={note._id}
                        >
                            <h3 className='note-title'>
                                {note.title}
                                {note.isImportant && (
                                    <StarIcon color='important' />
                                )}
                            </h3>

                            <p className='note-body'>{note.body}</p>
                            <DeleteIcon
                                color='red'
                                className='del-icon'
                                onClick={() => deleteNote(note._id)}
                            />
                            <EditModal  triggerUpdate={triggerUpdate} id={note._id}/>
                        </div>
                    ))}
                </section>
            </section>
        </>
    );
};
