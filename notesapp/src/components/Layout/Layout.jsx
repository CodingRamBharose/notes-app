import React, { useContext } from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import { ThemeContext } from '../../context/ThemeContext';


const Layout = ({ children, userInfo, onCategoryClick, activeCategory, onSearchNote,handleClearSearch }) => {
  const {theme} = useContext(ThemeContext)
  return (
    <div>
      <Navbar onSearchNote={onSearchNote} handleClearSearch={handleClearSearch}/>
      <div className="flex mt-[0.8px]">
        <Sidebar userInfo= {userInfo} onCategoryClick={onCategoryClick} activeCategory={activeCategory}/>
        <main className={`ml-0 flex flex-col mt-[15vh] md:mt-[10vh] p-4 md:p-10 md:ml-44 w-full h-[84.9vh] md:h-[89.9vh] relative items-center ${theme==='light'? '' : 'bg-darkgreen/80'}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
