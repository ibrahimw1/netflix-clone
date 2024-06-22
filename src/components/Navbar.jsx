// Navbar.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Navbar = () => {
  const [scrolling, setScrolling] = useState(false);
  const { user, logOut } = UserAuth();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = async () => {
    try {
      await logOut();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Updated handleSearch to navigate to the search page
  const handleSearch = (searchTerm) => {
    console.log('Search term:', searchTerm);

    // Use the navigate function to navigate to the search page with the search term
    navigate(`/search?query=${searchTerm}`);
  };

  return (
    <div className={`flex items-center justify-between p-4 z-[100] w-full fixed ${scrolling ? 'bg-black opacity-90 transition-all duration-600' : ''}`}>
      <Link to='/'>
        <h1 className='text-red-600 text-3xl font-bold cursor-pointer'>NETFLIX</h1>
      </Link>

      <div className="flex items-center ml-auto">
        <SearchBar onSearch={handleSearch} />

        {user?.email ? (
          <div>
            <Link to='/account'>
              <button className='text-white text-sm px-6 py-2 pr-4'>Account</button>
            </Link>
            <button onClick={handleLogout} className='bg-red-600 px-8 py-2 rounded cursor-pointer text-white text-sm'>Logout</button>
          </div>
        ) : (
          <div>
            <Link to='/login'>
              <button className='text-white text-sm px-6 py-2 pr-4'>Sign In</button>
            </Link>
            <Link to='/signup'>
              <button className='bg-red-600 px-8 py-2 rounded cursor-pointer text-white text-sm'>Sign Up</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
