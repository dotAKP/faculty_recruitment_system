import React,{useState} from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
export default function CandidateLogin() {
    
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email:'ashishkumarpatel920@gmail.com',
        password:'12345678'
    }) 


    function changeHandler(event) {
          const {name , value} = event.target;

          setFormData({...formData, [name] : value});
    }

    function submitHandler(event) {
       event.preventDefault();

       console.log(formData);
       async function loginHandler() {
        try {
         const res = await axios.post("http://localhost:8080/candidate/candidateLogin",{
             email:formData.email,
             password:formData.password
         },{
             headers:{
                 'Content-Type' : 'Application/json'
             },

             withCredentials:true
         });

         console.log(res);
         toast.success('Candidate Logged In Successfully');
         navigate('/candidateVacancy');
        } catch (error) {
         console.log(error);
        }
    }

    loginHandler();

    }


    return (
        <div className='bg-neutral-400 min-h-screen flex justify-center items-center w-[100%] '>
            <form onSubmit={submitHandler} className='bg-white   rounded-lg'>
                <div className='bg-black rounded-t-lg'>
                    <h1 className='font-bold text-4xl text-white px-16 py-6  '>Candidate Login </h1>
                </div>

                <div className='mt-5 flex justify-center'>

               
                <div className='mt-5'>
                    <h1 className='text-blue-600 font-semibold text-lg'>Email</h1>
                    <input type="text"
                    value={formData.email}
                    onChange={changeHandler}
                    name='email'
                        placeholder='Enter email'
                        className='p-2 border-2 border-blue-400  text-lg px-10 py-4 rounded-lg bg-neutral-100 outline-none'
                    />
                </div>
                </div>

                <div className='mt-8 flex justify-center'>


                    <div className=''>
                        <h1 className='text-blue-600 font-semibold text-lg'>Password</h1>
                        <input type="password"
                        value={formData.password}
                        onChange={changeHandler}
                        name='password'
                        placeholder='Enter Password'
                        className='p-2 border-2 border-blue-400 text-lg px-10 py-4 rounded-lg bg-neutral-100 outline-none'
                    />
                    </div>
                </div>

                <div className='flex justify-center mt-12 mb-12'>
                    <button className='bg-black px-12 py-4 text-white text-lg font-bold rounded-lg'>Submit</button>
                </div>
            </form>
        </div>
    )
}
