import { useNavigate } from 'react-router-dom';


export const accountAPI = async (id) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    try {
        const response = await fetch(
            `http://localhost:2710/user/settings/${id}`,
            {
                method: 'DELETE',
                headers: {
                    auth: token
                }
            }
        );
        if (response.ok) {
            alert('User deleted successfully')
            localStorage.removeItem('token')
            navigate('/')
        }else{
            alert('Error deleting the account')
        }
    } catch (error) {
        console.log('Error', error);
    }
};
