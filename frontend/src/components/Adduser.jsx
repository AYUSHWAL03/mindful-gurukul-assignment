
import React, { useState } from 'react';
import Modal from 'react-modal';
import './Adduser.css'
Modal.setAppElement('#root'); // Set the root element for accessibility

const Adduser = ({ isOpen, closeModal, addUser }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    addUser({ username, email, phone });
    // console.log(username)
    closeModal(); 
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Add User Modal"
      className='modal-box'
    >
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required/>
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}required/>
        </label>
        <br />
        <label>
          Phone:
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required/>
        </label>
        <br />
        <button type="submit" className='submit-btn'>Add User</button>
      </form>
    </Modal>
  );
};

export default Adduser;
