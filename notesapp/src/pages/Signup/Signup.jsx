import React, { useState } from 'react'
import Password from '../../components/Password/Password';
import { Link, useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from '../../utils/Helper'
import axiosInstance from '../../utils/axiosInstance';
import { BsArrowRight as ArrowRight } from "react-icons/bs";
import Tagline from '../../components/TagLine/Tagline';


const Signup = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!name) {
      setError('Name is required')
      return;
    }
    if (!validateEmail(email)) {
      setError('Invalid email address');
      return;
    }
    if (!password) {
      setError('please enter password');
      return;
    }
    setError("")

    //call singup api
    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      })

      if (response.data && response.data.error) {
        setError(response.data.message)
        return
      }
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken)
        navigate("/dashboard");

      }

    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message)

      } else {
        setError("An unexpected error occured . please try again later")
      }
    }
  }

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 bg-gray-100 h-screen">
      <div className="flex flex-col pt-10 md:pt-0 md:pl-36 gap-3 items-center md:items-start justify-center">
          <h2 className='text-darkgreen font-bold text-6xl'>notenest</h2>
          <h4 className='text-xl md:text-2xl text-dark font-semibold text-center md:text-left'>NoteNest helps you capture and organize <br /> your thoughts, anytime, anywhere.</h4>
          <Tagline/>
        </div>

        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-14">
          <div className="w-full xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign up</h2>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-lightgreen transition-all duration-200 hover:underline">Sign In</Link>
            </p>
            <form onSubmit={handleSignUp} className="mt-4">
              <div className="space-y-5">
                <div>
                  <label className="text-base font-medium text-gray-900">
                    {' '}
                    Full Name{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Full Name"
                      value={name} onChange={(e)=>{setName(e.target.value)}}
                    ></input>
                  </div>
                </div>
                <div>
                  <label className="text-base font-medium text-gray-900">
                    {' '}
                    Email address{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                      value={email} onChange={(e)=>{setEmail(e.target.value)}}
                    ></input>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-base font-medium text-gray-900">
                      {' '}
                      Password{' '}
                    </label>
                  </div>
                  <div className="mt-2">
                    <Password value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                  </div>
                </div>
                {error && <p className='text-red-400 text-center'>{error}</p>}
                <div>
                  <button className="inline-flex w-full items-center justify-center rounded-md bg-darkgreen px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-darkgreen/95">
                  Create Account <ArrowRight className="ml-2" size={16} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
