import React, { useState } from 'react';
import axios from 'axios';

function Test() {
  const [responseData, setResponseData] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [query, setQuery] = useState([]);
  const [sortSearch, setSortSearch] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/courses');
      setResponseData(response.data);
      setQuery(inputValue.trim().split(/\s+/));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const check = ["#team","#python"];

  // Function to sort the search results based on rating
  const sortResults = () => {
    const sortedData = responseData.filter(dataItem =>
      dataItem.keywords.split(',').some(keyword => query.includes(keyword))
    ).sort((a, b) => b.rating - a.rating);
    setSortSearch(sortedData);
  };

  // Call sortResults whenever responseData or query changes
  React.useEffect(() => {
    sortResults();
    console.log(sortSearch);
  }, [responseData, query]);

  return (
    <>
      <input 
        type="text" 
        placeholder="Enter your query" 
        value={inputValue} 
        onChange={handleInputChange} 
      />
      <button onClick={handleSubmit} disabled={inputValue.trim() === ''}>Testing API</button>

      {sortSearch.map(dataItem => (
        <div key={dataItem.courseId}>
          <p>CourseID: {dataItem.courseId}</p>
          <p>Course name: {dataItem.courseName}</p>
        </div>
      ))}
    </>
  );
}

export default Test;
