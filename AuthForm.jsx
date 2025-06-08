import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
const AuthForm=()=>{
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const[users,setUsers]=useState('');
  const Navigate = useNavigate();
  const[filteredusers,setFilteredUsers]=useState('');
  const handleSubmit =async(e) => {
      e.preventDefault();
      // try {
      //     const response = await axios.post('http://localhost:8000/reg', {
      //         username,
      //         password,
      //     });

      //     if (response.data.status === 'Success') {
      //         navigate('/home'); // Redirect to home page
      //     } else {
      //         setError(response.data.message);
      //     }
      // } catch (err) {
      //     console.error('Login error:', err);
      //     setError('Something went wrong. Please try again.');
      // }
  //     if (response.data.status === "Success") {
        
       
  //       const usersResponse = await axios.get("http://127.0.0.1:8000/usersinform");
  //       console.log(usersResponse.data)
  //       setUsers(usersResponse.data);
  //       setFilteredUsers(usersResponse.data);
  //       Navigate('/form',{ state: { users: usersResponse.data } } )
  //     } 
  //     else {
  //       setError(response.data.message);
  //     }
  //   } 
  //   catch (err) {
  //     console.error("Login error:", err);
  //     setError("Something went wrong. Please try again.");
  //   }  
  try {
    const response = await axios.post('https://student-login-1.onrender.com/reg', { username, password });
    if (response.data.status === "Success") {
      const usersResponse = await axios.get("https://student-login-1.onrender.com/usersinform");
      setUsers(usersResponse.data);
      setFilteredUsers(usersResponse.data);
      Navigate('/form', { state: { users: usersResponse.data } });
    }
  } catch (err) {
    if (err.response) {
      // If backend returned 400 with "detail"
      setError(err.response.data.detail || "Login failed");
    } else {
      setError("Something went wrong. Please try again.");
    }
  } 
   }

    return(
    //     <div>
      
    // <div className='head'>
    // <div className='login'>
    // <h1>&nbsp;&nbsp;𝐔𝐒𝐄𝐑𝐋𝐎𝐆𝐈𝐍</h1>
    // </div>
    // <div className='user'>
    // {/* <AccountCircleIcon/> */}
    // <h3>Username:<input type="text"    placeholder='enter your username'  
    // value={username}   onChange={(e) => setUsername(e.target.value)}                 ></input></h3>
    // </div>
    // <div className='password'>
    // <h3>Password:<input type="text" placeholder='enter your password' 
    //   value={password} onChange={(e) => setPassword(e.target.value)}                  ></input></h3>
    // <br></br>
    // </div>
    // <label>
    // <input type="checkbox"></input>remember me&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Link to="/password" ><a href='#'>forgot password?</a></Link>
      
   
    
    // </label>
    

    // <div className='submit'>
    // <button onClick={handleSubmit}>Submit</button>
    // </div>
    // {error && <p style={{ color: 'red' }}>{error}</p>}
    // <div className='signup'>
    // {/* <button onClick={signup}>signup</button> */}
    // <p>
    //     don't have an account?<Link to="/signup">Signup</Link>
    // </p>
    // </div>
    
    // </div>
    // </div>
    <div className="container">
      <div className="login-box">
        <h1 className="login-title">User Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="signup-text" >Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <Link to="/passwordForm" className="forgot-link">Forgot password?</Link>
          </div>

          <button type="submit" className="submit-btn">Login</button>

          {error && <p className="error-message">{error}</p>}
          
          <p className="signup-text">
            Don't have an account? <Link to="/signup" className="signup-link">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
    )
}
export default AuthForm