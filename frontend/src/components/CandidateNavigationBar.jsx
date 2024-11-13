import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function CandidateNavigationBar() {


    const navigate = useNavigate();
    return (
        <div className='bg-black flex'>
            <div className='text-white font-bold text-2xl px-4 py-4 ml-16 hover:bg-neutral-800 rounded-2xl' onClick={ ()=> {
                console.log('home')
                navigate('/adminHome')
                }}>
                Home
            </div>
           
            <div className='text-white font-bold text-2xl px-4 py-4 ml-10 hover:bg-neutral-800 rounded-2xl' onClick={() => navigate('/candidateVacancy')}>
                Vacancy
            </div>
            <div className='text-white font-bold text-2xl px-4 py-4 ml-10 hover:bg-neutral-800 rounded-2xl' onClick={() => navigate('/candidateMyStatus')}>
                My Status
            </div>
        </div>
    )
}
