import { React,useEffect,useState } from 'react';
import './Header.css';
import { IoMdAddCircleOutline } from "react-icons/io";
import Adduser from './Adduser';
import axios from 'axios' 

     const Header = () =>{
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [isloggedIn,setLoggedIn] = useState(false);
        useEffect(()=>{
            if(localStorage.getItem('jwt')!== undefined){
                setLoggedIn(true);
            }
        },[])
        const openModal = () => {
            setIsModalOpen(true);
        };
        const closeModal = () => {
            setIsModalOpen(false);
        };
        
        const handleAddUser = async(userData) => {
            // Add your logic to handle adding a user (e.g., API call or local state update)
            await axios.post('http://localhost:3000/api/post-userdata',userData).then((res)=>{
                console.log(res);
            })
            console.log('Adding user:', userData);
        };
    return (
        <div className='header'>
            <h2>User Dashboard</h2> 
            {isloggedIn === true ? (
                <div>
                <h4 className='addUser-btn' onClick={openModal}> Add User <IoMdAddCircleOutline style={{padding:"0.1rem 0.2rem"}}/></h4>
                <Adduser isOpen={isModalOpen} closeModal={closeModal} addUser={handleAddUser}/>
                </div>
            ):(
                <p className='addUser-btn'><a href="/login">Login</a></p>
            )}
            
        </div>
    )
}
export default Header;