import { useNavigate } from "react-router-dom";
import download from "../../assets/Download2.png"

const Perfil = () => {
    const getItem = localStorage.getItem("Token");
    const getData = JSON.parse(localStorage.getItem("DATA"));
    const navigate = useNavigate();

    if (getData) {
        //console.log(getItem);
        console.log("data: ", getItem);
        console.log("name: ", getData);
    }
    const LogOut = () => {
        localStorage.removeItem("Token");
        localStorage.removeItem("DATA");
        navigate("/login");
    }
    return <div className="hero min-h-screen">
        <div className="hero-content">
            <div className="card card-side bg-base-100 shadow-xl ">
                <figure><img src={download} alt="Movie" className="w-60" /></figure>
                <div className="card-body">
                    <h2 className="card-title">Perfil</h2>
                    <div>
                        <h5 className="text-gray-500 text-lg">ID:</h5>
                        {getData.id}
                        <br />
                        <h5 className="text-gray-500 text-lg">Nombre:</h5>
                        {getData.name}
                        <br />
                        <h5 className="text-gray-500 text-lg">Email: </h5>
                        {getData.email}
                        <br />
                        <h5 className="text-gray-500 text-lg">Fecha de Nacimiento:</h5>
                        {getData.date}
                        <br />
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default Perfil;