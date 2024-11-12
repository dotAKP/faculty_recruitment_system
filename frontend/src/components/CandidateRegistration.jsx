import React from 'react'

export default function CandidateRegistration() {
    return (
        <div className='p-10 bg-neutral-500 min-h-screen px-20'>
            <div className='bg-white p-4 rounded-lg border-black border-2'>
                <div className='px-10 py-4 flex justify-center my-10'>
                    <h1 className='text-4xl font-bold'>Candiate Registration Form</h1>
                </div>
                <div className='px-10 py-4 flex justify-start'>
                    <h1 className='text-2xl font-bold'>Candiate Details</h1>
                </div>
                <div className='bg-black h-1 mx-10'></div>


                <div className='flex justify-evenly mt-4'>

                    <div>
                        <div>
                            <div className='mt-5'>
                                <h1 className='text-blue-600 font-semibold text-lg'>Name</h1>
                                <input type="text"
                                    placeholder='Enter Full Name'
                                    className='p-2 border-2 border-blue-400  text-lg px-10 py-4 rounded-lg bg-neutral-100 outline-none'
                                />
                            </div>
                        </div>

                        <div>
                            <div className='mt-5'>
                                <h1 className='text-blue-600 font-semibold text-lg'>Email</h1>
                                <input type="text"
                                    placeholder='Enter email'
                                    className='p-2 border-2 border-blue-400  text-lg px-10 py-4 rounded-lg bg-neutral-100 outline-none'
                                />
                            </div>
                        </div>
                        <div>
                            <div className='mt-5'>
                                <h1 className='text-blue-600 font-semibold text-lg'>Password</h1>
                                <input type="password"
                                    placeholder='Enter Password'
                                    className='p-2 border-2 border-blue-400  text-lg px-10 py-4 rounded-lg bg-neutral-100 outline-none'
                                />
                            </div>
                        </div>


                    </div>

                    <div>
                        <div>
                            <div className='mt-5'>
                                <h1 className='text-blue-600 font-semibold text-lg'>Date</h1>
                                <input type="date"
                                    placeholder='DOB'
                                    className='p-2 border-2 border-blue-400  text-lg px-12 py-4 rounded-lg bg-neutral-100 outline-none'
                                />
                            </div>
                        </div>
                        <div>
                            <div className='mt-5'>
                                <h1 className='text-blue-600 font-semibold text-lg'>Gender</h1>
                                <select
                                    className='p-2  border-2 border-blue-400  text-lg px-14 py-4 rounded-lg bg-neutral-100 outline-none'

                                >
                                    <option value={''}>Select Gender</option>
                                    <option value={'Male'}>Male</option>
                                    <option value={'Female'}>Female</option>
                                    <option value={'Other'}>Other</option>
                                </select>
                            </div>
                        </div>

                    </div>

                </div>



                <div className='px-10 py-4 flex justify-start mt-4'>
                    <h1 className='text-2xl font-bold'>Education Details</h1>
                </div>
                <div className='bg-black h-1 mx-10'></div>


                <div className='flex justify-evenly mt-4'>

                    <div>
                        <div className='mt-5'>
                            <h1 className='text-blue-600 font-semibold text-lg'>Qualifications</h1>
                            <select
                                className='p-2  border-2 border-blue-400  text-lg px-14 py-4 rounded-lg bg-neutral-100 outline-none'

                            >
                                <option value={''}>Select Qualification</option>
                                <option value={'B.com'}>B.com</option>
                                <option value={'B.Tech'}>B.Tech</option>
                                <option value={'BBA'}>BBA</option>
                                <option value={'BCA'}>BCA</option>
                                <option value={'M.Tech'}>M.Tech</option>
                                <option value={'MCA'}>MCA</option>
                                <option value="PHD">PHD</option>
                            </select>
                        </div>

                        <div>
                            <div className='mt-5'>
                                <h1 className='text-blue-600 font-semibold text-lg'>Percentage</h1>
                                <input type="text"
                                    placeholder='Enter Percentage'
                                    className='p-2 border-2 border-blue-400  text-lg px-10 py-4 rounded-lg bg-neutral-100 outline-none'
                                />
                            </div>
                        </div>

                    </div>
                    <div className='mt-5'>
                        <h1 className='text-blue-600 font-semibold text-lg'>Experiances</h1>
                        <select
                            className='p-2  border-2 border-blue-400  text-lg px-14 py-4 rounded-lg bg-neutral-100 outline-none'

                        >
                            <option value={''}>Select Experiance</option>
                            <option value={'Fresher'}>Fresher</option>
                            <option value={'1+ year'}>1+ year</option>
                            <option value={'2+ year'}>2+ year</option>
                            <option value={'3+ year'}>3+ year</option>
                            <option value={'5+ year'}>5+ year</option>
                            <option value={'10+ year'}>10+ year</option>
                        </select>
                    </div>


                </div>




                <div className='px-10 py-4 flex justify-start mt-4'>
                    <h1 className='text-2xl font-bold'>Address Details</h1>
                </div>
                <div className='bg-black h-1 mx-10'></div>


                <div className='flex justify-evenly mt-4 mb-10'>


                    <div>
                        <div className='mt-5'>
                            <h1 className='text-blue-600 font-semibold text-lg'>Address</h1>
                            <textarea type="text"
                                placeholder='Enter Address'
                                className='p-2 border-2 border-blue-400  text-lg px-10 py-4 rounded-lg bg-neutral-100 outline-none'
                            />
                        </div>
                    </div>

                    <div>
                        <div className='mt-5'>
                            <h1 className='text-blue-600 font-semibold text-lg'>Mobile Number</h1>
                            <input type="number"
                                placeholder='Enter Mobile No'
                                className='p-2 border-2 border-blue-400  text-lg px-10 py-4 rounded-lg bg-neutral-100 outline-none'
                            />
                        </div>
                    </div>





                </div>

                <div className='flex justify-center mt-16'>
                    <button className='bg-black text-white font-bold text-lg rounded-lg px-14 py-4'>Submit</button>
                </div>

            </div>
        </div>

    )
}
