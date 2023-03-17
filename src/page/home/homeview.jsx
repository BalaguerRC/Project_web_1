import { useEffect } from "react";
import { Get } from "../../components/Products/CrudProducts";

const HomeView = () => {

    const GetProduct = async() => {
        await Get()
    }

    useEffect(() => {
        const contar=GetProduct();
        console.log("esto es:" +JSON.stringify(contar))
    }, [])
    return <section>
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Hello there</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <button className="btn btn-primary">Get Started</button>

                </div>
                <div className="stats shadow">

                    <div className="stat">
                        <div className="stat-title">Total de Productos</div>
                        <div className="stat-value text-primary">25.6K</div>
                    </div>

                    <div className="stat">
                        <div className="stat-title">Total de Categorias</div>
                        <div className="stat-value text-secondary">2.6M</div>
                    </div>

                    <div className="stat">
                        <div className="stat-title">Total de Categorias</div>
                        <div className="stat-value text-accent">2.6M</div>
                    </div>

                </div>
            </div>
        </div>
    </section>
}

export default HomeView;