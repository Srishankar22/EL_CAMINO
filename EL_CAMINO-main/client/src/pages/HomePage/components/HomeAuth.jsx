import React from 'react';
import styles from './HomeAuth.module.css';
import { useNavigate } from 'react-router-dom';

export const HomeAuth = () => {

  const navigate = useNavigate();

  return (
    <div className={styles.homeAuth}>
      <p>FOSTERING<br/>BOUNDLESS<br/>LEARNING</p>
      <button id={styles.button1} onClick={() => (
navigate("/signup")
  )}>SIGN UP</button><br/>
      <button id={styles.button2} onClick={() => (
navigate("/login")
  )}>LOGIN</button>
    </div>
  )
}
