import { useEffect, useState } from "react";
import { Get } from "../../components/Products/CrudProducts";
import Dashboard from "../../components/totalDashboard";

const HomeView = () => {

    const [amount, setAmount]= useState([]);
    

    const getItem = localStorage.getItem("Token");

    const GetDashboard= ()=>{
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

    return <section>
        <div className="hero min-h-screen bg-base-200 ">
            <div className="hero-content flex-col lg:flex-row text-center">
                <div className="max-w-md lg:text-center ">
                    <h1 className="text-5xl font-bold">Hello there</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <button className="btn btn-primary">Get Started</button>
                </div>
                <div className="stats shadow  shadow-2xl lg:stats-horizontal stats-vertical">
                    
                    <div className="stat">
                        <div className="stat-title">Total de Productos</div>
                        <div className="stat-value text-primary">{amount.total_product}</div>
                    </div>

                    <div className="stat">
                        <div className="stat-title">Total de Categorias</div>
                        <div className="stat-value text-secondary">{amount.total_category }</div>
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
{
    /**
     * <div className="stats shadow flex-shrink-0 shadow-2xl overflow-x-auto">
                    
                    <div className="stat">
                        <div className="stat-title">Total de Productos</div>
                        <div className="stat-value text-primary">{amount.total_product}</div>
                    </div>

                    <div className="stat">
                        <div className="stat-title">Total de Categorias</div>
                        <div className="stat-value text-secondary">{amount.total_category }</div>
                    </div>

                    <div className="stat">
                        <div className="stat-title">Total de Usuarios</div>
                        <div className="stat-value text-accent">{amount.total_user}</div>
                    </div>

                </div>
     */
}

export default HomeView;