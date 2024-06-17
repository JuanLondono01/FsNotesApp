import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import EditIcon from '@mui/icons-material/Edit';

import { notesApis } from '../others/notesAPI';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#9789ff',
    border: '1px solid #2e47ce',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

export default function EditModal({ triggerUpdate, id }) {
    const [formData, setFormData] = React.useState({
        title: '',
        body: '',
        isImportant: false,
    });
    const [open, setOpen] = React.useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);
    const [showErrorAlert, setShowErrorAlert] = React.useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const { editNote } = notesApis(formData, setFormData, triggerUpdate, setOpen);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await editNote(id);
            setShowSuccessAlert(true);
            setTimeout(() => {
                setShowSuccessAlert(false);
                setOpen(false);
            }, 1000);
        } catch (error) {
            setShowErrorAlert(true);
        }
    };

    const handleOpen = () => {
        setOpen(true);
        setShowSuccessAlert(false);
        setShowErrorAlert(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <EditIcon
                className='ed-icon'
                variant='contained'
                color='buttons'
                onClick={handleOpen}
            >
                Edit note
            </EditIcon>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
                className='modal'
            >
                <Box sx={style}>
                    <Typography
                        id='modal-modal-title'
                        variant='h4'
                        component='h6'
                        color='primary'
                    >
                        Edit note
                    </Typography>
                    <div id='modal-modal-description' sx={{ mt: 2 }}>
                        <form
                            method='POST'
                            className='note-form'
                            onSubmit={handleSubmit}
                        >
                            <TextField
                                id='standard-basic'
                                label='Title'
                                name='title'
                                value={formData.title}
                                variant='standard'
                                onChange={handleChange}
                                fullWidth
                                margin='normal'
                            />
                            <TextField
                                id='standard-basic'
                                label='Body'
                                name='body'
                                value={formData.body}
                                variant='standard'
                                onChange={handleChange}
                                fullWidth
                                margin='normal'
                            />
                            <div>
                                <label htmlFor='isImportant'>
                                    Mark as important
                                </label>
                                <Checkbox
                                    id='check'
                                    name='isImportant'
                                    checked={formData.isImportant}
                                    onChange={handleChange}
                                />
                            </div>
                            <Button
                                variant='contained'
                                color='buttons'
                                type='submit'
                            >
                                Update
                            </Button>
                            {showSuccessAlert && (
                                <Alert severity='success'>
                                    Note edited successfully
                                </Alert>
                            )}
                            {showErrorAlert && (
                                <Alert severity='error'>
                                    Error editing the note
                                </Alert>
                            )}
                        </form>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
