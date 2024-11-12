import React, { useEffect,useState } from 'react'
import axios from 'axios';

export default function AdminCandidate() {

    const [recruiterList, setRecruiterList] = useState([]);

    useEffect(() => {

        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:8080/admin/adminRecruiterList',{
                    headers:{
                        'Content-Type':'application/json',
                        'Accept': 'application/json'
                    },
              
                });
                console.log(response.data.recruiterList);
                setRecruiterList(response.data.recruiterList);
            } catch (error) {
                console.log(error);
            }

        }
        fetchData();


    }, [])



    return (
        <div className=''>
            <div className='bg-black flex'>
                <div className='text-white font-bold text-2xl px-4 py-4 ml-16'>
                    Home
                </div>
                <div className='text-white font-bold text-2xl px-4 py-4 ml-10'>
                    Candidate
                </div>
                <div className='text-white font-bold text-2xl px-4 py-4 ml-10'>
                    Recruiter
                </div>
                <div className='text-white font-bold text-2xl px-4 py-4 ml-10'>
                    Vacancy
                </div>
            </div>
        </div>
    )
}
