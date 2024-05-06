import React from "react"
import copy from "copy-to-clipboard"
import { toast } from "react-hot-toast"
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { addToCart } from "../../../slices/cartSlice"
import { ACCOUNT_TYPE } from "../../../utils/constants"


function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        thumbnail: ThumbnailImage,
        price: CurrentPrice,
        _id: courseId,
    } = course

    const handleShare = () => {
        copy(window.location.href)
        toast.success("Link copied to clipboard")
    }

    const handleAddToCart = () => {
        if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("You are an Instructor. You can't buy a course.")
            return
        }
        if (token) {
            dispatch(addToCart(course))
            return
        }
        setConfirmationModal({
            text1: "You are not logged in!",
            text2: "Please login to add To Cart",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
        })
    }

    // console.log("Student already enrolled ", course?.studentsEnrolled, user?._id)

    return (
        <>
            <div
                className={`flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5`}
            >
                {/* Course Image */}
                <img
                    src={ThumbnailImage}
                    alt={course?.courseName}
                    className="max-h-[300px] min-h-[120px] w-[250px] mx-auto overflow-hidden rounded-2xl object-cover md:max-w-full"
                />

                <div className="px-4">
                    <div className="space-x-3 pb-4 text-3xl font-semibold">
                        Rs. {CurrentPrice}
                    </div>
                    <div className="flex flex-col gap-4">
                        <button
                            className={"bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 "}
                            onClick={
                                user && course?.studentsEnrolled.includes(user?._id)
                                    ? () => navigate("/dashboard/enrolled-courses")
                                    : handleBuyCourse
                            }
                        >
                            {user && course?.studentsEnrolled.includes(user?._id)
                                ? "Go To Course"
                                : "Buy Now"}
                        </button>
                        {(!user || !course?.studentsEnrolled.includes(user?._id)) && (
                            <button onClick={handleAddToCart} className="blackButton">
                                Add to Cart
                            </button>
                        )}
                    </div>
                    <div>
                        <p className="pb-3 pt-6 text-center text-sm text-richblack-25">
                            30-Day Money-Back Guarantee
                        </p>
                    </div>

                    <div className={``}>
                        <p className={`my-2 text-xl font-semibold `}>
                            This Course Includes :
                        </p>
                        <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
                            {course?.instructions?.map((item, i) => {
                                return (
                                    <p className={`flex gap-2`} key={i}>
                                        <BsFillCaretRightFill />
                                        <span>{item}</span>
                                    </p>
                                )
                            })}
                        </div>
                    </div>
                    <div className="text-center">
                        <button
                            className="mx-auto flex items-center gap-2 py-6 text-yellow-100 "
                            onClick={handleShare}
                        >
                            <FaShareSquare size={15} /> Share
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CourseDetailsCard


// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import copy from 'copy-to-clipboard';
// import { toast } from 'react-hot-toast';
// import { ACCOUNT_TYPE } from '../../../utils/constants';
// import { addToCart } from '../../../slices/cartSlice';

// function CourseDetailsCard({course, setConfirmationModal, handleBuyCourse}) {

//     const {user} = useSelector((state)=>state.profile);
//     const {token} = useSelector((state)=>state.auth);
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const {
//         thumbnail: ThumbnailImage,
//         price: CurrentPrice,

//     } = course;


//     const handleAddToCart = () => {
//         if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
//             toast.error("You are an Instructor, you cant buy a course");
//             return;
//         }
//         if(token) {
//             console.log("dispatching add to cart")
//             dispatch(addToCart(course));
//             return;
//         }
//         setConfirmationModal({
//             text1:"you are not logged in",
//             text2:"Please login to add to cart",
//             btn1text:"login",
//             btn2Text:"cancel",
//             btn1Handler:()=>navigate("/login"),
//             btn2Handler: ()=> setConfirmationModal(null),
//         })
//     }

//     const handleShare = () => {
//         copy(window.location.href);
//         toast.success("Link Copied to Clipboard")
//     }

//     return (
//         <div>
//             <img
//                 src={ThumbnailImage}
//                 alt='Thumbnail Image'
//                 className='max-h-[300px] min-h-[180px] w-[400px] rounded-xl'
//             />
//             <div>
//                 Rs. {CurrentPrice}
//             </div>
//             <div className='flex flex-col gap-y-6'>
//                 <button
//                 className='bg-yellow-50 w-fit text-richblack-900'
//                     onClick={
//                         user && course?.studentsEnrolled.includes(user?._id)
//                         ? ()=> navigate("/dashboard/enrolled-courses")
//                         : handleBuyCourse
//                     }
//                 >
//                     {
//                         user && course?.studentsEnrolled.includes(user?._id) ? "Go to Course ": "Buy Now"
//                     }
//                 </button>

//                 {
//                     (!course?.studentsEnrolled.includes(user?._id)) && (
//                         <button onClick={handleAddToCart}
//                         className='bg-yellow-50 w-fit text-richblack-900'>
//                             Add to Cart
//                         </button>
//                     )
//                 }
//             </div>

//             <div>
//                 <p>
//                     30-Day Money-Back Guarantee
//                 </p>
//                 <p>
//                     This Course Includes:
//                 </p>
//                 <div className='flex flex-col gap-y-3'>
//                     {
//                         course?.instructions?.map((item, index)=> (
//                             <p key={index} className='flex gap-2'>
//                                 <span>{item}</span>
//                             </p>
//                         ))
//                     }
//                 </div>
//             </div>
//             <div>
//                 <button
//                 className='mx-auto flex items-center gap-2 p-6 text-yellow-50'
//                 onClick={handleShare}
//                 >
//                     Share
//                 </button>
//             </div>
//         </div>
//     );

// }

// export default CourseDetailsCard