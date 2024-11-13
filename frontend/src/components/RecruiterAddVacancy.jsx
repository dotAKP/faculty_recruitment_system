import React, { useState } from 'react'
import axios from 'axios';
export default function RecruiterAddVacancy() {

   const [formData,setFormData] = useState({
    post:'',
    subject:'',
    location:'',
    criteria:'',
    experience:'',
    mode:'',
    vacancy:'',
    salary:'',
    advDate:'',
    lastDate:'',
    email:'',
    recruiter:'',
    name:''

   });
   const [subjectToggle,setSubjectToggle] = useState(false);

   function changeHandler(event){
        const  {name, value} = event.target;
        if(name == 'subject' && value == 'Other') {
            setSubjectToggle(!subjectToggle)
        }
        setFormData({...formData, [name] : value})
   }

   function submitHandler(event) {
        event.preventDefault();
    console.log(formData);

    async function addVacancy() {
         try {
            const response = await axios.post('http://localhost:8080/vacancy/addVacancy',formData,{
                headers:{
                    'Content-Type' : 'Application/json'
                },
                withCredentials:true
            });

            console.log(response);
         } catch (error) { 
            console.log(error);
         }
    }

    addVacancy();
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
                                <h1 className='text-blue-600 font-semibold text-lg'>Post</h1>
                                <input type="text"
                                name='post'
                                value={formData.post}
                                onChange={changeHandler}
                                    placeholder='Enter Post'
                                    className='p-2 border-2 border-blue-400  text-lg px-10 py-4 rounded-lg bg-neutral-100 outline-none'
                                />
                            </div>
                        </div>

                        <div>
                            <div className='mt-5'>
                                <h1 className='text-blue-600 font-semibold text-lg'>Subject</h1>
                            { !subjectToggle ? <select
                                name='subject'
                                className='p-2  border-2 border-blue-400  text-lg px-14 py-4 rounded-lg bg-neutral-100 outline-none'
                                value={formData.subject}
                                onChange={changeHandler}
                            >
                                <option value={''}>Select Type</option>
                                <option value={'School'}>Mathematics</option>
                                <option value={'College'}>Physics</option>
                                <option value={'Chemistry'}>Chemistry</option>
                                <option value={'Bussiness'}>Bussiness</option>
                                <option value={'Programming Language'}>Programming Language</option>
                                <option value={'Aptitude'}>Aptitude</option>
                                <option value={'Other'} >Other</option>
                            </select> :
                            <div>
                                  <input type="text"
                                name='subject'
                                value={formData.subject}
                                onChange={changeHandler}
                                    placeholder='Enter Post'
                                    className='p-2 border-2 border-blue-400  text-lg px-10 py-4 rounded-lg bg-neutral-100 outline-none'
                                />
                            </div>
                            }
                            </div>
                        </div>
                        <div>
                            <div className='mt-5'>
                                <h1 className='text-blue-600 font-semibold text-lg'>Location</h1>
                                <input type="text"
                                name='location'
                                value={formData.location}
                                onChange={changeHandler}
                                    placeholder='Enter Password'
                                    className='p-2 border-2 border-blue-400  text-lg px-10 py-4 rounded-lg bg-neutral-100 outline-none'
                                />
                            </div>
                        </div>

                        <div className='mt-5'>
                            <h1 className='text-blue-600 font-semibold text-lg'>Criteria</h1>
                            <select
                                name='criteria'
                                className='p-2  border-2 border-blue-400  text-lg px-14 py-4 rounded-lg bg-neutral-100 outline-none'
                                value={formData.criteria}
                                onChange={changeHandler}
                            >
                                <option value={''}>Select Type</option>
                                <option value={'Graduate'}>Graduate</option>
                                <option value={'Post Graduate'}>Post Graduate</option>
                                <option value={'Phd'}>Phd</option>
                            </select>
                        </div>

                        <div className='mt-5'>
                            <h1 className='text-blue-600 font-semibold text-lg'>Experience</h1>
                            <select
                                name='experience'
                                className='p-2  border-2 border-blue-400  text-lg px-14 py-4 rounded-lg bg-neutral-100 outline-none'
                                value={formData.experience}
                                onChange={changeHandler}
                            >
                                <option value={''}>Select Type</option>
                                <option value={'Fresher'}>Fresher</option>
                                <option value={'1+'}>1+</option>
                                <option value={'2+'}>2+</option>
                                <option value={'3+'}>3+</option>
                                <option value={'5+'}>5+</option>
                                <option value={'10+'}>10+</option>
                            </select>
                        </div>

                        <div className='mt-5'>
                            <h1 className='text-blue-600 font-semibold text-lg'>Mode</h1>
                            <select
                                name='mode'
                                className='p-2  border-2 border-blue-400  text-lg px-14 py-4 rounded-lg bg-neutral-100 outline-none'
                                value={formData.mode}
                                onChange={changeHandler}
                            >
                                <option value={''}>Select Type</option>
                                <option value={'PartTime'}>PartTime</option>
                                <option value={'FullTime'}>FullTime</option>
                            </select>
                        </div>


                    </div>

                    <div>
                    <div>
                            <div className='mt-5'>
                                <h1 className='text-blue-600 font-semibold text-lg'>Vacancy</h1>
                                <input type="text"
                                name='vacancy'
                                value={formData.vacancy}
                                onChange={changeHandler}
                                    placeholder='Enter Password'
                                    className='p-2 border-2 border-blue-400  text-lg px-10 py-4 rounded-lg bg-neutral-100 outline-none'
                                />
                            </div>
                        </div>

                        <div>
                            <div className='mt-5'>
                                <h1 className='text-blue-600 font-semibold text-lg'>Salary</h1>
                                <input type="text"
                                name='salary'
                                value={formData.salary}
                                onChange={changeHandler}
                                    placeholder='Enter Password'
                                    className='p-2 border-2 border-blue-400  text-lg px-10 py-4 rounded-lg bg-neutral-100 outline-none'
                                />
                            </div>
                        </div>


                        <div>
                            <div className='mt-5'>
                                <h1 className='text-blue-600 font-semibold text-lg'>Adv Date</h1>
                                <input type="date"
                                name='advDate'
                                value={formData.advDate}
                                onChange={changeHandler}
                                    placeholder='Enter Password'
                                    className='p-2 border-2 border-blue-400  text-lg px-10 py-4 rounded-lg bg-neutral-100 outline-none'
                                />
                            </div>
                        </div>

                        <div>
                            <div className='mt-5'>
                                <h1 className='text-blue-600 font-semibold text-lg'>Last Date</h1>
                                <input type="date"
                                name='lastDate'
                                value={formData.lastDate}
                                onChange={changeHandler}
                                    placeholder='Enter Password'
                                    className='p-2 border-2 border-blue-400  text-lg px-10 py-4 rounded-lg bg-neutral-100 outline-none'
                                />
                            </div>
                        </div>

                        <div>
                            <div className='mt-5'>
                                <h1 className='text-blue-600 font-semibold text-lg'>Email</h1>
                                <input type="text"
                                name='email'
                                value={formData.email}
                                onChange={changeHandler}
                                    placeholder='Enter Password'
                                    className='p-2 border-2 border-blue-400  text-lg px-10 py-4 rounded-lg bg-neutral-100 outline-none'
                                />
                            </div>
                        </div>

                        <div>
                            <div className='mt-5'>
                                <h1 className='text-blue-600 font-semibold text-lg'>Recruiter</h1>
                                <input type="text"
                                name='recruiter'
                                value={formData.recruiter}
                                onChange={changeHandler}
                                    placeholder='Enter Password'
                                    className='p-2 border-2 border-blue-400  text-lg px-10 py-4 rounded-lg bg-neutral-100 outline-none'
                                />
                            </div>
                        </div>

                        <div>
                            <div className='mt-5'>
                                <h1 className='text-blue-600 font-semibold text-lg'>Recruiter Name</h1>
                                <input type="text"
                                name='name'
                                value={formData.name}
                                onChange={changeHandler}
                                    placeholder='Enter Password'
                                    className='p-2 border-2 border-blue-400  text-lg px-10 py-4 rounded-lg bg-neutral-100 outline-none'
                                />
                            </div>
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
