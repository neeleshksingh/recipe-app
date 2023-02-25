import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Register = () =>{
    const navigate = useNavigate()
    //const isloggedin = localStorage.getItem('userdetails')
    const [val, setVal] = useState({
        email : "",
        password: "",
        confirmpassword: ""
    })
    const [error, setError] = useState(false)
    const [passerror, setpassError] = useState(false)

    const register = async() =>{
        const verify = val.password.length !== 0 && val.email.length !== 0 && val.confirmpassword.length !== 0
        if(val.password === val.confirmpassword && verify){
        try{
            const data = await axios.post('http://localhost:5412/register', val)
            if(data.data.status === "signup failed"){
                alert(data.data.error)
            } else{
                localStorage.setItem('userdetails', JSON.stringify(data.data.userInfo))
                localStorage.setItem('token', JSON.stringify(data.data.token))
                setVal({
                    email : '',
                    password : '',
                    confirmpassword : ''
                })
                navigate("/")
            }
        } catch(e){
            alert('Userid Exists')
        }
    }
    else{
        setError(true)
        setpassError(true)
    }
}

    return(
        <div className="container">
            <div className="login">
                <h1>Sign Up</h1>
                <div className="inp">
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="Enter email" onChange={(e)=>setVal({...val, email:e.target.value})} value={val.email}/>
                </div>
                <div className="inp">
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter password" onChange={(e)=>setVal({...val, password:e.target.value})} value={val.password} />
                </div>
                <div className="inp">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="text" placeholder="Confirm password" onChange={(e)=>setVal({...val, confirmpassword:e.target.value})} value={val.confirmpassword}/>
                </div>
                <div className="check">
                    <input type="checkbox" />
                    <p>I agree with term and condition</p>
                </div>
                <div className="inp but">
                    <button className="sub" onClick={register}>Continue</button>
                </div>
                {error && <div className="er">
                    *All fields are mandatory
                </div>}
                {passerror && <div className="er">
                    *password must be same
                </div>}
            </div>
        </div>
    )
}
export default Register