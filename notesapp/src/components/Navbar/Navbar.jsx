import React, { useContext, useState} from 'react'
import Searchbar from '../Searchbar/Searchbar'
import { ThemeContext } from '../../context/ThemeContext';
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import logo from "../../assets/logo.jpg"

const Navbar = ({onSearchNote,handleClearSearch}) => {
  const {theme, setTheme} = useContext(ThemeContext);
  const [searchQueary, setSearchQueary] = useState("")

  const changeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const onSearch = ()=>{
    if(searchQueary){
      onSearchNote(searchQueary)
    }
  }
  
  const onClearSearch = ()=>{
    setSearchQueary("")
    handleClearSearch();
    console.log("hello ")
  }



  return (
    <div className={`h-[15vh] md:h-[10vh] ${theme==='light'? 'bg-gray-100': 'bg-darkgreen'} px-10 py-3 flex flex-col md:flex-row justify-between items-center shadow-sm ${theme==='light'? 'shadow-gray-300': 'shadow-darkgreen'} fixed w-full z-50`}>
      <div className="inline-flex items-center justify-between md:justify-normal w-full md:w-0">
        <div className='inline-flex items-center space-x-2'>
          <span>
            <img src={logo} alt="" className='w-10 h-10 rounded-full'/>
          </span>
          <span className={`font-bold text-xl ${theme==='light'? 'text-darkgreen': 'text-gray-100'}`}>NoteNest</span>
        </div>
      <button className={`md:hidden text-3xl ${theme === 'light' ? 'text-black' : 'text-white'}`} onClick={changeTheme}>{theme === 'light' ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}</button>
      </div>
      <Searchbar value={searchQueary} onChange={(e)=>{setSearchQueary(e.target.value)}} onSearch={onSearch} onClearSearch={onClearSearch}/>
      <button className={`hidden md:block text-3xl ${theme === 'light' ? 'text-black' : 'text-white'}`} onClick={changeTheme}>{theme === 'light' ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}</button>
    </div>
  )
}

export default Navbar
