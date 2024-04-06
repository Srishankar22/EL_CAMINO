import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Upload.module.css';
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import { axiosPublic } from '../../axiosPublic';


const UploadForm = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [userName, setUserName] = useState('');
  const [userData, setUserData] = useState(null);
  const [owner, setOwner] = useState(null)

  const token = localStorage.getItem('jsonwebtoken');


  useEffect(() => {
    const fetchUser = async () => {
        try {
            const userResponse = await axiosPublic.get(`users/${userName}`);
            setUserData(userResponse.data)
            //console.log(userResponse.data['id'])

          } catch (error) {
            console.error('Error fetching data:', error);
          }
    }
    
    if (userName) { // Check if userName is not null
        fetchUser();
    }
  }, [userName]); // Changed dependency to userName instead of userData

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token)
      setUserName(decoded['username'])
    }
  }, [token]);



  const navigate = useNavigate();

  const [courseDetails, setCourseDetails] = useState({
    courseDomain: '',
    courseName: '',
    description: '',
    value: '', // Set default value to 0
    rating: 0, // Set default rating to 0
    ownerId: 0, // Set default ownerId to 0
    thumbnail: '', // Set default thumbnail to empty string
    video: '', // Set default video to empty string
    views: 0,
    likes: 0, // Set default likes to 0
    comments: '', // Set default comments to empty string
    keywords: '', // Set default keywords to empty string
    username: '' // Initially empty
  });


  useEffect(() => {
    const fetchUser = async () => {
        try {
            const userResponse = await axiosPublic.get(`users/${userName}`);
            setOwner(userResponse.data['id'])
            //console.log(userResponse.data['id'])

          } catch (error) {
            console.error('Error fetching data:', error);
          }
    }
    
    if (userName) { // Check if userName is not null
        fetchUser();
    }
}, [userName]);

  useEffect(() => {
    setCourseDetails(prevState => ({ ...prevState,ownerId:owner, username: userName }));
  }, [userName,owner]);


  console.log(userName)
  console.log(userData)

  const handleVideoChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleVideoSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', videoFile);

    try {
      const response = await axiosPublic.post('upload/video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setVideoUrl(response.data); // Store video URL
      setCourseDetails(prevState => ({ ...prevState, video: response.data }));
      console.log('Video uploaded successfully:', response.data);
      // Handle success, show message, update UI, etc.
    } catch (error) {
      console.error('Error uploading video:', error);
      // Handle error, show error message, etc.
    }
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', imageFile);

    try {
      const response = await axiosPublic.post('upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setImageUrl(response.data); // Store image URL
      setCourseDetails(prevState => ({ ...prevState, thumbnail: response.data }));
      console.log('Image uploaded successfully:', response.data);
      // Handle success, show message, update UI, etc.
    } catch (error) {
      console.error('Error uploading image:', error);
      // Handle error, show error message, etc.
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseDetails(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if all form fields are filled
    const requiredFields = ['courseDomain', 'courseName', 'description', 'value', 'keywords'];
    const unfilledFields = requiredFields.filter(field => !courseDetails[field]);
  
    if (unfilledFields.length > 0) {
      // If any required field is unfilled, show an alert message
      window.alert(`Please fill in the following fields: ${unfilledFields.join(', ')}`);
      return; // Exit the function early
    }

    if(!courseDetails.thumbnail){
      window.alert("Please upload the thumbnail")
      return;
    }

    if(!courseDetails.video){
      window.alert("Please upload the video")
      return;
    }  

  
    try {
      // Extract the required fields
      const { courseDomain, courseName, description, rating, ownerId, thumbnail, video, views, likes, comments, keywords, username } = courseDetails;
  
      // Parse value to integer
      const value = parseInt(courseDetails.value);
  
      const courseData = {
        courseDomain,
        courseName,
        description,
        value,
        rating,
        ownerId,
        thumbnail,
        video,
        views,
        likes,
        comments,
        keywords,
        username
      };
  
      // Send course data to the backend API
      await axiosPublic.post('courses', courseData);
  
      console.log('Course created successfully:', courseData);
      navigate(-1);
      // Handle success, show message, update UI, etc.
    } catch (error) {
      console.error('Error creating course:', error);
      // Handle error, show error message, etc.
    }
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

      <div className={styles.uploadlogo}>
        <img src="/upload2.png" alt="Uploading"/>
        <h2>Share Your Knowledge Here!</h2>
      </div>

      <div className={styles.bgRectangle}>

        <img id={styles.bg} src="/Rectangle 1.png" alt="bg"/>

        <div className={styles.uploadingContent}>

          <div className={styles.inputfields}>

  
        
            <div className = {styles.uploadvideo}>
              <img id={styles.imgVideoUp} src='/VideoUp.png' alt='video upload icon'></img>
              <h2>Upload Video Here</h2>
              <p>* MP4 only *</p>

              <form onSubmit={handleVideoSubmit} className={styles.uploadingform}>
                <div className={styles.choose}>
                  <input type="file" onChange={handleVideoChange} />
                </div>  
                <button type="submit">Upload Video</button>
              </form>
            </div>

            <div className = {styles.uploadimg}>
              <img id={styles.imgthumbnailUp} src='/imgUpload.png' alt='video upload icon'></img>
              <h2>Add Thumbnail</h2>
              <form onSubmit={handleImageSubmit} className={styles.uploadingform}>
                <div className={styles.choose}>
                  <input type="file" onChange={handleImageChange} />
                </div>  
                <button type="submit">Upload Image</button>
              </form>
            </div>

            <form onSubmit={handleSubmit}>

              <div className={styles.col}>
                  <div className={styles.fieldGroup}>
                    <div className={styles.cont1}>
                      <input type="text" name="courseName" placeholder="Course Name" value={courseDetails.courseName} onChange={handleChange} />
                      <button className={styles.clearButton} title='clear' type="button" onClick={() => clearInput('name')}>X</button>
                    </div>

                    <div className={styles.cont2}>
                      <input type="text" name="courseDomain" placeholder="Course Domain" value={courseDetails.courseDomain} onChange={handleChange} />
                      <button className={styles.clearButton} title='clear' type="button" onClick={() => clearInput('domain')}>X</button>
                    </div>
                  </div>

                  <div className={styles.keyword}>
                    <span className={styles.keywordText}>Course Keywords</span>
                    <input type="text" name="keywords" placeholder="Enter your keywords here" value={courseDetails.keywords} onChange={handleChange} />
                  </div>

                  <div className={styles.Desc}>
                    <span className={styles.DecText}>Course Description</span>
                    <textarea name="description" placeholder="Enter your course description here" value={courseDetails.description} onChange={handleChange} />
                  </div>


                  <div className={styles.bottomRow}>
                    <div className={styles.cont3}>
                        <p id={styles.coin}>Enter the coin value for course :</p>
                        <input type="text" name="value" value={courseDetails.value} onChange={handleChange} />
                    </div>
                  </div>

                  <button id={styles.finish} type="submit">Create Course</button>

              </div>
            </form>



          </div>
        </div>
      </div>

    </div>
  );
};

export default UploadForm;
