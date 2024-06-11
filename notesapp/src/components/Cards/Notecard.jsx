import React, { useState } from 'react';
import { MdOutlineModeEdit, MdDeleteOutline } from "react-icons/md";
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const NoteCard = ({ logo, title, tag, content, time, date, onEditNote, onDeleteNote }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };
  
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const options = { hour: '2-digit', minute: '2-digit' };
    return date.toLocaleTimeString(undefined, options);
  };

  return (
    <div className='bg-darkgreen text-light py-2 px-6 flex flex-col gap-3 rounded-md mb-2'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center w-full'>
          <img src={logo} alt="logo" className='h-8 w-8 mr-0 md:mr-2 rounded-full' />
          <div className='ml-4 md:ml-10 w-full justify-between flex flex-col md:flex-row'>
            <h2 className='overflow-x-hidden w-[80%] font-semibold text-xl'>{title}</h2>
            <h4 className='w-[20%] text-cream px-0 md:px-2 py-1 rounded-md capitalize text-sm md:text-base'>{tag}</h4>
          </div>
        </div>
        <div className='flex gap-2'>
          <MdOutlineModeEdit className='text-2xl cursor-pointer hover:text-lightgreen' onClick={onEditNote}/>
          <MdDeleteOutline className='text-2xl cursor-pointer hover:text-red-500' onClick={onDeleteNote}/>
          <button onClick={() => setIsExpanded(!isExpanded)} className='text-2xl hover:text-cream'>
            {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
          </button>
        </div>
      </div>
      {isExpanded&&  <hr/>}
      {isExpanded && (
        <div>
          <p>{content}</p>
          <div className='flex justify-between'>
            <h5>{formatTime(time)}</h5>
            <h5>{formatDate(date)}</h5>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteCard;
