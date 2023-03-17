import { useNavigate } from "react-router-dom";

const Perfil =()=>{
    const getItem = localStorage.getItem("Token");
    const getData = JSON.parse(localStorage.getItem("DATA"));
    const navigate= useNavigate();

    if (getData) {
        //console.log(getItem);
        console.log("data: ",getItem);
        console.log("name: ",getData);
    }
    const LogOut=()=>{
        localStorage.removeItem("Token");
        localStorage.removeItem("DATA");
        navigate("/login");
    }
    return <>
        Perfil
        <h5 className="text-gray-500 text-lg">
            My data:
        </h5>
        <div>
            {getData.id}
            <br/>
            {getData.name}
            <br/>
            {getData.email}
            <br/>
            {getData.date}
            <br/>
        </div>
        <button  onClick={()=>LogOut()}>Log Out</button>
    </>
}

export default Perfil;