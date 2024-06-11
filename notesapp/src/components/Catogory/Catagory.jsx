import React, { useState } from 'react';

const Category = ({ tag, setTag }) => {
  const [showOptions, setShowOptions] = useState(false);
  const categories = ["all", "personal", "work", "home", "financial", "goal"];

  const handleChange = (value) => {
    setTag(value);
    setShowOptions(false);
  };

  return (
    <div className="w-full relative">
      <label htmlFor="category" className="text-md block">TAG</label>
      <div className='relative'>
        <div
          id="category"
          className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 bg-light rounded-md shadow-sm focus:outline-none focus:ring-darkgreen focus:border-darkgreen sm:text-sm cursor-pointer"
          onClick={() => setShowOptions(!showOptions)}
        >
          {tag || 'Select an Option'}
        </div>
        {showOptions && (
          <div className="absolute text-sm top-full left-0 w-full bg-white border border-lightgreen rounded-md shadow-md mt-1">
            {categories.map((category) => (
              <div
                key={category}
                className="pl-4 cursor-pointer hover:bg-lightgreen"
                onClick={() => handleChange(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
