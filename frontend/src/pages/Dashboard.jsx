import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { FaRegEdit } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import Edituser from '../components/Edituser';
import { IoFilterCircle } from "react-icons/io5";


function Dashboard() {
  const [userInfo, setUserInfo] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [editModal, setEditModal] = useState(false);
  const [searchUser, setSearchUser] = useState('')
  const [filteredUser, setFilteredUser] = useState([])
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/api/users")
      .then((res) => {
        const userDetailMap = res.data.map(user => ({
          _id: user._id,
          username: user.username,
          phone: user.phone,
          email: user.email
        }));

        setUserInfo(userDetailMap);
        setFilteredUser(userDetailMap);
        console.log(userInfo)
      });
      if(localStorage.getItem("jwt")){
        setLoggedIn(true)
      }
      
  }, []);

  const editHandler = (userId) => {
    setEditModal(true);
    setSelectedUser(userId)
    console.log("User _id is :", selectedUser)
  }
  const handleUserEdit = (userId, userData) => {
    console.log('Editing user:', userId, userData);
    axios.patch('http://localhost:3000/api/update-user', {
      _id: userId,
      username: userData.username,
      phone: userData.phone,
      email: userData.email
    }).then((res) => {
      console.log(res)
    })
  }
  const deleteHandler = (userId) => {
    confirm("Are you sure you want to delete").valueOf(true).then(() => {
      axios.post("http://localhost:3000/api/delete-users", { _id: userId })
        .then((res) => {
          console.log(res.data)
        })
      navigate("/")

    })
  }
  const applySearch = () => {
    // Filter users based on the search input
    const filtered = userInfo.filter(user =>
      user.username.toLowerCase().includes(searchUser.toLowerCase()) ||
      user.phone.toString() === searchUser ||
      user.email.toLowerCase().includes(searchUser.toLowerCase())
    );

    setFilteredUser(filtered);
  };
  const clearSearch = () => {
    setSearchUser('')
    setFilteredUser(userInfo)
  }
  const filterUserName = () =>{
    console.log('clicked');
    const filtered = [...userInfo].sort((user1,user2)=>{
      var userLocal1 = user1.username.toString()
      var userLocal2 = user2.username.toString()
      return userLocal1.localeCompare(userLocal2)})

    setFilteredUser(filtered);
  }
  return (
    <div>

      <Header />
      <div className='container1'>
      
        {userInfo.length === 0 ? (
          <p>No users found</p>
        ) : (
          <div>
            <div className="searchItem-container">
              <input type="text"
                placeholder='Search .. '
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
              />
              <button className='apply-btn' onClick={applySearch}>apply</button>
              <button className='clear-btn' onClick={clearSearch}>clear</button>
            </div>
            {filteredUser.map((user) => (
              <div key={user._id} className='gridItem'>
                <div className='icons'>
                {loggedIn && 
                <div>

                  <FaRegEdit style={{ backgroundColor: "lightblue", padding: "1px", borderRadius: "5px", margin: "0px 5px", cursor: "pointer" }} onClick={() => editHandler(user._id)} />
                  <IoTrashBin style={{ backgroundColor: "#ff5460", padding: "1px", borderRadius: "5px", margin: "0px 5px", cursor: "pointer" }} onClick={() => deleteHandler(user._id)} />
                </div>
                }
                </div>
                <h4>username :{user.username}  </h4>
                <h4>phone : {user.phone} </h4>
                <h4>email : {user.email}</h4>
              </div>
            ))

            }
          <h3 className='filter-btn' onClick={filterUserName}><IoFilterCircle/></h3>  
          </div>
        )}
      </div>

      <Edituser isOpen={editModal}
        closeModal={() => { setEditModal(false) }}
        userId={selectedUser}
        editUser={handleUserEdit} />
    </div>
  );
}

export default Dashboard;
