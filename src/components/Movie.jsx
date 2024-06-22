import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { arrayUnion, doc, updateDoc, getDoc, onSnapshot } from 'firebase/firestore';

const Movie = ({ item, onMovieClick, isLargeRow }) => {
  const [like, setLike] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { user } = UserAuth();

  const movieID = doc(db, 'users', `${user?.email}`);

  // Listen to changes in user's saved shows
  useEffect(() => {
    const unsubscribe = onSnapshot(movieID, (doc) => {
      const savedShows = doc.data()?.savedShows || [];
      const isSaved = savedShows.some((show) => show.id === item.id);
      setLike(isSaved);
    });

    return () => unsubscribe();
  }, [movieID, item.id]);

  const saveShow = async (e) => {
    e.stopPropagation();

    if (user?.email) {
      setLike(!like);

      // Get the current saved shows from the document
      const docSnapshot = await getDoc(movieID);
      const currentSavedShows = docSnapshot.data()?.savedShows || [];

      // Toggle show in savedShows array
      const updatedShows = like
        ? currentSavedShows.filter((show) => show.id !== item.id)
        : [...currentSavedShows, { id: item.id, title: item.title, img: item.backdrop_path }];

      await updateDoc(movieID, { savedShows: updatedShows });
    } else {
      alert('Please log in to save a movie');
    }
  };

  return (
    <div
      className={`w-${isLargeRow ? '[200px]' : '[260px]'} sm:w-${isLargeRow ? '[160px]' : '[220px]'} md:w-${
        isLargeRow ? '[240px]' : '[280px]'
      } lg:w-${isLargeRow ? '[240px]' : '[280px]'} inline-block cursor-pointer relative p-2 transition-transform transform-gpu hover:scale-105`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        className='w-full h-auto block'
        src={`https://image.tmdb.org/t/p/${isLargeRow ? 'w300' : 'w300'}/${
          isLargeRow ? item?.poster_path : item?.backdrop_path
        }`}
        alt={item?.title}
      />
      <div
        onClick={() => onMovieClick(item)}
        className={`absolute top-0 left-0 w-full h-full ${
          isLargeRow ? '' : 'hover:bg-black/80 opacity-0 hover:opacity-100 text-white'
        }`}
      >
        <p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>
          {item?.title}
        </p>
        {!isLargeRow && (
          <p onClick={saveShow}>
            {isHovered && (
              // Render hearts only when hovered
              like ? (
                <FaHeart className='absolute top-4 left-4 text-gray-300' />
              ) : (
                <FaRegHeart className='absolute top-4 left-4 text-gray-300' />
              )
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default Movie;
