import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
function Dashboard() {
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/users")
      .then((res) => {
        const userDetailMap = res.data.map(user => ({
          username: user.username,
          phone: user.phone,
          email: user.email
        }));
        console.log(res.data);
        setUserInfo(userDetailMap);
      });
  }, []);

  return (
    <div>
        <Header/>      
      {userInfo.length === 0 ? (
        <p>No users found</p>
      ) : (
        <div>
          {userInfo.map((user, index) => (
            <div key={index} className='gridItem'>
              <h4>{user.username}</h4>
              <h4>{user.phone}</h4>
              <h4>{user.email}</h4>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
