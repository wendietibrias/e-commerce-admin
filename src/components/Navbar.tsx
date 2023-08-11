import { Link,useLocation } from "react-router-dom";
import { useAppSelector,useAppDispatch } from "../hooks/redux.hook";
import { AuthState } from "../slice/auth.slice";
import { useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import { removeCredentials } from "../slice/auth.slice";
import navbarLink from "../constants/navbarLink";

const Navbar = () => {
    const dispatch = useAppDispatch();

    const { payload } = useAppSelector(state=>state.auth) as AuthState;
    const { pathname } = useLocation();

    const [openDropdown,setOpenDropdown] = useState<boolean>(false);

    return (
        <nav className="w-full py-4 bg-white shadow-lg shadow-gray-100">
           <div className="w-[80%] mx-auto flex items-center justify-between">
            <div className="flex items-center gap-x-8">
               <Link to="/">
                  <span className="font-extrabold text-gray-700 text-xl uppercase">wmart</span>
               </Link>
               <ul className="flex items-center gap-x-5">
                  {navbarLink.map((item,idx : number) => (
                     <Link key={idx} to={item.path}>
                        <span className={`text-[13px] transition-colors duration-300 hover:text-blue-500 ${pathname == item.path ? "text-blue-500 font-semibold" : "text-gray-600 font-medium "}`}>{item.title}</span>
                     </Link>
                  ))}
               </ul>
            </div>
            <div className="flex items-center relative">
               <button onClick={()=>setOpenDropdown(!openDropdown)} className="flex items-center gap-x-3 text-gray-600">
                  <span className="flex items-center justify-center w-[36px] h-[36px] rounded-full font-bold bg-blue-500 text-white uppercase text-sm">{payload?.name?.charAt(0)}</span>
                  <div className="text-left flex flex-col">
                     <span className="text-sm font-bold">{payload?.name}</span>
                     <span className="text-[11px] font-medium text-gray-400">{payload?.role}</span>
                  </div>
               </button>

               {openDropdown && (
                  <div className="absolute z-[999] right-0 top-[53px] flex flex-col gap-y-2 shadow-lg shadow-gray-200 bg-white w-[250px] rounded-md p-4">
                    <Link to="/profile">
                      <button className="text-gray-600 text-[12px] font-semibold flex items-center gap-x-3">
                         <BiUserCircle className="text-xl" />
                         Profile
                      </button>
                    </Link>
                      <button onClick={() => dispatch(removeCredentials())} className="text-gray-600 text-[12px] font-semibold flex items-center gap-x-3">
                         <AiOutlineLogout className="text-xl" />
                         Logout
                      </button>
                  </div>
               )}
            </div>
           </div>
        </nav>
    )
}

export default Navbar;