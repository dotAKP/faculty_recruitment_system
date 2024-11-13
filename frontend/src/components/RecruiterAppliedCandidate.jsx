import React, { useEffect, useState } from 'react'
import axios from 'axios';
import CandidateNavigationBar from './CandidateNavigationBar';
import RecruiterNavigationBar from './RecruiterNavigationBar';

export default function RecruiterAppliedCandidate() {


    const [appliedVacancyList, setAppliedVacancyList] = useState([]);
    const [email, setEmail] = useState('');
    const [formData, setFormData] = useState({
        vacancyId: '',
        recruiterStatus: ''
    });

    useEffect(() => {

        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:8080/recruiter/appliedCandidateList', {
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

    function changeHandler(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }


    return (
        <div className=''>
            <RecruiterNavigationBar />
            <div className='w-[100%] overflow-x-auto'>
                <table className='w-[100%] '>
                    <thead className='border-2 border-black w-[100%] bg-neutral-200'>
                        <th className='border-2 border-black  py-6 text-xl font-extrabold'>S.no</th>
                        <th className='border-2 border-black  py-6 text-lgfont-extrabold'>Applied Id</th>
                        <th className='border-2 border-black py-6 text-lg font-extrabold'>Vacancy Id</th>
                        <th className='border-2 border-black py-6 text-lg font-extrabold w-[8%]'>Recruiter Email</th>
                        <th className='border-2 border-black  py-6 text-lg font-extrabold'>Post</th>
                        <th className='border-2 border-black  py-6 text-lg font-extrabold'>Candidate Email</th>
                        <th className='border-2 border-black  py-6 text-lg font-extrabold'>Recruiter Status</th>


                    </thead>
                    <tbody>
                        {
                            appliedVacancyList?.map((item, index) => <tr key={index} className=''>
                                <td className='border-2 border-black  px-4  py-4 font-semibold'><div className='text-xl'>{index + 1}.</div></td>
                                <td className='border-2 border-black  px-4   py-4 font-semibold'><div>{item.appliedVacancyList}</div></td>
                                <td className='border-2 border-black  px-4 py-4 font-semibold'><div className='items-center font-bold ml-2'>{item.vacancyId}</div></td>
                                <td className='border-2 border-black  px-4 py-4 font-semibold w-[8%]'><div className='text-blue-700 '>{item.recruiterEmail}</div></td>
                                <td className='border-2 border-black px-4  py-4 font-semibold'><div className='ml-2'>{item.post}</div></td>
                                <td className='border-2 border-black px-4  py-4 font-semibold'><div className='ml-2'>{item.candidateEmail}</div></td>
                                <td className='border-2 border-black px-4  py-4 font-semibold'>
                                    <select
                                        name='recruiterStatus'
                                        value={formData.recruiterStatus}
                                        onChange={changeHandler}
                                        className={`${formData.recruiterStatus == 'Shortlisted' ? 'text-green-500' : 'text-red-600'} outline-none border-2 border-black ml-2 mt-2 text-lg p-2`}>
                                        <option value={`${item.recruiterStatus}`}>{item.recruiterStatus}</option>
                                        <option value="Shortlisted" ><div className='text-green-600'>Shortlisted</div></option>
                                        <option value="BetterLuckNextTime"><div className='text-red-600'>Better Luck Next Time</div></option>
                                        <option value="Rejected"><div className='text-red-600'>Rejected</div></option>
                                    </select>

                                    <div className='flex justify-center py-6'><button
                                        className='bg-blue-600 text-white rounded-lg px-10 py-3 text-lg font-bold'
                                        onClick={() => {
                                      
                                            async function updateRecruiterStatus() {

                                                console.log(formData);
                                                try {
                                                    let res = await axios.put("http://localhost:8080/recruiter/recruiterUpdateStatus", {
                                                        recruiterStatus: formData.recruiterStatus
                                                        , vacancyId: item.vacancyId
                                                    }, {
                                                        headers: {
                                                            'Content-Type': 'Application/json'
                                                        },
                                                        withCredentials: true
                                                    });

                                                    console.log(res);
                                                } catch (error) {
                                                    console.log(error);
                                                }
                                            }

                                            updateRecruiterStatus();
                                        }}>
                                        Update Status
                                    </button></div>
                                </td>


                            </tr>
                            )

                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
