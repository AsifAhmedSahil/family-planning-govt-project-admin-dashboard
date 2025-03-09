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



const router = createBrowserRouter([
    {
        path:"/",
        element: <Dashboard/>,
        children:[
            {
                path:"/",
                element:<HomePage/>
            },
            {
                path:"/attendence",
                element:<Attendence/>
            },
            {
                path:"/peopleInformation",
                element:<PeopleInformation/>
            },
            {
                path:"/notice",
                element:<Notice/>
            },
            {
                path:"/setting",
                element:<SettingsPage/>
            },
            {
                path:"/setting/designation",
                element:<Designation/>
            },
            {
                path:"/setting/overview",
                element:<OverView/>
            },
            {
                path:"/setting/subunion",
                element:<SubUnion/>
            },
            {
                path:"/setting/union",
                element:<Union/>
            },
            {
                path:"/setting/unit",
                element:<Unit/>
            },
            {
                path:"/setting/worktype",
                element:<WorkType/>
            },
            {
                path:"/setting/worktypedetails",
                element:<WorkTypeDetails/>
            },
            {
                path:"/person/:emp_id",
                element:<PersonDetails/>
            },
            

        ]
    },
    {
        path:"/login",
        element:<LoginForm/>
    },

])

export default router