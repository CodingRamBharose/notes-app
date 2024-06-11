import React, { useContext } from 'react'
import {getInitials} from '../../utils/Helper'
import { ThemeContext } from '../../context/ThemeContext'

const Profileinfo = ({userInfo}) => {
  const{theme} = useContext(ThemeContext)
  return (
    <div className='flex items-center justify-center gap-2'>
      <h4 className={`${theme==='light'? 'bg-darkgreen': 'bg-gray-100'} ${theme==='light'? 'text-cream': 'text-darkgreen'} p-2 w-10 h-10 rounded-full flex items-center justify-center text-center`}>{getInitials(userInfo?.fullName)}</h4>
      <div className='flex flex-col items-start '>
        <h5>{userInfo?.fullName}</h5>
      </div>
    </div>
  )
}

export default Profileinfo
