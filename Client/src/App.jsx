import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Land } from './views/Land';
import { LogIn } from './views/Login.jsx';
import { Register } from './views/Register';
import { MainPage } from './views/MainPage.jsx';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './others/MUI_colors.js';
import { Notes } from './views/Notes.jsx';
import { Settings } from './views/Settigns.jsx';

export const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Land />} />
                    <Route path='/access/login' element={<LogIn />} />
                    <Route path='/access/register' element={<Register />} />
                    <Route path='/user/profile' element={<MainPage />} />
                    <Route path='/user/notes' element={<Notes />} />
                    <Route path='/user/settings' element={<Settings/>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
};
