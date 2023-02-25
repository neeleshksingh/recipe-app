import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import "../styles/landing.css"
import { useEffect, useState } from 'react';
import axios from 'axios';

const Landing =()=>{
    const navigate = useNavigate()
    const [arr, setArr] = useState([])
    const [error, setError] = useState('')
    const [search, setSearch] = useState('')

    useEffect(()=>{
        recipes()
    },[])

    const recipes = async() =>{
        const userStr = localStorage.getItem('user')
        if(!userStr){
            return
        }
        const user = JSON.parse(userStr)[0]?._id
        if(!user){
            return
        }
        try{
            const data = await axios.get(`http://localhost:5412/recipe/${user}`)
            if(data){
                setError('')
                setArr(data.data.data)
            }
        }catch(e){
            setError(e.data.message)
        }
    } 

    useEffect(()=>{
        const userStr = localStorage.getItem('user')
        if(!userStr){
            return
        }
        const user = JSON.parse(userStr)[0]?._id
        if(!user){
            return
        }

        const res = axios.get(`http://localhost:5412/find/${user}/${search}`).then(res=>{
            setArr(res.data.result)
        })
    }, [search])

    if(search===''){
        recipes()
    }

    const handlePost =()=>{
        navigate('/new')
    }

    return(
        <div className='landing'>
            <div className='ser'>
                <input type="text" id='ser' onChange={(e)=>setSearch(e.target.value)} />
                <button className='ser-ico'><SearchIcon/></button>
            </div>
            <div className='ser'>
                <button className='new' onClick={handlePost}>New</button>
            </div>
            <div className='all-recipe'>
                All Recipes
                {arr.map((data, index)=>{
                return(
                    <div key={index} className='posts'>
                        <img src={data.image.url} alt={data.title} />
                        <div>{data.title}</div>
                    </div>
                )
            })} 
            </div>
        </div>
    )
}

export default Landing
