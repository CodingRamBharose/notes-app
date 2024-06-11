import React, { useState, useEffect } from 'react';
import taglines from '../../json/Tagline.json';

const Tagline = () => {
  const [randomTagline, setRandomTagline] = useState('');

  useEffect(() => {
    const getRandomTagline = () => {
      const taglineArray = taglines.taglines;
      const randomIndex = Math.floor(Math.random() * taglineArray.length);
      return taglineArray[randomIndex];
    };

    setRandomTagline(getRandomTagline());
  }, []);

  return (
    <div>
        <h5 className='text-xl text-lightgreen'>{randomTagline}</h5>
    </div>
  );
};

export default Tagline;
