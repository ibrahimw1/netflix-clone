// SearchRow.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Movie from '../components/Movie';

const SearchPage = ({ searchQuery }) => {
  const [searchResults, setSearchResults] = useState([]);
  const key = 'd6966e757024d0174dc2fffa9004ebe4';

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        if (!searchQuery) {
          // Skip API call if searchQuery is undefined or empty
          return;
        }
  
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${searchQuery}&page=1&include_adult=false`
        );
  
        setSearchResults(response.data.results);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };
  
    fetchSearchResults();
  }, [searchQuery]);
  

  return (
    <div className='search-results-container'>
      <h2 className='text-white font-bold md:text-xl p-4'>Search Results for: {searchQuery}</h2>
      <div className='relative flex items-center group'>
        <div className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
          {searchResults.map((item, id) => (
            <Movie key={id} item={item} isLargeRow={false} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
