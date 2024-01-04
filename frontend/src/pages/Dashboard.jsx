import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { FaRegEdit } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
function Dashboard() {
  const [userInfo, setUserInfo] = useState([]);
  const navigate = useNavigate();
  // console.log(userInfo)
  useEffect(() => {
    axios.get("http://localhost:3000/api/users")
      .then((res) => {
        const userDetailMap = res.data.map(user => ({
          _id : user._id,
          username: user.username,
          phone: user.phone,
          email: user.email
        }));
        
        setUserInfo(userDetailMap);
        console.log(userInfo)
      });
  }, []);
  const deleteHandler = (userId) =>{
    axios.post("http://localhost:3000/api/delete-users",{_id: userId})
    .then((res) => {
     console.log(res.data) 
    })
    navigate("/")
  }
  return (
    <div>
        <Header/>      
        <div className='container1'>

      {userInfo.length === 0 ? (
          <p>No users found</p>
          ) : (
              <div>
          {userInfo.map((user) => (
            <div key={user._id} className='gridItem'>
                <div className='icons'>

                <FaRegEdit style={{backgroundColor:"lightblue",padding:"1px",borderRadius:"5px",margin:"0px 5px",cursor:"pointer"}} />
                <IoTrashBin style={{backgroundColor:"#ff5460", padding:"1px",borderRadius:"5px",margin:"0px 5px",cursor:"pointer"}} onClick={()=>deleteHandler(user._id)}/>
                </div>
              <h4>username :{user.username}  </h4>
              <h4>phone : {user.phone} </h4>
              <h4>email : {user.email}</h4>
            </div>
          ))
          
          }
        </div>
      )}
    </div>
      </div>
  );
}

export default Dashboard;
