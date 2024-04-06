import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { axiosPublic } from '../../axiosPublic';
import styles from './BuyCourse.module.css';



function BuyCourse() {

    const [courseData, setCourseData] = useState({});
    //const [user, setUser] = useState(2)
    const [userName, setUserName] = useState(null);
    const [userData, setUserData] = useState(null);
    const [ownerData, setOwnerData] = useState(null);

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

            } catch (error) {
              console.error('Error fetching data:', error);
            }
      }
      
      fetchUser();
  }, [userData]);
      

  const { id } = useParams();
  //console.log(id)

  const navigate = useNavigate();


  useEffect(() => {
      const fetchVideoData = async () => {
        try {
          const response = await axiosPublic.get(`courses/${id}`);
          setCourseData(response.data)

          const courseOwnerRespone = await axiosPublic.get(`users/${response.data.ownerId}/owner`)
          setOwnerData(courseOwnerRespone)
          
        } catch (error) {
          console.log("Error fetching video data:", error);
        }
      };
    
      fetchVideoData();
    }, [id]);

    //console.log(userData)



    const handleEnrollment = async () => {
      if(userData.points >= courseData.value){
          console.log("can purchase course")
          console.log(userData.id)
          console.log(ownerData)
          try {
              const response = await axiosPublic.post('api/enrollment', {
                userId: userData.id,
                courseId: courseData.courseId
              });
              await axiosPublic.put(`users/${userData.username}/points`, {
                  points: userData.points-courseData.value               
              });
                  
              await axiosPublic.put(`users/${ownerData.data.username}/points`, {
                  points: ownerData.data.points+courseData.value
              });

              await axiosPublic.put(`courses/${courseData.courseId}`,{
                "views":courseData.views+1 
              })

              await axiosPublic.put(`ratings/${courseData.courseId}/updateRating`,{
                "likes":courseData.likes,
                "views":courseData.views+1
              })
              
              
              
              console.log('Enrollment successful:', response.data);
              console.log(userData.id,courseData.courseId)
              console.log(ownerData)
              navigate(-1)
              // Handle success, such as displaying a message to the user
            } catch (error) {
              console.error('Error enrolling:', error);
              // Handle error, such as displaying an error message to the user
            }

      }else{
          console.log("no user points updated")
          window.alert("Insufficient user points")
      }
      
    }

    //console.log(courseData);


return (
  <div className={styles.pageContent}>

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
    
    

    <div className={styles.courseContent}>
      
      <div className={styles.topic}>
        <p id={styles.topicLine1}>Ready to unlock the course</p>
        <p id={styles.topicLine2}>and get started?</p>
      </div>

      <img src='/locked.png' id={styles.eyeLock}></img>

      <div className={styles.courseDetails}>

        <div className={styles.thumbnail}>
          <img src={courseData.thumbnail}></img>
        </div>

        <div className={styles.details}>

          <div className={styles.lock}>
            <img id={styles.lock} src="/lock.png" alt="lock icon" />
          </div>
          
          <p id={styles.Name}>{courseData.courseName}</p>
          <p id={styles.Domain}>{courseData.courseDomain}</p>
          <p id={styles.details}>Details</p>
          
          <div className={styles.owner}>
            <p id={styles.ownerTitle}>Owner : </p>
            <p id={styles.owner}> {courseData.ownerId}</p>
          </div>
          
          
          <div className={styles.Description}>
            <p id={styles.decpTitle}>Course Description : </p>
            <p id={styles.Description}> {courseData.description} </p>
          </div>

          <div className={styles.valueInfo}>
            
            <p id={styles.rateIcon}>⭐</p>
            <p id={styles.rate}> {courseData.rating}</p>
            
            <img id={styles.likeIcon} src='/like.png'></img>  
            <p id={styles.like}>{courseData.likes} </p>
            
            <p id={styles.coins}>{courseData.value} COINS</p>
          </div>

        </div>

      </div>
      <button id = {styles.upload} onClick={handleEnrollment}>PROCEED </button>
    </div>

  </div>
)
}      

export default BuyCourse