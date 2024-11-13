import {  createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./Home"
import AdminLogin from "./AdminLogin"
import CandidateLogin from "./CandidateLogin"
import CandidateRegistration from "./CandidateRegistration"
import RecruiterLogin from "./RecruiterLogin"
import RecruiterRegistration from "./RecruiterRegistration"
import AdminCandidate from "./AdminCandidate"
import AdminRecruiter from "./AdminRecruiter"
import AdminVacancy from "./AdminVacancy"
import AdminHome from "./AdminHome"
import CandidateVacancy from "./CandidateVacancy"
import CandidateMyStatus from "./CandidateMyStatus"
import RecruiterAddVacancy from "./RecruiterAddVacancy"
import RecruiterPostedVacancy from "./RecruiterPostedVacancy"


export default function Body() {
    
    const appRouter = createBrowserRouter([
        {
            path:'/',
            element:<Home/>
        },{
            path:'/adminLogin',
            element:<AdminLogin/>
        },
        {
            path:'/candidateLogin',
            element:<CandidateLogin/>
        },
        {
            path:'/candidateRegistration',
            element:<CandidateRegistration/>
        },
        {
            path:'/recruiterRegistration',
            element:<RecruiterRegistration/>
        },
        {
            path:'/recruiterLogin',
            element:<RecruiterLogin/>
        },{
            path:'/adminHome',
            element:<AdminHome/>
        },
        {
            path:'/adminCandidate',
            element:<AdminCandidate/>
        },
        {
            path:'/adminRecruiter',
            element:<AdminRecruiter/>
        },{
            path:'/adminVacancy',
            element:<AdminVacancy/>
        },{
            path:'/candidateVacancy',
            element:<CandidateVacancy/>
        },{
            path:'/candidateMyStatus',
            element:<CandidateMyStatus/>
        },
        {
            path:'/recruiterAddVacancy',
            element:<RecruiterAddVacancy/>
        },
        {
            path:'/recruiterPostedVacancy',
            element:<RecruiterPostedVacancy/>
        }
    ])


    return (
        <div className="">
            <RouterProvider router={appRouter}/>
        </div>
    )
}
