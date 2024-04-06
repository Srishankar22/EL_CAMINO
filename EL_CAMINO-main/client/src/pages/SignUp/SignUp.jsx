import React, { useState, useEffect } from 'react';
import styles from './SignUpPage.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { axiosPublic } from '../../axiosPublic';

export const SignUp = () => {
  const images = ['p1.jpg', 'p3.jpg'];
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  //const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [interest, setInterest] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(images[(images.indexOf(currentImage) + 1) % images.length]);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval); // Clean up on component unmount
  }, [currentImage, images]);


  const navigate = useNavigate();

  const homeNavigate = () => {
    navigate('/test');
  }

  const handleSignUp = async (event) => {
    event.preventDefault();
    // Basic validation
    if (!firstName || !lastName || !email || !password || !confirmPassword || !username || !interest) {
      window.alert('Please fill in all fields');
    } else if (password.length < 8 || !/\d/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      window.alert('Password must be 8 characters long and contain at least one special character or number');
    } else if (password !== confirmPassword) {
      window.alert('Passwords do not match');
    } else{

      try {
        const response = await axiosPublic.post('auth/register', {
          name: `${firstName} ${lastName}`,
          email: email,
          username: username,
          password: password,
          interest: interest,
          points: 800
        });

        if (response.data.status == 'Ok!') {
          console.log('Sign-up successful');
          console.log(response.data.message)

          // Reset form fields
          setFirstName('');
          setLastName('');
          setEmail('');
          setUsername('');
          setPassword('');
          setConfirmPassword('');
          setInterest('');

          console.log(response.data);  
          const token = response.data.result.token; // Access token property correctly
          console.log(token);
          localStorage.setItem('jsonwebtoken', token)

          homeNavigate();

          

        } else if(response.data.status == 'Error!'){
          console.log(response.data);
          window.alert(`${response.data.message}`);
          setFirstName('');
          setLastName('');
          setEmail('');
          setUsername('');
          setPassword('');
          setConfirmPassword('');
          setInterest('');
        }
      

      } catch (err) {
        console.log(response.data);
        //window.alert(err.message)
        
      }
    }
  };

  return (
    <>
      <div className={styles.signUpContainer}>
        <div className={styles.loginBg} style={{backgroundImage: `url(${currentImage})`}}>
          <div className={styles.overlay}>
            <div className={styles.content}>
              <div className={styles.signUpForm}>
                <h2>SIGN UP</h2>
                <form onSubmit={handleSignUp}>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <p>Password must be 8 characters long and contain at least one special character or number</p>
                  <input
                    type="text"
                    placeholder="Interest"
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                  />
                  <button type="submit">SIGN UP</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
