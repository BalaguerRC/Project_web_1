import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import './style/index.css'

export default function Home() {
    const navigate = useNavigate();

    const LogOut = () => {
        localStorage.removeItem("Token");
        localStorage.removeItem("DATA");
        navigate("/login");
    }
    return <div className="drawer-content">
        <header>
            <div className="">
                <nav className="navbar bg-base-100 w-full">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </label>
                            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                <li><a href="/product">Products</a></li>
                                <li><a href="/category">Category</a></li>
                                <li><a href="/users">Users</a></li>
                                <li><a href="/section">Section</a></li>
                            </ul>
                        </div>
                        <a className="btn btn-ghost normal-case text-xl" href="/home">Home</a>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            <li><a href="/product">Products</a></li>
                            <li><a href="/category">Category</a></li>
                            <li><a href="/users">Users</a></li>
                            <li><a href="/section">Section</a></li>
                        </ul>
                    </div>
                    <div className="navbar-end">
                        <a className="btn" onClick={() => LogOut()}>LogOut</a>
                    </div>
                </nav>
            </div>
        </header>
        <section className="min-h-screen">
            <Outlet />
        </section>
        <footer className="footer footer-center p-4 bg-base-300 text-base-content">
            <div>
                <p>Copyright © 2023 - All right reserved by ACME Industries Ltd</p>
            </div>
        </footer>
    </div>
}