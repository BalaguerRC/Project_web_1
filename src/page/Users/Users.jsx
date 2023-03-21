import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Add, Delete } from "../../components/Users/CrudUsers";

const Users = () => {
    const Name = useRef();
    const Email = useRef();
    const Password = useRef();
    const Date = useRef();

    const getItem = localStorage.getItem("Token");
    const [user, setUsers] = useState([]);
    const GetUsers = async () => {

        await fetch(import.meta.env.VITE_URL + "/Users", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + getItem
            }
        })
            .then(resp => resp.json())
            .then(data => setUsers(data))
            .catch(err => console.log(err))
    }

    //console.log("Lista: ", user);

    const AddUser = async (name, email, password, date) => {
        await Add(name, email, password, date)
        await GetUsers();
    }

    useEffect(() => {
        GetUsers();
    }, [])

    //const navigate = useNavigate();

    const DeleteUser = async (id) => {
        if (id != null) {
            await Delete(id);
            await GetUsers();
        }
    }

    return <div className="container-Products">
        <h1 className="text-2xl font-bold">Usuarios</h1>

        <div className="text-sm breadcrumbs my-5">
            <ul>
                <li><a href="/home">Home</a></li>
                <li>Usuarios</li>
            </ul>
        </div>

        <div className="divider"></div>

        <a className="btn btn-ghost bg-accent-focus" href="#add">Agregar</a>
        <div className="modal" id="add">
            <div className="modal-box">
                <a href="#" className="btn btn-sm btn-circle absolute right-2 top-2" >✕</a>
                <h3 className="text-lg font-bold">Agregar Usuario</h3>
                <form className="form-control" onSubmit={(e)=>e.preventDefault()}>
                    <label className="label">
                        <span className="label-text">Nombre</span>
                    </label>
                    <input type="text" placeholder="nombre..." className="input input-bordered w-full max-w-xs w-11/12 max-w-5xl width-product" ref={Name} required/>
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="descripcion..." className="input input-bordered w-full max-w-xs w-11/12 max-w-5xl width-product" ref={Email} required/>
                    <label className="label">
                        <span className="label-text">Contraseña</span>
                    </label>
                    <input type="new-password" placeholder="contraseña..." className="input input-bordered w-full max-w-xs w-11/12 max-w-5xl width-product" ref={Password} required/>
                    <label className="label">
                        <span className="label-text">Fecha de Nacimiento</span>
                    </label>
                    <input type="date" className="input input-bordered w-full max-w-xs w-11/12 max-w-5xl width-product" ref={Date} required/>
                    <div className="modal-action">
                        <a href="#" className="btn btn-outline btn-success" onClick={() => AddUser(Name.current.value, Email.current.value, Password.current.value, Date.current.value)}>Guardar</a>
                    </div>
                </form>

            </div>
        </div>

        <div className="overflow-x-auto">
            <table className="table table-compact my-5 table-zebra w-full">
                <thead>
                    <tr className="active">
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        user != 0 ? user.map((data) => {
                            //var cadena= data.date;
                            return <tr key={data.id}>
                                <th>{data.id}</th>
                                <td>{data.name}</td>
                                <td>{data.email}</td>
                                <td>{data.password}</td>
                                <td>{data.date.substr(0, 10)}</td>
                                <th>
                                    <button className="btn btn-outline btn-error btn-xs" onClick={() => DeleteUser(data.id)}>Delete</button>
                                </th>
                            </tr>
                        })
                            :
                            (<div>Token Expired</div>)
                    }
                </tbody>
            </table>
        </div>
        <div className="divider"></div>
        <div className="text-center">
            <div className="btn-group">
                <button className="btn btn-md btn-active">1</button>
                <button className="btn btn-md">2</button>
                <button className="btn btn-md">3</button>
                <button className="btn btn-md">4</button>
            </div>
        </div>
    </div>
}

export default Users;