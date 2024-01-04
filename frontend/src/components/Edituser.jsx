import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './Edituser.css'; 



const Edituser = ({ isOpen, closeModal, userId, editUser }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(()=>{
    axios.post('http://localhost:3000/api/get-user',{_id: userId})
    .then((res)=>{
        setUsername(res.data.username);
        setEmail(res.data.email);
        setPhone(res.data.phone);
        console.log(res)
    })
    console.log(userId)
  },[userId])

  const handleSubmit = (e) => {
    e.preventDefault();
    
    editUser(userId, { username, email, phone });
    closeModal(); 
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Edit User Modal"
      className='modal-box'
    >
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </label>
        <br />
        <label>
          Phone:
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required/>
        </label>
        <br />
        <button type="submit" className='submit-btn'>Save Changes</button>
      </form>
    </Modal>
  );
};

export default Edituser;
