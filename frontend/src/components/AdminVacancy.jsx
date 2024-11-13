import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AdminNavigationBar from './AdminNavigationBar';

export default function AdminVacancy() {

    const [vacancyList, setVacancyList] = useState([]);

    useEffect(() => {

        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:8080/admin/adminVacancyList', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    withCredentials: true

                });
                console.log(response);
                setVacancyList(response.data.vacancyList);
            } catch (error) {
                console.log(error);
            }

        }
        fetchData();


    }, [])



    return (
        <div className=''>
            <AdminNavigationBar/>
            <div className='w-[100%] overflow-x-auto'>
                <table className='w-[100%] '>
                    <thead className='border-2 border-black w-[100%] bg-neutral-200'>
                    <th className='border-2 border-black  py-6 text-xl font-extrabold'>S.no</th>
                        <th className='border-2 border-black  py-6 text-lgfont-extrabold'>Id</th>
                        <th className='border-2 border-black py-6 text-lg font-extrabold'>Name</th>
                        <th className='border-2 border-black py-6 text-lg font-extrabold w-[8%]'>Email</th>
                        <th className='border-2 border-black  py-6 text-lg font-extrabold'>Post</th>
                        <th className='border-2 border-black  py-6 text-lg font-extrabold'>Recruiter</th>
                        <th className='border-2 border-black  py-6 text-lg font-extrabold'>Location</th>
                        <th className='border-2 border-black  py-6 text-lg font-extrabold'>Mode</th>
                        <th className='border-2 border-black  py-6 text-lg font-extrabold'>Subject</th>
                        <th className='border-2 border-black  py-6 text-lg font-extrabold'>Vacancy</th>
                        <th className='border-2 border-black  py-6 text-lg font-extrabold'>Vacancy Id</th>
                        <th className='border-2 border-black  py-6 text-lg font-extrabold'>Salary</th>
                        <th className='border-2 border-black  py-6 text-lg font-extrabold'>Criteria</th>
                        <th className='border-2 border-black  py-6 text-lg font-extrabold'>Experiance</th>
                        <th className='border-2 border-black  py-6 text-lg font-extrabold'>Adv Date</th>
                        <th className='border-2 border-black  py-6 text-lg font-extrabold'>Last Date</th>
                    </thead>
                    <tbody>
                        {
                            vacancyList?.map((item, index) => <tr key={index} className=''>
                                <td className='border-2 border-black  px-4  py-4 font-semibold'><div className='text-xl'>{index + 1}.</div></td>
                                <td className='border-2 border-black  px-4   py-4 font-semibold'><div>{item._id}</div></td>
                                <td className='border-2 border-black  px-4 py-4 font-semibold'><div className='items-center font-bold ml-2'>{item.name}</div></td>
                                <td className='border-2 border-black  px-4 py-4 font-semibold w-[8%]'><div className='text-blue-700 '>{item.email}</div></td>
                                <td className='border-2 border-black px-4  py-4 font-semibold'><div className='ml-2'>{item.post}</div></td>
                                <td className='border-2 border-black px-4  py-4 font-semibold'><div className='ml-2'>{item.recruiter}</div></td>
                                <td className='border-2 border-black px-4  py-4 font-semibold'><div className={` ml-2`}>{item.location}</div></td>
                                <td className='border-2 border-black px-4  py-4 font-semibold'><div className={`ml-4`}>{item.mode}</div></td>
                                <td className='border-2 border-black  px-4 py-4 font-semibold'><div className={`ml-2`}>{item.subject}</div></td>
                                <td className='border-2 border-black px-4  py-4 font-semibold'><div className={`ml-2`}>{item.vacancy}</div></td>
                                <td className='border-2 border-black px-4  py-4 font-semibold'><div className={`font-bold text-lg ml-4`}>{item.vacancyId}</div></td>
                                <td className='border-2 border-black px-4  py-4 font-semibold'><div className={`ml-2 text-blue-600`}>{item.salary}</div></td>
                                <td className='border-2 border-black px-4  py-4 font-semibold'><div className={`ml-2`}>{item.criteria}</div></td>
                                <td className='border-2 border-black px-4  py-4 font-semibold'><div className={`ml-2`}>{item.experience}</div></td>
                                <td className='border-2 border-black px-4  py-4 font-semibold'><div className={`ml-2`}>{item.advDate}</div></td>
                                <td className='border-2 border-black px-4  py-4 font-semibold'><div className={`ml-2`}>{item.lastDate}</div></td>
                            </tr>
                            )

                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
