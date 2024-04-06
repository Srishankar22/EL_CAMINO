import React, { useState, useEffect } from 'react';
import { HomeAuth } from './components/HomeAuth';
import styles from './HomePage.module.css';
import { useNavigate } from 'react-router-dom';


export const HomePage = () => {
  const fullSubtitle = 'TAKE CONTROL OF YOUR JOURNEY. LEARN YOUR WAY';
  const [subtitle, setSubtitle] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();


  useEffect(() => {
    const timer = setInterval(() => {
      setSubtitle((prevSubtitle) => {
        if (prevSubtitle?.length < fullSubtitle?.length) {
          return fullSubtitle?.slice(0, prevSubtitle?.length + 1);
        }
        return prevSubtitle.trim();
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);


  useEffect(() => {
    const token = localStorage.getItem('jsonwebtoken');
    if(token){
      navigate('/test');
      
    }
    else{
      setLoading(false);
    }
  })


  return (
    <>
      <div className={styles.homePageBG}>
        <div className={styles.titleWrapper}>
          <div id={styles.title}>EL CAMINO</div>
          <div id={styles.subtitle}>&nbsp;{subtitle}&nbsp;</div>
        </div>
        <div id ={styles.image}>
          <img src="vector2.png" alt="study image" />
        </div>
        <HomeAuth id={styles.homeAuthComponent}/>
      </div> 
    </>
  )
}
