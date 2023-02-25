import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import '../styles/login.css'
const Login = () =>{
    const [data, setData] = useState({email:'', password :''})
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const handleLogin = async() =>{
        try{
            if(data.email && data.password){
                const user = await axios.post('https://recipe-yzmc.onrender.com/login', data)
                if(user.data.token){
                    localStorage.setItem("jwt", data.token)
                    localStorage.setItem("user", JSON.stringify(user.data.user))
                    setData({email:'', password:''})
                    navigate('/landing')
                }
            }
            else{
                setError('All fields mandatory')
            }
        } catch(e){
            setError("*User not found")
        }
    }
    const handleReg = () =>{
        navigate('/register')
    }
    return(
        <div className="container">
            <div className="login">
                <h1>Sign In</h1>
                <div className="inp">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" placeholder="Enter Email" onChange={(e)=>setData({...data, email:e.target.value})} value={data.email}/>
                </div>
                <div className="inp">
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter Password" onChange={(e)=>setData({...data, password:e.target.value})} value={data.password}/>
                </div>
                <div className="inp but">
                    <button onClick={handleLogin} className="sub">Submit</button>
                </div>
                {error}
                <div className="inp but">
                    <button onClick={handleReg} className="sub sig">Sign Up</button>
                </div>
            </div>
        </div>
    )
}
export default Login