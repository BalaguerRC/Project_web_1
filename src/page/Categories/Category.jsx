import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Add, Edit, Delete } from "../../components/Category/CrudCategory";

const Category = () => {

    const Name = useRef();
    const getItem = localStorage.getItem("Token");
    const [categories, setCategories] = useState([]);
    const [editar, setEditar] = useState(false);
    const [ID, setID] = useState(0);

    /*const GetCategory = async () => {
        await fetch(import.meta.env.VITE_URL + "/Categories", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + getItem
            }
        })
            .then(resp => resp.json())
            .then(data => setCategories(data))
            .catch(err => console.log(err))
    }*/
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(0);

    const GetProductsWithPag = async () => {
        await fetch(import.meta.env.VITE_URL + "/CategoryPag", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + getItem
            }
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                setPageNumber(data.totalPages);
                setCategories(data.data)
                setPageSize(data.pageSize);
            })
            .catch(err => console.log(err))
    }

    const pageNumbers = [...Array(pageNumber + 1).keys()].slice(1)

    useEffect(() => {
        GetProductsWithPag();
    }, [])

    //ADD
    const AddCategory = async (name) => {
        await Add(name)
        await GetProductsWithPag();
    }

    //edit

    const ShowEdit = async (id, name) => {
        //await setEditar(true);
        setID(id);
        //await Edit(id,name, description, precio, author, idCategory)
        Name.current.value = name
        console.log(id, editar)
    }

    const EditCategory = async (name) => {
        await Edit(ID, name);
        await GetProductsWithPag();
    }

    const DeleteCategory = async (id) => {
        if (id != null) {
            await Delete(id);
            await GetCategory();
        }
    }

    const navigate = useNavigate();

    //pagination

    const currentPage = async (pag) => {
        console.log("Pagina: " + pag + "Tamaño: " + pageSize)
        await fetch(import.meta.env.VITE_URL + "/CategoryPag?pageNumber=" + pag + "&pageSize=" + pageSize, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + getItem
            }
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                setPageNumber(data.totalPages);
                setCategories(data.data)
                setPageSize(data.pageSize);
            })
            .catch(err => console.log(err))
    }

    return <div className="container-Products">
        <div className="text-2xl font-bold">Categoria</div>
        <div className="text-sm breadcrumbs my-5">
            <ul>
                <li><a href="/home">Home</a></li>
                <li>Categoria</li>
            </ul>
        </div>

        <div className="divider"></div>
        {/**Modal */}

        <a href="#add" className="btn btn-ghost bg-accent-focus">Agregar</a>
        <div className="modal" id={editar ? "edit" : "add"}>
            <div className="modal-box">
                <a href="#" className="btn btn-sm btn-circle absolute right-2 top-2" onClick={editar ?
                    () => {
                        setEditar(false);
                        Name.current.value = ""
                    }
                    : () => {
                        //setEditar(true)
                    }}>✕</a>
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
                    {editar ? (<a href="#" className="btn btn-outline btn-warning" onClick={() => EditCategory(Name.current.value)}>Editar</a>)
                        :
                        (<a href="#" className="btn btn-outline btn-success" onClick={() => AddCategory(Name.current.value)}>Guardar</a>)}
                </div>
            </div>
        </div>

        {/**END */}
        <div className="overflow-x-auto">
            <table className="table my-5 table-zebra w-full">
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
                                    <a href="#edit" className="btn btn-outline btn-warning btn-xs" onClick={() => {
                                        setEditar(true)
                                        ShowEdit(data.id, data.name)
                                    }}>Edit</a>
                                    <button type="submit" className="btn btn-outline btn-error btn-xs" onClick={() => DeleteCategory(data.id)}>Delete</button>
                                </th>
                            </tr>
                        }) : (<div>Token Expired</div>)
                    }
                </tbody>
            </table>
        </div>
        <div className="divider"></div>
        <div className="text-center">
            <div className="btn-group">
                {pageNumbers && pageNumbers.map(element=>{
                    return <a href={"#page"+element} className="btn btn-md  bg-blue-700" key={element} onClick={()=>currentPage(element)}>{element}</a>
                })}
            </div>
        </div>

    </div>

}

export default Category;