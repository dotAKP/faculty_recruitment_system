import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

export default function RecruiterRegistration() {

   const [formData,setFormData] = useState({
    name:'',
    recruiter:'',
    email:'',
    password:'',
    contact:9245678433,
    address:''

   });

   function changeHandler(event){
        const  {name, value} = event.target;
        setFormData({...formData, [name] : value})
   }

   function submitHandler(event) {
        event.preventDefault();
    console.log(formData);
   
        async function registerRecruiter() {
            try {
                const response = await axios.post("http://localhost:8080/recruiter/recruiterRegistration",formData,{
                    headers:{
                        'Content-Type':'Application/json'
                    },
                    withCredentials : true
                });

                console.log(response);
                toast.success('Please Verify your Email');
                
            } catch (error) {
                console.log(error);
            }
        }
        registerRecruiter();
    
   }




    return (
        <div className='p-10 bg-neutral-500 min-h-screen px-20'>
            <form className='bg-white p-4 rounded-lg border-black border-2' onSubmit={submitHandler}>
                <div className='px-10 py-4 flex justify-center my-10'>
                    <h1 className='text-4xl font-bold'>Recruiter Registration Form</h1>
                </div>
                <div className='px-10 py-4 flex justify-start'>
                    <h1 className='text-2xl font-bold'>Candiate Details</h1>
                </div>
                <div className='bg-black h-1 mx-10'></div>


                <div className='flex justify-evenly mt-4'>

                    <div>
                        <div>
                            <div className='mt-5'>
                                <h1 className='text-black font-semibold text-lg'>Name</h1>
                                <input type="text"
                                name='name'
                                value={formData.name}
                                onChange={changeHandler}
                                    placeholder='Enter Full Name'
                                    className='p-2 border-2 border-neutral-500  text-lg px-10 py-4 rounded-lg bg-neutral-100 outline-none'
                                />
                            </div>
                        </div>

                        <div>
                            <div className='mt-5'>
                                <h1 className='text-black font-semibold text-lg'>Email</h1>
                                <input type="text"
                                name='email'
                                value={formData.email}
                                onChange={changeHandler}
                                    placeholder='Enter email'
                                    className='p-2 border-2 border-neutral-500  text-lg px-10 py-4 rounded-lg bg-neutral-100 outline-none'
                                />
                            </div>
                        </div>
                        <div>
                            <div className='mt-5'>
                                <h1 className='text-black font-semibold text-lg'>Password</h1>
                                <input type="password"
                                name='password'
                                value={formData.password}
                                onChange={changeHandler}
                                    placeholder='Enter Password'
                                    className='p-2 border-2 border-neutral-500  text-lg px-10 py-4 rounded-lg bg-neutral-100 outline-none'
                                />
                            </div>
                        </div>


                    </div>

                    <div>
                        <div className='mt-5'>
                            <h1 className='text-black font-semibold text-lg'>Recruiter Type</h1>
                            <select
                                name='recruiter'
                                className='p-2  border-2 border-neutral-500  text-lg px-14 py-4 rounded-lg bg-neutral-100 outline-none'
                                value={formData.recruiter}
                                onChange={changeHandler}
                            >
                                <option value={''}>Select Type</option>
                                <option value={'School'}>School</option>
                                <option value={'College'}>College</option>
                                <option value={'Professional Institute'}>Professional Institute</option>
                            </select>
                        </div>

                    </div>

                </div>



                <div className='px-10 py-4 flex justify-start mt-4'>
                    <h1 className='text-2xl font-bold'>Address Details</h1>
                </div>
                <div className='bg-black h-1 mx-10'></div>


                <div className='flex justify-evenly mt-4 mb-10'>


                    <div>
                        <div className='mt-5'>
                            <h1 className='text-black font-semibold text-lg'>Address</h1>
                            <textarea type="text"
                            name='address'
                            value={formData.address}
                            onChange={changeHandler}
                                placeholder='Enter Address'
                                className='p-2 border-2 border-neutral-500  text-lg px-10 py-4 rounded-lg bg-neutral-100 outline-none'
                            />
                        </div>
                    </div>

                    <div>
                        <div className='mt-5'>
                            <h1 className='text-black font-semibold text-lg'>Mobile Number</h1>
                            <input type="number"
                            name='contact'
                            value={formData.contact}
                            onChange={changeHandler}
                                placeholder='Enter Mobile No'
                                className='p-2 border-2 border-neutral-500  text-lg px-10 py-4 rounded-lg bg-neutral-100 outline-none'
                            />
                        </div>
                    </div>





                </div>

                <div className='flex justify-center mt-16'>
                    <button className='bg-black text-white font-bold text-lg rounded-lg px-14 py-4'>Submit</button>
                </div>

            </form>
        </div>

    )
}
