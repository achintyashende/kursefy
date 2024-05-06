import React from 'react';
import error from "../components/core/gifs/error.gif"

const Error = () => {
    return (
        <div  className=' font-bold text-4xl text-yellow-100 flex flex-col justify-center items-center w-[50%] mx-auto my-auto'>
            <img src={error} alt="" 
            width="400px" height="300px"
            className=' p-10'/>
            {/* 404 Page Not Found */}
        </div>
    );
};

export default Error;