import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Password = ({value, onChange, placeholder}) => {
    const [isShowPassword, setShowPassword] = useState(false);

    const handleOnChange = ()=>{
        setShowPassword(!isShowPassword);
    }

  return (
    <div className='flex justify-between items-center w-full bg-transparent px-4 py-2 border rounded-md  h-10  border-gray-300 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 '>
      <input 
      value={value}
      onChange={onChange}
      type={isShowPassword ? "text" : "password"}
      placeholder={placeholder || "Password"}
      className='w-full outline-none bg-transparent' 
      />
    {isShowPassword ? <FaRegEye onClick={()=>{handleOnChange()}} className='text-lightgreen text-2xl'/> : <FaRegEyeSlash onClick={()=>{handleOnChange()}} className='text-mygray text-2xl'/>}
    </div>
  )
}

export default Password
