import { Navigate, Outlet } from "react-router-dom";
import { Navbar } from "../../components";
import { useAppSelector } from "../../hooks/redux.hook";
import { AuthState } from "../../slice/auth.slice";

const MainDashboard = () => {
    const { token,payload } = useAppSelector(state=>state.auth) as AuthState;

    if(!token || payload?.role === "USER") {
        return <Navigate to="/login"/>
    }

    return (
        <div className="w-full min-h-screen bg-gray-100">
           <Navbar/>
           <div className="w-[80%] sm:w-full sm:px-5 mx-auto py-5">
             <Outlet/>
           </div>
        </div>
    )
}

export default MainDashboard;