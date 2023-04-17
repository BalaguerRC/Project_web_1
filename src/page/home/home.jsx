import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import './style/index.css'

export default function Home() {
    const navigate = useNavigate();

    const LogOut = () => {
        localStorage.removeItem("Token");
        localStorage.removeItem("DATA");
        navigate("/login");
    }

    const GetUserData = JSON.parse(localStorage.getItem("DATA"))

    const [amount, setAmount] = useState([]);

    const getItem = localStorage.getItem("Token");

    const GetDashboard = () => {
        fetch(import.meta.env.VITE_URL + "/Dashboard", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + getItem
            }
        }).then(res => res.json()).then(data => {
            console.log("data")
            setAmount(data.data[0])
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        GetDashboard()
    }, [])

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
                                <li><a href="/bill">Facturas</a></li>
                                <li className="disabled" ><a href="#">About</a></li>
                            </ul>
                        </div>
                        <a className="btn btn-ghost normal-case text-xl" href="/">Home</a>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            <li><a href="/product">Productos</a></li>
                            <li><a href="/category">Categoria</a></li>
                            <li><a href="/users">Usuarios</a></li>
                            <li><a href="/bill">Facturas</a></li>
                            <li className="disabled"><a>About</a></li>
                        </ul>
                    </div>
                    <div className="navbar-end">
                        {GetUserData ? (
                            <div className="dropdown  dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost m-1">
                                    {GetUserData.name}
                                    <svg width="12px" height="12px" className="ml-1 hidden h-3 w-3 fill-current opacity-60 sm:inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
                                        <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z">
                                        </path>
                                    </svg>
                                </label>
                                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-200 w-52 rounded-box">
                                    <div className="flex items-center space-x-2">
                                        <figure><img src="src/assets/download2.png" alt="Movie" className="w-16" /></figure>
                                        <div>
                                            <div className="text-lg font-extrabold">{GetUserData.name}</div>
                                            <div className="text-base-content/70 text-sm">{GetUserData.email}</div>
                                        </div>
                                    </div>
                                    <li className="menu-title">
                                        <span>User</span>
                                    </li>
                                    <li className="hover-bordered"><a href="perfil">Perfil</a></li>
                                    <li className="disabled"><a>Opciones</a></li>
                                    <div className="divider"></div>
                                    <li className="hover-bordered "><a onClick={() => LogOut()}>LogOut</a></li>

                                </ul>
                                <div className="">

                                </div>
                            </div>
                        ) :
                            (
                                <a className="btn" onClick={() => navigate("/login")}>LogIn</a>
                            )
                        }
                        {/** <a className="btn" onClick={() => LogOut()}>LogOut</a>*/}
                    </div>
                </nav>
            </div>
        </header>
        <section className="min-h-screen">
            <Outlet />
        </section>

        <footer className="footer footer-center p-4 bg-base-300 text-base-content">
            <div>
                <p>Copyright © 2023 - All right reserved by NOTHING</p>
            </div>
        </footer>
    </div>
}