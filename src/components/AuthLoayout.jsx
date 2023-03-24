import { Navigate, Outlet } from "react-router-dom";

export function AuthLayout(){
    const token = localStorage.getItem("Token");

    if(!token) return <Navigate to={"/login"} replace={true} />

    return <Outlet/>
}

export function Loged(){
    const token = localStorage.getItem("Token");

    if(token) return <Navigate to={"/"} replace={true}/>
    return <Outlet/>
}