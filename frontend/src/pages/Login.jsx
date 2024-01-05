import { React, useEffect, useState } from 'react';
import './Login.css';
import axios from 'axios'
import { redirect,useNavigate } from 'react-router-dom';
const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [loggedIn, setLoggedIn] = useState(false);
    const [message, setMessage] = useState('');
    const [error,setError] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('jwt')) {
            setLoggedIn(true)
        }

    }, [])
    const showToast = () => {
        const toast = document.querySelector('.displayToast').classList;
        toast.add('show', 'slideIn');
        setTimeout(() => {
          toast.remove('show', 'slideIn');
        }, 3000);
      };

    const showErrorToast = () => {
        const toast = document.querySelector('.displayErrorToast').classList;
        toast.add('show', 'slideIn');
        setTimeout(() => {
          toast.remove('show', 'slideIn');
        }, 3000);
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            if(loggedIn == false){

                const response = await axios.post("http://localhost:3000/login", {
                    email: email,
                    password: password
                });
                
                const token = response.data.token;
                localStorage.setItem("jwt", token);
                setLoggedIn(true);
                setMessage("Logged in successfully")
                // Display toast
                showToast();
                setTimeout(() => {
                    navigate('/')
                }, 1000);
            }else{
                setMessage("Already logged in")
                showToast();
                setTimeout(() => {
                    navigate('/')
                }, 1000);
            }
        } catch (err) {
            setError(true)
            setMessage("email and password does not match");
            showErrorToast();
            console.log(err.message);
        }
    };
    
    return (
        <div className='container'>
            {loggedIn &&
                <div className='displayToast'>
                    <p> {message}</p>
                </div>}
            {error &&
                <div className='displayErrorToast' >
                    <p> {message}</p>
                </div>}
            <form action="POST" onSubmit={handleSubmit} className='login-form' >

                <div className='inputFields'>
                    <label >Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => {setEmail(e.target.value)}}
                        placeholder='Enter email address .. '
                        required
                    />
                
                
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Enter password .. '
                        required
                    />
                </div>
                <button type="submit" className='login-btn'>Submit</button>
                <p>new member join <a href="/signup">here</a></p>
            </form>
        </div>
    )
}
export default Login;
