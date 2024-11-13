import React, { useEffect, useState } from 'react'
import axios from 'axios';
import CandidateNavigationBar from './CandidateNavigationBar';

export default function CandidateMyStatus() {


    const [appliedVacancyList, setAppliedVacancyList] = useState([]);
    const [email, setEmail] = useState('');

    useEffect(() => {

        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:8080/candidate/myStatus', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    withCredentials: true

                });
                console.log(response);
                setAppliedVacancyList(response.data.appliedVacancyList);
                setEmail(response.data.email);
            } catch (error) {
                console.log(error);
            }

        }
        fetchData();


    }, [])



    return (
        <div className=''>
            <CandidateNavigationBar />
            <div className='w-[100%] overflow-x-auto'>
                <table className='w-[100%] '>
                    <thead className='border-2 border-black w-[100%] bg-neutral-200'>
                        <th className='border-2 border-black  py-6 text-xl font-extrabold'>S.no</th>
                        <th className='border-2 border-black  py-6 text-lg font-extrabold'>Applied Vacancy Id</th>
                        <th className='border-2 border-black py-6 text-lg font-extrabold'>Candidate Email</th>
                        <th className='border-2 border-black py-6 text-lg font-extrabold w-[8%]'>Post</th>
                        <th className='border-2 border-black  py-6 text-lg font-extrabold'>Recruiter</th>
                        <th className='border-2 border-black  py-6 text-lg font-extrabold'>Recruiter Status</th>
                        <th className='border-2 border-black  py-6 text-lg font-extrabold'>Vacancy Id</th>

                    </thead>
                    <tbody>
                        {
                            appliedVacancyList?.map((item, index) => <tr key={index} className=''>
                                <td className='border-2 border-black  px-4  py-4 font-semibold'><div className='text-xl'>{index + 1}.</div></td>
                                <td className='border-2 border-black  px-4   py-4 font-semibold'><div>{item.appliedVacancyId}</div></td>
                                <td className='border-2 border-black  px-4 py-4 font-semibold'><div className='items-center font-bold ml-2 text-blue-600'>{item.candidateEmail}</div></td>
                                <td className='border-2 border-black  px-4 py-4 font-semibold w-[8%]'><div className='ml-2 '>{item.post}</div></td>
                                <td className='border-2 border-black px-4  py-4 font-semibold'><div className='ml-2 text-blue-600'>{item.recruiterEmail}</div></td>
                                <td className='border-2 border-black px-4  py-4 font-semibold'><div className={`${item.recruiterStatus == 'Shortlisted' ? "text-green-600" : "text-red-600"} font-bold text-lg ml-2`}>{item.recruiterStatus}</div></td>
                                <td className='border-2 border-black px-4  py-4 font-semibold'><div className='ml-2'>{item.vacancyId}</div></td>
                            </tr>
                            )

                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
