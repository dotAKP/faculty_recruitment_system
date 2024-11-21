import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AdminNavigationBar from './AdminNavigationBar';
import toast from 'react-hot-toast'
export default function AdminRecruiter() {

    const [recruiterList, setRecruiterList] = useState([]);
    const [render, setRender] = useState(false);
    useEffect(() => {

        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:8080/admin/adminRecruiterList', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    withCredentials: true

                });
                console.log(response);
                setRecruiterList(response.data.recruiterList);
            } catch (error) {
                console.log(error);
            }

        }
        fetchData();


    }, [render])



    return (
        <div className=''>
            <AdminNavigationBar/>
            <div className='w-[100%] '>
                <table className='w-[100%]'>
                    <thead className='border-2 border-black w-[100%] bg-neutral-200'>
                    <th className='border-2 border-black px-2 py-6 text-xl font-extrabold'>S.no</th>
                        <th className='border-2 border-black px-auto py-6 text-xl font-extrabold'>Id</th>
                        <th className='border-2 border-black px-6 py-6 text-xl font-extrabold'>Name</th>
                        <th className='border-2 border-black px-10 py-6 text-xl font-extrabold'>Recruiter</th>
                        <th className='border-2 border-black px-auto py-6 text-xl font-extrabold'>Email</th>
                        <th className='border-2 border-black px-6 py-6 text-xl font-extrabold'>Address</th>
                        <th className='border-2 border-black px-10 py-6 text-xl font-extrabold'>Contact</th>
                        <th className='border-2 border-black px-4 py-6 text-xl font-extrabold'>Status</th>
                        <th className='border-2 border-black px-4 py-6 text-xl font-extrabold'>EmailVerfiy</th>
                        <th className='border-2 border-black px-4 py-6 text-xl font-extrabold'>AdminVerify</th>
                    </thead>
                    <tbody >
                        {
                            recruiterList?.map((item, index) => <tr key={index} className='bg-neutral-100'>
                                <td className='border-2 border-black px-2   py-4 font-semibold'><div>{index + 1}</div></td>
                                <td className='border-2 border-black px-auto   py-4 font-semibold'><div>{item._id}</div></td>
                                <td className='border-2 border-black  px-8 py-4 font-semibold'><div className='items-center font-bold'>{item.name}</div></td>
                                <td className='border-2 border-black  px-10 py-4 font-semibold'><div>{item.recruiter}</div></td>
                                <td className='border-2 border-black   py-4 font-semibold'><div className='text-blue-700'>{item.email}</div></td>
                                <td className='border-2 border-black  px-10 py-4 font-semibold'><div>{item.address}</div></td>
                                <td className='border-2 border-black px-10  py-4 font-semibold'><div>{item.contact}</div></td>
                                <td className='border-2 border-black px-10  py-4 font-semibold'><div className={`${item.status === 'true' ? 'text-blue-800':"text-red-600"} font-bold `}>{item.status}</div></td>
                                <td className='border-2 border-black px-10  py-4 font-semibold'><div className={`${item.emailVerify == 'verified' ? 'text-green-500':"text-red-600"} font-bold text-lg`}>{item.emailVerify}</div></td>
                                <td className='border-2 border-black px-10  py-4 font-semibold'><div className={`${item.adminVerify == 'verified' ? 'text-green-500':"text-red-600"} font-bold text-lg`}
                                onClick={()=>{

                                    async function apiCall(){
                                       try {
                                        
                                        const response = await axios.get(`http://localhost:8080/admin/adminVerifyRecruiter?recruiterEmail=${item.email}`,{
                                            headers:{
                                                'Content-Type':'Application/json'
                                            },
                                            withCredentials:true
                                        });
                                        console.log(response);
                                        toast.success('Recruiter Verify Successfully');
                                        setRender(!render);
                                       } catch (error) {
                                        toast.error('Internal Server Occured');
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
