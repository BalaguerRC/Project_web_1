//import { Toast } from "bootstrap";
import { Toast } from "bootstrap";
import { useEffect, useState } from "react";

const HomeView = () => {

    const [amount, setAmount] = useState([]);
    //const [error, setError] = useState(false);

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
            //setError(null)
        }).catch(err => {
            console.log(err)
            //setError(!error)
        })
    }

    let toas = <div className="toast">
        <div className="alert alert-info">
            <div>
                <span>Token Expirado</span>
            </div>
        </div>
    </div>

    useEffect(() => {
        GetDashboard()
    }, [])

    return <section>
        <div className="hero min-h-screen bg-base-200 ">
            <div className="hero-content flex-col lg:flex-row text-center">
                <div className="max-w-md lg:text-center ">
                    <h1 className="text-5xl font-bold">Hello there</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <a className="btn btn-primary" href="/product">Productos</a>
                </div>
                <div className="stats shadow  shadow-2xl lg:stats-horizontal stats-vertical">

                    <div className="stat">
                        <div className="stat-title">Total de Productos</div>
                        <div className="stat-value text-primary">{amount.total_product}</div>
                    </div>

                    <div className="stat">
                        <div className="stat-title">Total de Categorias</div>
                        <div className="stat-value text-secondary">{amount.total_category}</div>
                    </div>

                    <div className="stat">
                        <div className="stat-title">Total de Usuarios</div>
                        <div className="stat-value text-accent">{amount.total_user}</div>
                    </div>


                </div>

            </div>
        </div>
    </section>
}

export default HomeView;