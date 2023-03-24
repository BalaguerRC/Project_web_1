import { useNavigate } from "react-router-dom";

const NotFount = () => {
    const navigate = useNavigate();
    return <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
            <div className="max-w-md">
                <h1 className="text-5xl font-bold">404 - Not Fount</h1>
                <div className="p-10">
                    <button className="btn btn-primary" onClick={() => navigate("/")}>Home</button>
                </div>
            </div>
        </div>
    </div>
}

export default NotFount;