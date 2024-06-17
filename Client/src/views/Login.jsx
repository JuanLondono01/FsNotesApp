import '../styles/register.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { NavBar } from '../components/NavBar';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { useState } from 'react';

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
            onChange={onChange}
            name={name}
            variant='standard'
            className='input'
            value={value}
            color={color}
            error={error}
            helperText={error && 'incorrect password'}
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

export const LogIn = () => {


    const [formData, setformData] = useState({
        email: '',
        password: '',
    });

    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();



    const handleChange = (e) => {
        const { name, value } = e.target;
        setformData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:2710/access/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const data = await response.json();
            const token = data.token;

            // Almacena el token en localStorage
            localStorage.setItem('token', token);

            setShowErrorAlert(false);
            navigate('/');
            console.log('Login successful');
            // Handle success case, e.g., redirect or show success message
        } else if (response.status === 404) {
            setShowErrorAlert(true);
            e.preventDefault();
            console.log('Email not found');
            // Handle not found error, show error message
        } else if (response.status === 401) {
            setError(true);
            e.preventDefault();
            console.log('Unauthorized');
            // Handle unauthorized error, show error message
        } else {
            setShowErrorAlert(true);
            setError(true);
            e.preventDefault();
            console.error('Unexpected error occurred');
            // Handle unexpected errors, show error message
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
                <h2 className='reg-title'>Log In</h2>
                <Input
                    name='email'
                    value={formData.email}
                    label={'Email'}
                    type='email'
                    onChange={handleChange}
                />
                {showErrorAlert && (
                    <Alert severity='error'>The email doesn't exist</Alert>
                )}
                <Input
                    name='password'
                    value={formData.password}
                    label={'Password'}
                    type='password'
                    error={error}
                    onChange={handleChange}
                />
                <SendButton text={'Log In'} />
                <span>
                    Doesn't have an account yet?
                    <Link
                        to={'/access/register'}
                        className='login-link'
                        color='secondary'
                    >
                        Register
                    </Link>
                </span>
            </form>
        </>
    );
};
