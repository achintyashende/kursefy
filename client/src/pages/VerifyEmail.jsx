import React,{useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OTPInput from 'react-otp-input';
import { BiArrowBack } from "react-icons/bi"
import {Link, useNavigate} from "react-router-dom"
import { sendOtp, signUp } from '../services/operations/authAPI';

const VerifyEmail = () => {
    const [otp, setOtp] = useState("");
    const dispatch = useDispatch();
    const { signupData, loading } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect( () => {
        if(!signupData){
            // toast.success(signupData.message);
            navigate('/signup');
        }
    })

    const handelOnSubmit = (e) => {
        e.preventDefault();
        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        } = signupData;
        dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate));
    }


    return (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            {
                loading 
                ?(
                    <div
                        className="spinner">
                    </div>
                ):(
                    <div>
                        <h1 className="text-4xl font-semibold leading-[2.375rem] text-richblack-5">
                            Verify Email
                            </h1>
                        <p
                        className="my-3 mb-5 text-[1.125rem] leading-[1.625rem] text-richblack-100"
                        >
                        A verification email has been sent to you. Enter the code below
                        </p>
                        <form onSubmit={handelOnSubmit}>
                            <div className='flex items-center'>

                            <OTPInput  
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                renderSeparator={<span>-</span>}
                                renderInput={(props) => <input  {...props}
                                className=' bg-richblack-600 h-8 rounded-md text-white border border-white'
                                />}
                                />
                            </div>

                        <button
                            type="submit"
                            className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-bold text-richblack-900"
                            >
                                Submit
                        </button>
                        </form>
                        <div className=' flex justify-between items-center py-4'>

                        <div className=" flex items-center justify-between">
                            <Link to="/login">
                            <p className="flex items-center gap-x-2 text-richblack-5">
                                <BiArrowBack /> Back To Login
                            </p>
                            </Link>
                        </div>

                        <button
                        className=' px-4 py-2 rounded-md text-white bg-richblack-700 '
                        onClick={ () => dispatch(sendOtp(signupData.email, navigate))}
                        >
                            Resend It
                        </button>
                        

                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default VerifyEmail;