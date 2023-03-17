import { useRef } from "react";
import "./style/index.css";
import { Add } from "./CrudUsers";

const AddUser = () => {
    const Name = useRef();
    const Email = useRef();
    const Password = useRef();
    const Date = useRef();
    const getItem = localStorage.getItem("Token");

    const AddUser = async (name,email,password,date) => {
        await Add(name,email,password,date)
    }
    return <div>
        <h2>Add User</h2>
        <form className="Product-Form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-input">
                <input type="text" placeholder="Name" ref={Name} />
            </div>
            <div className="form-input">
                <input type="email" placeholder="Email" ref={Email} />
            </div>
            <div className="form-input">
                <input type="password" placeholder="Password" ref={Password} />
            </div>
            <div className="form-input">
                <input type="text" placeholder="Fecha de Nacimiento" ref={Date} />
            </div>
            <button className="btn" onClick={() => AddUser(Name.current.value,Email.current.value,Password.current.value,Date.current.value)}>Save</button>
        </form>
    </div>
}

export default AddUser;