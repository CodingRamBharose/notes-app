import React, { useContext } from 'react'
import emptynest from '../../assets/emptynest.png'
import Tagline from '../TagLine/Tagline'
import { ThemeContext } from '../../context/ThemeContext'

const EmptyCard = ({ isSearch }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className='flex flex-col justify-center items-center gap-0 text-bold'>
      <img src={emptynest} alt="" className='w-[40vw] h-[40vw] md:w-[20vw] md:h-[20vw] rounded-full' />
      {isSearch ? <h2 className={`${theme === 'light' ? 'text-darkgreen' : 'text-gray-100'} text-center`}>
        The <span className='font-bold text-md'>Note</span> Is Not In The <span className='font-bold text-md'>Nest</span>
      </h2> : <h2 className={`${theme === 'light' ? 'text-darkgreen' : 'text-gray-100'}n text-center`}>
        The <span className='font-bold text-md'>Nest</span> Is Empty. Please Add A <span className='font-bold text-md'>Note</span> To Make It <span className='font-bold text-md'>NoteNest</span>
      </h2>}
      <Tagline />
    </div>
  )
}

export default EmptyCard
