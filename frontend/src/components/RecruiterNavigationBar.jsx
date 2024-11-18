import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar';

export default function RecruiterNavigationBar() {


    const navigate = useNavigate();
    return (
        <div>
    
            <div className='bg-black flex'>
            
           
            <div className='text-white font-bold text-2xl px-4 py-4 ml-10 hover:bg-neutral-800 rounded-2xl' onClick={() => navigate('/recruiterAddVacancy')}>
                Add Vacancy
            </div>
            <div className='text-white font-bold text-2xl px-4 py-4 ml-10 hover:bg-neutral-800 rounded-2xl' onClick={() => navigate('/recruiterPostedVacancy')}>
                Posted Vacancy
            </div>
            <div className='text-white font-bold text-2xl px-4 py-4 ml-10 hover:bg-neutral-800 rounded-2xl' onClick={() => navigate('/recruiterAppliedCandidate')}>
                Applied Candidate List
            </div>
        </div>
        </div>
        
    )
}
