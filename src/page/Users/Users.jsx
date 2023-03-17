import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Users = () => {
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

    console.log("Lista: ", user);

    useEffect(() => {
        GetUsers();
    }, [])

    const navigate= useNavigate();

    return <div className="container-Products">
        <h2>Users</h2>
        <button onClick={()=>navigate("add")}>+</button>
        <div className="overflow-x-auto">
            <table className="table table-compact table-zebra w-full">
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
                                <td>{data.date.substr(0,10)}</td>
                                <th>
                                    <button className="btn btn-outline btn-warning btn-xs">Edit</button>
                                    <button className="btn btn-outline btn-error btn-xs">Delete</button>
                                </th>
                            </tr>
                        })
                            :
                            (<div>Token Expired</div>)
                    }
                </tbody>
            </table>
        </div>
    </div>
}

export default Users;