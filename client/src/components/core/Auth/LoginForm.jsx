import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-hot-toast';
import { useDispatch } from "react-redux"

import { login } from "../../../services/operations/authAPI";

const LoginForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const [showPassword, setShowPassword] = useState(false);
    const { email, password } = formData

    // function changeHandler(event) {
    //     setFormData((prevData) => (
    //         {
    //             ...prevData,
    //             [event.target.name]: event.target.value,
    //         }
    //     ))
    // }
    
    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    // function submitHandler(event) {
    //     event.preventDefault();
    //     // toast.success("Logged In");
    //     dispatch(login(email, password, navigate))
    // }
    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(login(email, password, navigate))
    }

    return (
        <form onSubmit={handleOnSubmit}
            className="flex flex-col w-full gap-y-4 mt-6">

            <label className='w-full'>
                <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                    Email Address<sup className='text-pink-200'>*</sup>
                </p>
                <input
                    required
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleOnChange}
                    placeholder="Enter email address"
                    className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                />
            </label>

            <label className='w-full relative'>
                <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                    Password<sup className='text-pink-200'>*</sup>
                </p>
                <input
                    required
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={handleOnChange}
                    placeholder="Enter Password"
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
                />

                <span
                    className="absolute right-3 top-[38px] cursor-pointer"
                    onClick={() => setShowPassword((prev) => !prev)}
                >
                    {showPassword ?

                        (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />) :

                        (<AiOutlineEye fontSize={24} fill='#AFB2BF' />)}
                </span>

                <Link to="/forgot-password">
                    <p className='text-xs mt-1 text-blue-100 max-w-max ml-auto'>
                        Forgot Password
                    </p>
                </Link>
            </label>

            <button
                type='submit'
                className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>
                Sign In
            </button>

        </form>
    )
}

export default LoginForm
