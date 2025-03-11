import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Layout/Dashboard";
import HomePage from "../pages/HomePage";
import Attendence from "../pages/Attendence";
import PeopleInformation from "../pages/PeopleInformation";

import SettingsPage from "../pages/SettingsPage";
import Designation from "../Components/Settings/Designation";
import OverView from "../Components/Settings/OverView";
import SubUnion from "../Components/Settings/SubUnion";
import Union from "../Components/Settings/Union";
import Unit from "../Components/Settings/Unit";
import LoginForm from "../Components/LoginForm";
import PersonDetails from "../pages/PersonDetails";
import Notice from "../pages/Notice";
import WorkType from "../Components/Settings/WorkType";
import WorkTypeDetails from "../Components/Settings/WorkTypeDetails";
import ProtectedRoute from "../Components/ProtectedRoute";



const router = createBrowserRouter([
    {
        path:"/",
        element: <Dashboard/>,
        children:[
            {
                path:"/",
                element:<ProtectedRoute><HomePage/></ProtectedRoute>
            },
            {
                path:"/attendence",
                element:<ProtectedRoute><Attendence/></ProtectedRoute>
            },
            {
                path:"/peopleInformation",
                element:<ProtectedRoute><PeopleInformation/></ProtectedRoute>
            },
            {
                path:"/notice",
                element:<ProtectedRoute><Notice/></ProtectedRoute>
            },
            {
                path:"/setting",
                element:<ProtectedRoute><SettingsPage/></ProtectedRoute>
            },
            {
                path:"/setting/designation",
                element:<ProtectedRoute><Designation/></ProtectedRoute>
            },
            {
                path:"/setting/overview",
                element:<ProtectedRoute><OverView/></ProtectedRoute>
            },
            {
                path:"/setting/subunion",
                element:<ProtectedRoute><SubUnion/></ProtectedRoute>
            },
            {
                path:"/setting/union",
                element:<ProtectedRoute><Union/></ProtectedRoute>
            },
            {
                path:"/setting/unit",
                element:<ProtectedRoute><Unit/></ProtectedRoute>
            },
            {
                path:"/setting/worktype",
                element:<ProtectedRoute><WorkType/></ProtectedRoute>
            },
            {
                path:"/setting/worktypedetails",
                element:<ProtectedRoute><WorkTypeDetails/></ProtectedRoute>
            },
            {
                path:"/person/:emp_id",
                element:<ProtectedRoute><PersonDetails/></ProtectedRoute>
            },
            

        ]
    },
    {
        path:"/login",
        element:<LoginForm/>
    },

])

export default router