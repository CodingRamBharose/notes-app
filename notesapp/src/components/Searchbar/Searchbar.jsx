import React from 'react'
import { RiSearch2Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

const Searchbar = ({value, onChange, onSearch, onClearSearch }) => {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };
  return (
    <div className='mt-2 ml-[10vw] md:ml-0 md:mt-0 w-[80vw] md:w-80 py-2 px-3 bg-white border-[0.5px] border-gray-500 rounded-md flex justify-between items-center gap-2'>
      <input type="text" className='bg-transparent w-full outline-none' placeholder='Search Notes' value={value} onChange={onChange} onKeyPress={handleKeyPress}/>
        {value && <RxCross2 className='text-2xl text-mygray cursor-pointer hover:text-dark' onClick={onClearSearch}/>}
        <RiSearch2Line className='text-2xl text-mygray cursor-pointer hover:text-dark' onClick={onSearch}/>
    </div>
  )
}

export default Searchbar
