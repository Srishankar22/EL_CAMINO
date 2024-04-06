import React, { createContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import ReactPlayer from 'react-player';
import LikeButton from './components/LikeButton';
import styles from './VideoPlayer.module.css';
import { jwtDecode } from 'jwt-decode';
import { axiosPublic } from '../../axiosPublic';

export const AppContext = createContext(null);

export const VideoPlayer = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [responseCourse, setResponseCourse] = useState('');
  const [videoLoaded, setVideoLoaded] = useState(false); // State to track video loading
  const [videoLikes, setVideoLikes] = useState(null);
  const [videoRating, setVideoRating] = useState(null);
  const [videoOwner, setOwnerName] = useState(null)
  const [videoDescription , setDescription] = useState('');
  const [videoViews, setVideoViews] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userData, setUserData] = useState(null);


  const token = localStorage.getItem('jsonwebtoken');

  useEffect(() => {
    if(token){
        const decoded = jwtDecode(token)
        setUserName(decoded['username'])
    }
  }, [token]);

  useEffect(() => {
    const fetchUser = async () => {
        try {
            const userResponse = await axiosPublic.get(`users/${userName}`);
            setUserData(userResponse.data)
            setUserId(userResponse.data['id'])

          } catch (error) {
            console.error('Error fetching data:', error);
          }
    }
      
      fetchUser();
  }, [userData]);


  const { id } = useParams();
  console.log(id)


  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await axiosPublic.get(`courses/${id}`);
        setVideoUrl(response.data.video);
        setResponseCourse(response.data.courseName);
        setVideoLikes(response.data['likes']);
        setVideoViews(response.data['views']);
        setCourseId(response.data['courseId']);
        setVideoRating(response.data.rating);
        setOwnerName(response.data.ownerId);
        setDescription(response.data.description);
      } catch (error) {
        console.log("Error fetching video data:", error);
      }
    };

    fetchVideoData();
  }, [id]);

  const handleVideoReady = () => {
    setVideoLoaded(true);
  };

  if(!token){
    return(
        <p>Unauthorized user..</p>
    )
  }


  return (
    <div className={styles.fullPage}>

      <div className={styles.top}>
        <h2 id={styles.ELCAMINO}>EL CAMINO</h2>
          
        <div className={styles.navi}>
          <Link to="/test">HOME</Link>
          <Link to="/upload">UPLOAD</Link>
        </div>

        <div className={styles.profileBtn}>
          <img src='/profile.png' alt="Profile" />
          {userData ? (
              <div className={styles.userData}>

                  <div className={styles.circle}>
                  <span style={{textTransform: 'uppercase'}}>{userData['username'] ? userData['username'][0] : ''}</span>
                  </div>

                  <p id={styles.username}>USERNAME </p>
                  <div id={styles.result}>{userData['username']}</div>

                  <p id={styles.username}>POINTS LEFT </p>
                  <div id={styles.result}>{userData['points']}</div>
              </div>
          ) : ''}
        </div>
      </div>
      
      <div className={styles.playPosition}>

        <h3>{responseCourse}</h3>
        
        {videoUrl && ( // Render the ReactPlayer only if videoUrl is truthy
          <ReactPlayer
            url={videoUrl}
            width="1020px"
            height="500px"
            controls
            onReady={handleVideoReady}
            style={{ 
              backgroundColor: 'black', 
              borderRadius: '15px', 
              overflow: 'hidden',
              boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.2), 0px 10px 10px rgba(0, 0, 0, 0.1)'
            }}
          />
        )}

        <AppContext.Provider value={{videoLikes,setVideoLikes,id, videoViews, userData, courseId, userId, videoOwner}}>
          {videoLoaded && <LikeButton />} {/* Render LikeButton only if video is loaded */}
        </AppContext.Provider>

        <h2 id={styles.owner}> Uploaded by: {videoOwner} </h2>
        <p id={styles.Desc}> {videoDescription} </p>
        <p id={styles.lineSep}>|</p>
        <h2 id={styles.rate}> ⭐ {videoRating} </h2>
      </div>


      <div className={styles.comment}> 
          <h3> Comments</h3>
      </div>

    </div>
  );
};
