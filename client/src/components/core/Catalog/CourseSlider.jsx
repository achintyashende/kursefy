// import React from 'react'

// import { Swiper, SwiperSlide } from "swiper/react"
// import "swiper/css"
// import "swiper/css/free-mode"
// import "swiper/css/pagination"
// import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper'
import React from 'react'

import {Swiper, SwiperSlide} from "swiper/react"
import { Navigation, Pagination,Autoplay, Scrollbar, A11y,FreeMode } from 'swiper/modules';

import "swiper/css"
import "swiper/css/free-mode"
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Course_Card from './Course_Card'

const CourseSlider = ({ Courses }) => {
    return (
        <>
            {Courses?.length ? (
                <Swiper
                    slidesPerView={1}
                    spaceBetween={25}
                    loop={true}
                    modules={[FreeMode, Pagination]}
                    breakpoints={{
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                    className="max-h-[30rem]"
                >
                    {Courses?.map((course, i) => (
                        <SwiperSlide key={i}>
                            <Course_Card course={course} Height={"h-[250px]"} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <p className="text-xl text-richblack-5">No Course Found</p>
            )}
        </>
    )
}

export default CourseSlider


// import React from 'react';

// const CourseSlider = () => {
//     return (
//         <div>
//             sdf
//         </div>
//     );
// };

// export default CourseSlider;