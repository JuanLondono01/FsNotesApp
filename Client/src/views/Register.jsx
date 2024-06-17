import '../styles/register.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { NavBar } from '../components/NavBar';
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Input = ({
    label,
    type = 'text',
    value,
    onChange,
    name,
    color = 'primary',
    error,
}) => {
    return (
        <TextField
            id='standard-basic'
            label={label}
            type={type}
            variant='standard'
            className='input'
            color={color}
            value={value}
            onChange={onChange}
            name={name}
            error={error}
            helperText={error ? 'Passwords do not match' : ''}
        />
    );
};

const SendButton = ({ text }) => {
    return (
        <Button variant='contained' color='buttons' type='submit'>
            {text}
        </Button>
    );
};

export const Register = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [inUse, setinUse] = useState(false)
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.confirmPassword !== formData.password) {
            setError(true);
            showErrorAlert(true);
        } else {
            const response = await fetch(
                'http://localhost:2710/access/register',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

            if (response.ok) {
                console.log('Registro exitoso');
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                })
                setShowSuccessAlert(true);
                navigate('/access/login')
            }else if(response.status === 400){
                setinUse(true)
            } 
            else {
                console.error('Error en el registro');
                setShowErrorAlert(true);
            }
        }
    };

    return (
        <>
            <NavBar />
            <form
                method='POST'
                className='form-container'
                onSubmit={handleSubmit}
            >
                <h2 className='reg-title'>Register</h2>
                <Input
                    label='userName'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                />
                <Input
                    label='Email'
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                />
                <Input
                    label='Password'
                    type='password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                />
                <Input
                    label='Confirm password'
                    type='password'
                    name='confirmPassword'
                    color={error ? 'error' : 'primary'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={error}
                />
                <SendButton text='Register' />
                {showSuccessAlert && (
                    <Alert severity='success'>
                        User registered successfully
                    </Alert>
                )}
                {showErrorAlert && (
                    <Alert severity='error'>
                        Error in registration process or passwords do not match.
                    </Alert>
                )}
                {inUse && (
                    <Alert severity='error'>
                        The email is already in use
                    </Alert>
                )}
                <span>
                    Already have an account?
                    <Link
                        to='/access/login'
                        className='login-link'
                        color='secondary'
                    >
                        LogIn
                    </Link>
                </span>
            </form>
        </>
    );
};
