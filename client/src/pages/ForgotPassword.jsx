import {useState} from 'react';
import {Link} from "react-router-dom"
import { BiArrowBack } from "react-icons/bi"
import {useDispatch, useSelector} from "react-redux";
import { getPasswordResetToken } from '../services/operations/authAPI';

const ForgotPassword = () => {
    const {loading} = useSelector((state) => state.auth);
    const [emailSent, setEmailSent] = useState(false);
    const [email,setEmail] = useState("");
    const dispatch = useDispatch();

const handelOnSubmit = (e)=>{
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
}


    return (
        <div className=' text-white flex justify-center items-center w-[50%] mx-auto my-auto'>
            {
                loading ? (
                    <div>Loading...</div>
                ) : (
                    <div>
                        <h1 className=' text-4xl font-semibold flex items-center justify-center mx-auto p-4'>
                            {
                                !emailSent ? "Reset your password" : "Check your email"
                            }
                        </h1>
                        <p className=' text-lg text-richblack-200 px-1 mb-3'>
                            {
                                !emailSent ? "Have no fear, we will email you instruction to reset your password. if you don't have access then try recovery account" 
                                :
                                <div>

                                    We have sent you the reset email to <span className=' text-yellow-100 font-semibold '>{email}</span> 
                                </div>
                            }
                        </p>

                        <form onSubmit={handelOnSubmit}>
                            {
                                !emailSent && (
                                    <div className=' my-4'>
                                        {/* <label className='text-lg p-3'>Email</label> */}
                                        <input 
                                        required
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder='Enter your email address'
                                        className=' bg-richblack-700 w-full py-3 px-5 text-white rounded-lg '
                                        />
                                    </div>
                                )
                            }

                        <div className=' mx-auto flex justify-center py-3'>
                            <button 
                            className=' bg-yellow-100 px-4 py-3 w-full rounded-lg text-black font-bold '
                            type='submit'>
                                {
                                    !emailSent ? "Reset Password" : "Resend Email"
                                }
                            </button>
                        </div>
                        </form>

                        <div className=" flex items-center justify-center mt-6">
                                <Link to="/login">
                                <p className="flex items-center gap-x-2 text-richblack-5">
                                    <BiArrowBack /> Back To Login
                                </p>
                                </Link>
                            </div>

                    </div>
                )
            }
        </div>
    );
};

export default ForgotPassword;