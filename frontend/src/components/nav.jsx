import LocalDiningIcon from '@mui/icons-material/LocalDining';
import { useNavigate } from 'react-router-dom';
import '../styles/landing.css'
const Nav = () =>{
    const navigate = useNavigate()
    const handleLogout = () =>{
        localStorage.removeItem('userdetails')
        navigate('/')
    }
    return(
        <div className="nav">
            <div className='logo'>
                <LocalDiningIcon/> 
                <h3>Recipe App</h3>
            </div>
            <div>
                <button onClick={handleLogout}>Logout</button>
            </div>
            
        </div>
    )
}
export default Nav