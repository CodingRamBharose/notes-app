import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Profileinfo from '../Cards/Profileinfo';
import { toast } from 'react-toastify';
import { FaPowerOff } from "react-icons/fa6";
import { MdOutlinePersonalInjury, MdWorkHistory } from "react-icons/md";
import { FaHome, FaBars, FaTimes } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { GoGoal } from "react-icons/go";
import { TiThSmall } from "react-icons/ti";
import { ThemeContext } from '../../context/ThemeContext';

const Sidebar = ({ userInfo, onCategoryClick, activeCategory }) => {
  const { theme } = useContext(ThemeContext);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const categories = ['all', 'personal', 'work', 'home', 'financial', 'goal'];
  const categoriesIcon = {
    all: <TiThSmall />,
    personal: <MdOutlinePersonalInjury />,
    work: <MdWorkHistory />,
    home: <FaHome />,
    financial: <GiTakeMyMoney />,
    goal: <GoGoal />
  }

  const navigate = useNavigate();

  const onLogOut = () => {
    toast.success("Logout Successful");
    localStorage.clear();
    navigate('/login');
  }

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  }

  return (
    <>
      <div className={`md:hidden fixed top-[9.3vh] left-4 z-50 ${theme === 'light' ? 'text-darkgreen' : 'text-gray-100'}`}>
        <button onClick={toggleSidebar}>
          {isSidebarVisible ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {isSidebarVisible && (
        <div
          className="fixed inset-0 bg-gray-100 bg-opacity-30 z-40"
          onClick={toggleSidebar}
        ></div>
      )}

      <div className={`fixed top-0 left-0 w-44 p-4 pb-14 text-xl transform ${isSidebarVisible ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out z-50 ${theme === 'light' ? 'bg-gray-100' : 'bg-darkgreen'} ${theme === 'light' ? 'text-darkgreen' : 'text-gray-100'} md:block h-full md:h-[90vh] mt-[15.2vh] md:mt-[10.2vh]`}>
        <div className='h-[60vh] md:h-full flex flex-col items-start justify-between'>
          <Profileinfo userInfo={userInfo} />
          <ul>
            {categories.map(category => ( 
              <li
                key={category}
                className={`flex py-2 px-4 cursor-pointer items-center ${activeCategory === category ? 'text-lightgreen' : ''} hover:text-lightgreen`}
                onClick={() => onCategoryClick(category)}
              >
                {categoriesIcon[category]}
                <span className="ml-2">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </span>
              </li>
            ))}
          </ul>
          <button className='text-md flex justify-center items-center gap-[4px] hover:underline hover:text-lightgreen' onClick={onLogOut}>
            <FaPowerOff className='text-[15px]' /> logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
