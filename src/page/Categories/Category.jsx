import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Add, Edit, Delete } from "../../components/Category/CrudCategory";

const Category = () => {

    const Name = useRef();
    const getItem = localStorage.getItem("Token");
    const [categories, setCategories] = useState([]);
    const [editar, setEditar] = useState(false);
    const [ID, setID] = useState(0);

    const GetCategory = async () => {
        await fetch(import.meta.env.VITE_URL + "/Categories", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + getItem
            }
        })
            .then(resp => resp.json())
            .then(data => setCategories(data))
            .catch(err => console.log(err))
    }
    console.log("Lista: ", categories);

    useEffect(() => {
        GetCategory();
    }, [])

    //ADD
    const AddCategory = async (name) => {
        await Add(name)
        await GetCategory();
    }

    //edit

    const ShowEdit = async (id, name) => {
        await setEditar(true);
        setID(id);
        //await Edit(id,name, description, precio, author, idCategory)
        Name.current.value = name
        console.log(id, editar)
    }

    const EditCategory = async (name) => {
        await Edit(ID, name);
        await GetCategory();
    }

    const DeleteCategory = async (id) => {
        if (id != null) {
            await Delete(id);
            await GetCategory();
        }
    }

    const navigate = useNavigate();

    return <div className="container-Products">
        <h2>Category</h2>
        <button onClick={() => navigate("add")}>+</button>
        <Outlet />

        {/**Modal */}

        <a href={editar ? "#edit" : "#add"} className="btn">Agregar</a>
        <div className="modal" id={editar ? "edit" : "add"}>
            <div className="modal-box">
                <a href="#" className="btn btn-sm btn-circle absolute right-2 top-2" onClick={editar ?
                    () => {
                        setEditar(false);
                        Name.current.value = ""
                    }
                    : () => { setEditar(true) }}>✕</a>
                <h3 className="text-lg font-bold">{editar ? "Editar Producto" : "Agregar Producto"}</h3>
                <div className="form-control">
                    {editar ? (<label className="label">
                        <span className="label-text">ID: {ID}</span>
                    </label>) : null}
                    <label className="label">
                        <span className="label-text">Nombre</span>
                    </label>
                    <input type="text" placeholder="nombre..." className="input input-bordered w-full max-w-xs w-11/12 max-w-5xl width-product" ref={Name} />
                </div>
                <div className="modal-action">
                    {editar ? (<a href="#" className="btn" onClick={() => EditCategory(Name.current.value)}>Editar</a>)
                        :
                        (<a href="#" className="btn" onClick={() => AddCategory(Name.current.value)}>Guardar</a>)}
                </div>
            </div>
        </div>

        {/**END */}
        <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categories != 0 ? categories.map((data) => {

                            return <tr key={data.id}>
                                <th>{data.id}</th>
                                <td>{data.name}</td>
                                <th>
                                    {/*<Link to={"/category/"+data.id} className="btn btn-outline btn-warning btn-xs">
                                        Edit
                        </Link>*/}
                                    <a href="#edit" className="btn btn-outline btn-warning btn-xs" onClick={() => ShowEdit(data.id, data.name)}>Edit</a>
                                    <button type="submit" className="btn btn-outline btn-error btn-xs" onClick={() => DeleteCategory(data.id)}>Delete</button>
                                </th>
                            </tr>
                        }) : (<div>Token Expired</div>)
                    }
                </tbody>
            </table>
        </div>

    </div>

}

export default Category;