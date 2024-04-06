import React, { useState, useEffect } from 'react';
import styles from './Login.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { axiosPublic } from '../../axiosPublic';


export const Login = () => {
  const images = ['p1.jpg','p3.jpg'];
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [username,setUserName] = useState('');
  const [password,setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(images[(images.indexOf(currentImage) + 1) % images.length]);
    }, 4000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clean up on component unmount
  }, [currentImage, images]);

  useEffect(() => {
    const token = localStorage.getItem('jsonwebtoken');
    if(token){
      navigate('/test');
      
    }
    else{
      setLoading(false);
    }
  })

  




  
  const handleLogin = () => {
    const credentials = {
      username: username,
      password: password,
    };
  
    axiosPublic.post('auth/login', credentials)
      .then(response => {
        if (response.data.status === 'Ok!') { // Check if login is successful based on the response from your backend
          console.log(response.data);  
          const token = response.data.token; // Access token property correctly
          localStorage.setItem('jsonwebtoken', token); // Save the token
          navigate('/test'); // Navigate to the test page
        } else {
          alert(response.data.message || "Login failed. Please try again."); // Show error message
        }
      })
      .catch(error => {
        console.error('Error during login:', error);
        alert('An error occurred. Please try again later.'); // Handle any errors that occurred during the request
      });
  };
  



if(loading){
  return(
    <p>Loading....</p>
  )
}
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBg} style={{ backgroundImage: `url(${currentImage})` }}></div>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>EL CAMINO</h1>
          <h2>TAKE CONTROL OF YOUR JOURNEY. LEARN YOUR WAY</h2>
        </div>
        <div className={styles.loginForm}>
          <h2>WELCOME BACK</h2>
            <input type="text" placeholder="username" value={username}
                    onChange={(e) => setUserName(e.target.value)}/>
            <input type="password" placeholder="password" value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit" onClick={handleLogin}>LOGIN</button>
        </div>
        <footer className={styles.footer}>
          <p>&copy; {new Date().getFullYear()} EL CAMINO. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};
