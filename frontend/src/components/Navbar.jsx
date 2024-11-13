import React from 'react'
import { GiBookAura } from "react-icons/gi";
export default function Navbar() {
  return (
    <div className='bg-neutral-900 h-24 flex'>
            <div className='text-white flex justify-center  w-[8%] text-6xl font-bold py-4'>
            <GiBookAura />
            </div>
            <div className='text-white font-bold text-4xl py-8 flex'>
               <div>शिक्षक  Recruitment System </div>
            </div>
    </div>
  )
}
