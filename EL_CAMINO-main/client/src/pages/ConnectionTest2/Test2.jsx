import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Test2.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { axiosPublic } from '../../axiosPublic';


function Test2() {
    
    const [highrated, setHighrated] = useState(null);
    const [highestViews, setHighestViews] = useState(null);
    const [inputValue, setInputValue] = useState('');
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
        const fetchData = async () => {
            try {
                const response = await axiosPublic.get('courses');
                const data = response.data;
                const sortedRating = [...data].sort((a, b) => b.rating - a.rating);
                setHighrated(sortedRating);
                const sortedViews = [...data].sort((a, b) => b.views - a.views);
                setHighestViews(sortedViews);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);
    
    const logoutNavigate = useNavigate();

    const navigate = useNavigate();

    const handleLogout = (() => {
        localStorage.removeItem('jsonwebtoken');
        logoutNavigate('/login');    
    })

    const searchNavigate = (input) => {
        navigate(`/search/${input}`);
    }

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    if(!token){
        return(
            <p>Unauthorized user..</p>
        )
    }

    

    return (
        <div className={styles.container}>
            <div className={styles.advertisment}>
                <div className={styles.ad}>
                    <img id={styles.ad1} src='/ad1.png' alt="Advertisement 1" />
                </div>
                <div className={styles.ad}>
                    <img id={styles.ad2} src='/ad2.png' alt="Advertisement 2" />
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.top}>
                    <h2 id={styles.ELCAMINO}>EL CAMINO</h2>
                    <div className={styles.searchBtn}>
                        <input 
                            type="text" 
                            placeholder="Search course" 
                            onChange={handleInputChange} 
                        />
                        <div className={styles.submitSearch}>
                            <button onClick= {() => searchNavigate(inputValue)} disabled={inputValue.trim() === ''}>
                                <img src="/search.png" alt="Search Icon" />
                            </button>
                        </div>
                    </div>
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

                            
                    <button onClick={handleLogout} id={styles.logout} className={styles.log}>
                        <h3> Logout </h3>
                    </button>

                </div>
                <Main highRatedCourses={highrated} suggestedCourses={highestViews} userId={userData ? userData['id'] : null} />
            </div>
        </div>
    );
}

function Main({ highRatedCourses, suggestedCourses, userId, ownerId }) {
    const CourseList = ({ title, courses }) => (
        <section>
            <h2 id={styles.mainTitle}>{title}</h2>
            <div className={styles["course-list"]}>
            {courses && courses.slice(0, Math.min(courses.length, 6)).map((course) => (
            <CourseCard key={course.courseId} title={course.courseName} thumbnail={course.thumbnail} progress={course.progress} courseId={course.courseId} rating={course.rating} likes={course.likes} user={userId} owner={course.ownerId} />
                ))}
            </div>
        </section>
    );

    const navigate = useNavigate();

    const handleNavigation = async (id,user, owner) => {
        try{
            const response = await axiosPublic.get(`api/enrollment/check?userId=${user}&courseId=${id}`)
            if(response.data.enrolled || owner == user) {
                navigate(`/video/${id}`);
            }
            else{
                navigate(`/unlock/${id}`)
                //window.alert('course not yet unlocked')
            }
        } catch (error) {
            console.error('Error checking enrollment: ', error)
        }
    };

    const CourseCard = ({ title, thumbnail, progress, courseId, rating, likes, user, owner }) => (
        <div className={styles.courseCard} onClick={() => handleNavigation(courseId,user,owner)}>
            <img src={thumbnail} alt={title} className={styles.thumbnail} />
            <div className={styles.cardContent}>
                <h3>{title}</h3>
                <div className={styles.likeAndRate}>
                    <p id={styles.rate}> ⭐{rating}</p>
                    <div className={styles.like}>
                        <img src='./like.png' alt="Like" />
                        <p id={styles.like}>  {likes}</p>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <main className={styles.main}>
            <CourseList title="HIGH RATED" courses={highRatedCourses} />
            <CourseList title="HIGH ENROLLMENT" courses={suggestedCourses} />
        </main>
    );
}

export default Test2;
