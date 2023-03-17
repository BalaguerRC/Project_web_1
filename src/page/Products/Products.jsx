import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EditProduct from "../../components/Products/EditProduct";
import { Add, Edit, Delete } from "../../components/Products/CrudProducts";
import "./style/index.css"

const Products = () => {

    const Name = useRef();
    const Description = useRef();
    const Price = useRef();
    const Author = useRef();
    const Category = useRef();
    const Category2 = useRef();
    const Quantity = useRef();
    const getItem = localStorage.getItem("Token");
    const [products, setProducts] = useState([]);
    const [editar, setEditar] = useState(false);
    const [ID, setID] = useState(0);

    const GetProducts = async () => {
        await fetch(import.meta.env.VITE_URL + "/Products", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + getItem
            }
        })
            .then(resp => resp.json())
            .then(data => setProducts(data))
            .catch(err => console.log(err))
    }
    console.log("Lista: ", products);
    useEffect(() => {
        //console.log("Products: "+products);
        GetProducts();
    }, [])

    const navigate = useNavigate();

    const DeleteProduct = async (id) => {
        await Delete(id);
    }

    //categories
    const [categories, setCategories] = useState([]);

    const GetCategory = async () => {
        await fetch(import.meta.env.VITE_URL + "/Categories", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + getItem
            }
        })
            .then(resp => resp.json())
            .then(data => setCategories(data))
            .catch(err => setError(err))
    }

    useEffect(() => {
        GetCategory();
    }, [])

    //ADD
    const AddProduct = async (name, description, precio, author, idCategory, quantity) => {
        await Add(name, description, precio, author, idCategory, quantity)
        await GetProducts();
    }

    //edit

    const ShowEdit = async (id, name, description, precio, author, quantity) => {
        await setEditar(true)
        setID(id)
        //await Edit(id,name, description, precio, author, idCategory)
        Name.current.value = name
        Description.current.value = description
        Price.current.value = precio
        Author.current.value = author
        Quantity.current.value = quantity

        console.log(id, editar)
    }

    const EditProduct = async (name, description, precio, author, idCategory, quantity) => {
        await Edit(ID, name, description, precio, author, idCategory, quantity)
        await GetProducts();
    }

    //filter

    const Filter = async (idcategory) => {
        //console.log("IDCategory: " + idcategory)
        if (idcategory == "") {
            await GetProducts();
        }
        else (
            await fetch(import.meta.env.VITE_URL + "/ProductsById/" + idcategory, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + getItem
                }
            }).then(res => res.json()).then(data => {
                //console.log("data: "+data.data)
                if (JSON.stringify(data.data) == undefined) {
                    console.log("Not Found")
                    GetProducts();
                }
                else {
                    console.log("data: " + JSON.stringify(data.data))
                    setProducts(data.data)
                }
            }).catch(err => console.log("Error: " + err))

        )

    }


    return <div className="container-Products ">
        <h1 className="stat-value">Products</h1>
        <div style={{ "display": "flex" }}>
            <div style={{}}>
                <button onClick={() => navigate("add")}>+</button>
                {/**Modal */}

                <a className="btn">Agregar</a>
            </div>
            <div style={{ "position": "right" }}>
                <div className="form-control">
                    <div className="input-group">
                        <select required className="select select-bordered max-w-xs " ref={Category2}>
                            <option selected value="">Category...</option>

                            {categories && categories.map((data) => {
                                return <option key={data.id} value={data.id}>
                                    {data.name}
                                </option>
                            })}
                        </select>
                        <a className="btn btn-primary" onClick={() => Filter(Category2.current.value)}>Filtrar</a>
                    </div>
                </div>
            </div>
        </div>

        <div className="modal" id={editar ? "edit" : "add"}>
            <div className="modal-box">
                <a href="#" className="btn btn-sm btn-circle absolute right-2 top-2" onClick={editar ?
                    () => {
                        setEditar(false);
                        Name.current.value = ""
                        Description.current.value = ""
                        Price.current.value = ""
                        Author.current.value = ""
                        Quantity.current.value = ""
                    }
                    : () => setEditar(true)}>✕</a>
                <h3 className="text-lg font-bold">{editar ? "Editar Producto" : "Agregar Producto"}</h3>
                <div className="form-control">
                    {editar ? (<label className="label">
                        <span className="label-text">ID: {ID}</span>
                    </label>) : null}
                    <label className="label">
                        <span className="label-text">Nombre</span>
                    </label>
                    <input type="text" placeholder="nombre..." className="input input-bordered w-full max-w-xs w-11/12 max-w-5xl width-product" ref={Name} />
                    <label className="label">
                        <span className="label-text">Descripcion</span>
                    </label>
                    <input type="text" placeholder="descripcion..." className="input input-bordered w-full max-w-xs w-11/12 max-w-5xl width-product" ref={Description} />
                    <label className="label">
                        <span className="label-text">Precio</span>
                    </label>
                    <input type="number" placeholder="precio..." className="input input-bordered w-full max-w-xs w-11/12 max-w-5xl width-product" ref={Price} />
                    <label className="label">
                        <span className="label-text">Autor</span>
                    </label>
                    <input type="text" placeholder="autor..." className="input input-bordered w-full max-w-xs w-11/12 max-w-5xl width-product" ref={Author} />
                    <label className="label">
                        <span className="label-text">Categoria</span>
                    </label>
                    <select required className="select select-bordered max-w-xs w-11/12 max-w-5xl width-product" ref={Category}>
                        <option selected disabled value="">Category...</option>

                        {categories && categories.map((data) => {
                            return <option key={data.id} value={data.id}>
                                {data.name}
                            </option>
                        })}
                    </select>
                    <label className="label">
                        <span className="label-text">Cantidad</span>
                    </label>
                    <input type="number" placeholder="cantidad..." className="input input-bordered w-full max-w-xs w-11/12 max-w-5xl width-product" max={10} ref={Quantity} />
                    <label className="label">
                        <span className="label-text">Imagen</span>
                    </label>
                    <input type="file" className="file-input w-full max-w-xs" />
                </div>
                <div className="modal-action">
                    {editar ? (<a href="#" className="btn" onClick={() => EditProduct(Name.current.value, Description.current.value, Price.current.value, Author.current.value, Category.current.value, Quantity.current.value)}>Editar</a>)
                        :
                        (<a href="#" className="btn" onClick={() => AddProduct(Name.current.value, Description.current.value, Price.current.value, Author.current.value, Category.current.value, Quantity.current.value)}>Guardar</a>)}
                </div>
            </div>
        </div>

        {/**END */}
        <div className="overflow-x-auto">
            <table className="table table-compact table-zebra w-full md:border-collapse">
                <thead>
                    <tr className="active">
                        <th></th>
                        <th>Name</th>
                        <th>Descripcion</th>
                        <th>Precio</th>
                        <th>Author</th>
                        <th>Category</th>
                        <th>Cantidad</th>
                        <th>Imagen</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        products != 0 ? products.map((data) => {
                            return <tr key={data.id}>
                                <th>{data.id}</th>
                                <td>{data.name}</td>
                                <td>{data.description}</td>
                                <td>{data.precio}</td>
                                <td>{data.author}</td>
                                <td>{data.category}</td>
                                <td>{data.quantity}</td>
                                <td>{data.image}</td>
                                <td>{data.date.substr(0, 10)}</td>
                                <th>
                                    {/*<Link to={"/product/" + data.id} className="btn btn-outline btn-warning btn-xs">
                                        Edit
                                    </Link>*/}
                                    <a href="#edit" className="btn btn-outline btn-warning btn-xs" onClick={() => ShowEdit(data.id, data.name, data.description, data.precio, data.author, data.quantity)}>Edit</a>

                                    <button className="btn btn-outline btn-error btn-xs" onClick={() => DeleteProduct(data.id)}>Delete</button>
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

export default Products;