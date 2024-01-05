import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { redirect,useNavigate } from 'react-router-dom';
import './Signup.css';
const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState(''); // For radio buttons, you might want to use a single state variable
  const [hearabtus, setHearabtus] = useState([]);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const[loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const handleCheckboxChange = (value) => {
    const updatedhearabtus = [...hearabtus];

    if (updatedhearabtus.includes(value)) {
      
      updatedhearabtus.splice(updatedhearabtus.indexOf(value), 1);
    } else {
    
      updatedhearabtus.push(value);
    }

    setHearabtus(updatedhearabtus);
  };
  useEffect(()=>{
      if(localStorage.getItem('jwt')){
        setLoggedIn(true);
        setErrorMessage("Already logged in")
      }
  },[])
  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform form submission logic here
    // name, email, phone, gender, hearabtus, city, state, password
    console.log({
      name,
      email,
      phone,
      gender,
      hearabtus,
      city,
      state,
    });
    let data = JSON.stringify({
        name: name,
        email: email,
        phone: phone,
        gender: gender,
        hearabtus: hearabtus,
        city: city,
        state: state,
        password: password
    })
    let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:3000/signup",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      try {
          axios.request(config).then((res)=>{
            
            console.log(res.data.result.registration, res.data.result.token,res)
            localStorage.setItem("jwt", res.data.result.token);
            localStorage.setItem("user", JSON.stringify(res.data.result.registration));
            setError(true);
            setTimeout(() => {
              navigate('/')
          }, 1000);
            setErrorMessage(res.data.result.msg)
          })
      } catch (error) {
        setErrorMessage(error.message);
        console.log(error.message)
      }
  };

  return (
    <>
    {loggedIn && 
    <div className="displayMsg">
      <h3>{errorMessage}
      </h3>
    </div>
    }
    {error && <p>{errorMessage}</p>} 
    <div className='container2'>
    <form onSubmit={handleSubmit} className='signup-form'>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="inputFields1"
          pattern="[A-Za-z ]+"

          required
          />
      </div>
      

      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          className="inputFields1"
          onChange={(e) => setEmail(e.target.value)}

        //   pattern="[a-zA-Z0-9]+"
          required
        />
      </div>

      <div>
        <label>Phone:</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="inputFields1"
          pattern="[0-9]+"
          required
        />
      </div>

      <div>
        <label>Gender:</label>
        <br />
        <div className="option-container">

        <label>
          <input
            type="radio"
            value="Male"
            checked={gender === 'Male'}
            onChange={() => setGender('Male')}
          />
          Male
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="Female"
            checked={gender === 'Female'}
            onChange={() => setGender('Female')}
            />
          Female
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="Others"
            checked={gender === 'Others'}
            onChange={() => setGender('Others')}
            />
          Others
        </label>
        <br />
      </div>
      </div>

      <div>
        <label>How did you hear about this?</label>
        <br />
        <label>
          <input
            type="checkbox"
            value="LinkedIn"
            checked={hearabtus.includes('LinkedIn')}
            // className="inputFields1"
            onChange={() => handleCheckboxChange('LinkedIn')}
          />
          LinkedIn
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            value="Friends"
            checked={hearabtus.includes('Friends')}
            // className="inputFields1"
            onChange={() => handleCheckboxChange('Friends')}
            />
          Friends
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            value="Job Portal"
            checked={hearabtus.includes('Job Portal')}
            // className="inputFields1"
            onChange={() => handleCheckboxChange('Job Portal')}
          />
          Job Portal
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            value="Others"
            checked={hearabtus.includes('Others')}
            // className="inputFields1"
            onChange={() => handleCheckboxChange('Others')}
          />
          Others
        </label>
        <br />
      </div>

      <div>
        <label>City:</label>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="inputFields1"
          required
        >
          <option value="">Select City</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Pune">Pune</option>
          <option value="Ahmedabad">Ahmedabad</option>
        </select>
      </div>

      <div>
        <label>State:</label>
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="inputFields1"
          list="stateSuggestions"
          required
        />
        <datalist id="stateSuggestions">
          <option value="Gujarat" />
          <option value="Maharashtra" />
          <option value="Karnataka" />
        </datalist>
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="inputFields1"
          //   pattern="[A-Za-z ]+"
          required
          />
      </div>
      <p>Already have account click <a href="/login">here</a></p>
      <button type="submit" className='signup-btn'>Submit</button>
    </form>
    </div>
    </>
  );
};

export default Signup;
