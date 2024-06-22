// SearchBar.js

import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    console.log('Search term:', searchTerm);
    onSearch(searchTerm);
  };
  

  return (
    <div className="flex items-center bg-gray-300 rounded-full p-1"> {/* Adjusted padding */}
      <input
        type="text"
        placeholder="Search for movies..."
        value={searchTerm}
        onChange={handleInputChange}
        className="flex-grow bg-gray-300 p-1 rounded-full focus:outline-none text-md"
      />
      <button onClick={handleSearch} className="bg-red-600 text-white p-1 rounded-full cursor-pointer">
        <BiSearch size={20} /> {/* Adjusted icon size */}
      </button>
    </div>
  );
};

export default SearchBar;
