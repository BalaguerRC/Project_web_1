import { useEffect, useRef, useState } from "react";
import { Navigate, redirect, useNavigate, Outlet } from "react-router-dom";

export default function Login() {
    const Email = useRef();
    const Password = useRef();
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const response = async (email, password) => {
        try {
            await fetch(import.meta.env.VITE_URL +'/Users/login', {
                method: 'Post',
                headers: {
                    'Content-Type': 'application/json'
                    /*,
                    "Authorization": ``*/
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }).then(res => res.json()).then(data => {
                //console.log(data.succes)

                if (data.succes === false) {
                    setError("Invalid email or password");
                }
                else {
                    localStorage.setItem("Token", data.token);
                    localStorage.setItem("DATA", JSON.stringify(data.data));
                    setError(null);
                    const getToken = localStorage.getItem("Token");
                    if (getToken != null) {
                        navigate("/");
                    }
                    //navigate("perfil");
                }
            }).catch(err => {
                console.log(err);
                setError("Error fetch");
            })
        } catch (error) {
            setError('Inalid email or password')
            console.log(error);
        }
    }

    const isSubmit = (e) => {
        e.preventDefault();
    }


    return <div className="hero min-h-screen bg-base-200">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
                <div className="form-control">
                    <h2 className="stat-value text-center">Login</h2>
                    <label className="label">
                        <a href="/" className="label-text-alt link link-hover">{"<-Home"}</a>
                    </label>
                    <form onSubmit={(e) => isSubmit(e)}>
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email" className="input input-bordered w-full" ref={Email} autoComplete="username" />
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="password" className="input input-bordered w-full" ref={Password} autoComplete="current-password" />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                        <div>
                            {error != null ? (<a style={{ "color": "tomato" }}>{error}</a>) : null}
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary" onClick={() => response(Email.current.value, Password.current.value)}>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
}

//export default Login;