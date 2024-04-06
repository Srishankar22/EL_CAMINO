import React, { useState, useEffect } from 'react';
import styles from './Search.module.css';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { axiosPublic } from '../../axiosPublic';


export function Search() {
  const [responseData, setResponseData] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [query, setQuery] = useState([]);
  const [sortSearch, setSortSearch] = useState([]);
  //const [userId, setUserID] = useState(1);
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

          } catch (error) {
            console.error('Error fetching data:', error);
          }
    }
    
    fetchUser();
}, [userData]);


  
const { searchQuery } = useParams();

  useEffect(() => {
    fetchData();
  }, []);


//   useEffect(() => {
//     console.log('Search Query:', searchQuery);
// }, [searchQuery]);



  const fetchData = async () => {
    try {
      const response = await axiosPublic.get('courses');
      setResponseData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const navigate = useNavigate();

  const searchNavigate = (input) => {
    navigate(`/search/${input}`);
  }


  // const handleNavigation = (id) => {
  //   navigate(`/video/${id}`);
  // };

  const handleNavigation = async (id,user,owner) => {
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

  


  // const handleSubmit = () => {
  //   setQuery(inputValue.trim().split(/\s+/));
  // };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Function to sort the search results based on rating
  const sortResults = () => {
    const lowerCaseSearchQuery = searchQuery.trim().toLowerCase();
    const sortedData = responseData.filter(dataItem =>
      dataItem.keywords.split(',').some(keyword => lowerCaseSearchQuery.split(/\s+/).includes(keyword.toLowerCase()))
    ).sort((a, b) => b.rating - a.rating);
    setSortSearch(sortedData);
  };




  // Call sortResults whenever responseData or query changes
  useEffect(() => {
    sortResults();
  }, [responseData, searchQuery]);

  return (
    <div className={styles.wrapper}> 

      <div className={styles.top}>

        <h2 id={styles.ELCAMINO}>EL CAMINO</h2>

        <div className={styles.searchBtn}>
          <input 
            type="text" 
            placeholder="Search Course" 
            value={inputValue} 
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

      </div>

      <div className={styles.pageContent}>

        <div className={styles.advertisment}>
          <div className={styles.ad}>
            <img id={styles.ad1} src='/ad1.png'></img>
          </div>
          <div className={styles.ad}>
          <img id={styles.ad2} src='/ad2.png'></img>
          </div>
        </div>


        <div className={styles.result}>
          <ul className={styles.courseList}>
            {sortSearch.map(dataItem => (
              <li key={dataItem.courseId} className={styles.courseItem}>
                <div className={styles.containerOverlay} onClick={() => handleNavigation(dataItem.courseId, userData.id, dataItem.ownerId)}>
                  <div className={styles.courseContainer}>
                    <div className={styles.thumbnail}>
                      <img src={dataItem.thumbnail} alt="Thumbnail" />
                    </div>
                    <div className={styles.courseDetails}>
                      <div className={styles.heading}>
                        <h2 className={styles.MainHead}>{dataItem.courseName}</h2>
                        <h2 className={styles.SubHead}>|</h2>
                        <h2 className={styles.SubHead}>{dataItem.courseDomain}</h2>
                      </div>
                      <div className={styles.contentDetails}>
                        <p className={styles.owner}>Owner: {dataItem.ownerId}</p>
                      </div>
                      <div className={styles.courseDescription}>
                        <p className={styles.descDetails}>{dataItem.description}</p>
                      </div>
                      <div className={styles.costRate}>
                        <div className={styles.ratingDetails}>
                          <p className={styles.rating}>⭐ {dataItem.rating} Points</p>
                        </div>
                        <div className={styles.coinDetails}>
                          <p className={styles.coins}>{dataItem.value} Coins</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
