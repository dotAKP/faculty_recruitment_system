import React from 'react'
import AdminNavigationBar from './AdminNavigationBar'

export default function AdminHome() {
  return (
    <div className='h-full'>
        <AdminNavigationBar/>
        <div className='w-[100%]'>
             <img src="https://www.directrecruitment-uk.co.uk/wp-content/uploads/2017/09/admin-banner.jpg" className='w-[100%] object-contain' alt="" />
        </div>
    </div>
  )
}
