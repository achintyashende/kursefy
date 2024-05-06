import React, { useEffect, useState } from 'react'

const RequirementField = ({ name, label, register, errors, setValue, getValues }) => {
    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([]);


    useEffect(() => {
        register(name, {
            required: true,
            // validate: (value) => value.length > 0
        })
    }, [])

    useEffect(() => {
        setValue(name, requirementList);
    }, [requirementList])

    const handleAddRequirement = () => {
        if (requirement) {
            setRequirementList([...requirementList, requirement]);
            //setRequirement("");
        }
    }

    const handleRemoveRequirement = (index) => {
        const updatedRequirementList = [...requirementList];
        updatedRequirementList.splice(index, 1);
        setRequirementList(updatedRequirementList);
    }

    return (
        <div>

            <label htmlFor={name} className=' text-sm text-richblack-5'>{label}<sup className=' text-pink-300'> *</sup></label>
            <div>
                <input
                    type='text'
                    id={name}
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                    className="form-style w-full  bg-richblack-700 p-2 rounded-md text-white"
                />
                <button
                    type='button'
                    onClick={handleAddRequirement}
                    className='font-semibold text-yellow-50 p-2'>
                    Add
                </button>
            </div>

            {
                requirementList.length > 0 && (
                    <ul>
                        {
                            requirementList.map((requirement, index) => (
                                <li key={index} className='flex items-center py-2 text-richblack-5'>
                                    <span>{requirement}</span>
                                    <button
                                        type='button'
                                        onClick={() => handleRemoveRequirement(index)}
                                        className='text-xs px-2 bg-richblack-600 p-1 rounded-lg mx-3 text-pure-greys-300'>
                                        clear
                                    </button>
                                </li>
                            ))
                        }
                    </ul>
                )
            }
            {errors[name] && (
                <span>
                    {label} is required
                </span>
            )}

        </div>
    )
}

export default RequirementField
