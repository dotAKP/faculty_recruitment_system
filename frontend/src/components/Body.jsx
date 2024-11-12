import {  createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./Home"
import AdminLogin from "./AdminLogin"
import CandidateLogin from "./CandidateLogin"
import CandidateRegistration from "./CandidateRegistration"
import RecruiterLogin from "./RecruiterLogin"
import RecruiterRegistration from "./RecruiterRegistration"
import AdminCandidate from "./AdminCandidate"



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
        },
        {
            path:'/adminCandidate',
            element:<AdminCandidate/>
        }
    ])


    return (
        <div>
            <RouterProvider router={appRouter}/>
        </div>
    )
}
