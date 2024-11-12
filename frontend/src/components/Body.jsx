import {  createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./Home"
import AdminLogin from "./AdminLogin"
import CandidateLogin from "./CandidateLogin"
import CandidateRegistration from "./CandidateRegistration"





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
        }
    ])


    return (
        <div>
            <RouterProvider router={appRouter}/>
        </div>
    )
}
