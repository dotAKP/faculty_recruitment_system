import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AdminNavigationBar from './AdminNavigationBar';
import toast from 'react-hot-toast';
export default function AdminCandidate() {

    const [candidateList, setCandidateList] = useState([]);

    useEffect(() => {

        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:8080/admin/adminCandidateList', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    withCredentials: true

                });
                console.log(response);
                setCandidateList(response.data.candidateList);
            } catch (error) {
                console.log(error);
            }

        }
        fetchData();


    }, [])



    return (
        <div className=''>
            <AdminNavigationBar/>
            <div className='w-[100%] '>
                <table className='w-[100%]'>
                    <thead className='border-2 border-black w-[100%] bg-neutral-200'>
                    <th className='border-2 border-black px-1 py-6 text-xl font-extrabold'>S.no</th>
                        <th className='border-2 border-black px-1 py-6 text-xl font-extrabold'>Id</th>
                        <th className='border-2 border-black px-1 py-6 text-xl font-extrabold'>Name</th>
                        <th className='border-2 border-black px-1 py-6 text-xl font-extrabold'>Email</th>
                        <th className='border-2 border-black px-1 py-6 text-xl font-extrabold'>Address</th>
                        <th className='border-2 border-black px-1 py-6 text-xl font-extrabold'>Contact</th>
                        <th className='border-2 border-black px-1 py-6 text-xl font-extrabold'>Qualification</th>
                        <th className='border-2 border-black px-1 py-6 text-xl font-extrabold'>Percentage</th>
                        <th className='border-2 border-black px-1 py-6 text-xl font-extrabold'>Experiance</th>
                        <th className='border-2 border-black px-1 py-6 text-xl font-extrabold'>Gender</th>
                        <th className='border-2 border-black px-1 py-6 text-xl font-extrabold'>EmailVerfiy</th>
                        <th className='border-2 border-black px-1 py-6 text-xl font-extrabold'>AdminVerify</th>
                    </thead>
                    <tbody>
                        {
                            candidateList?.map((item, index) => <tr key={index}>
                                <td className='border-2 border-black px-2   py-4 font-semibold'><div className='text-xl'>{index + 1}.</div></td>
                                <td className='border-2 border-black px-auto   py-4 font-semibold'><div>{item._id}</div></td>
                                <td className='border-2 border-black  px-4 py-4 font-semibold'><div className='items-center font-bold ml-2'>{item.name}</div></td>
                                <td className='border-2 border-black   py-4 font-semibold'><div className='text-blue-700 ml-2'>{item.email_id}</div></td>
                                <td className='border-2 border-black  px-2 py-4 font-semibold'><div className='ml-2'>{item.address}</div></td>
                                <td className='border-2 border-black px-2  py-4 font-semibold'><div className='ml-2'>{item.contact}</div></td>
                                <td className='border-2 border-black px-2  py-4 font-semibold'><div className={`font-bold text-lg ml-4`}>{item.qualification}</div></td>
                                <td className='border-2 border-black px-2  py-4 font-semibold'><div className={`ml-4`}>{item.percentage}</div></td>
                                <td className='border-2 border-black px-2  py-4 font-semibold'><div className={`ml-2`}>{item.experience}</div></td>
                                <td className='border-2 border-black px-2  py-4 font-semibold'><div className={`ml-2`}>{item.gender}</div></td>
                                <td className='border-2 border-black px-2  py-4 font-semibold'><div className={`${item.emailVerify == 'verified' ? 'text-green-500':"text-red-600"} font-bold text-lg ml-4`}
                                
                                >{item.emailVerify}</div></td>
                                <td className='border-2 border-black px-2  py-4 font-semibold'><div className={`${item.adminVerify == 'verified' ? 'text-green-500':"text-red-600"} font-bold text-lg ml-4`}
                                onClick={()=>{

                                    async function apiCall(){
                                       try {
                                        
                                        const response = await axios.get(`http://localhost:8080/admin/adminVerifyCandidate?candidateEmail=${item.emai_id}`,{
                                            headers:{
                                                'Content-Type':'Application/json'
                                            },
                                            withCredentials:true
                                        });
                                        console.log(response);
                                        toast.success('Candidate Verify Successfully');
                                       } catch (error) {
                                        console.log(error);
                                       }
                                    }
                                    apiCall();
                                }}
                                >{item.adminVerify}</div></td>
                            </tr>
                            )

                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
