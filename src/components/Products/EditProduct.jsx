import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Edit } from "./CrudProducts";

const EditProduct = () => {

    let { id } = useParams();

    console.log(id);

    const Name = useRef();
    const Description = useRef();
    const Price = useRef();
    const Author = useRef();
    const Category = useRef();
    const getItem = localStorage.getItem("Token");
    const [producto, setProducts] = useState([]);

    const navigate = useNavigate();

    const EditCategory = async (name, description, precio, author, idCategory) => {
        await Edit(id,name, description, precio, author, idCategory)
        navigate("/product")
    }

    fetch(import.meta.env.VITE_URL + "/Products/" + id, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + getItem
        }
    })
        .then(resp => resp.json())
        .then(data => {
            Name.current.value= data.data.name
            Description.current.value= data.data.description
            Price.current.value= data.data.precio
            Author.current.value= data.data.author
            console.log(data.data)
        })

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

    return <div>
        <h2>Edit Product</h2>
        <form className="Product-Form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-input">
                <input type="text" placeholder="Name" ref={Name} />
            </div>
            <div className="form-input">
                <input type="text" placeholder="Description" ref={Description} />
            </div>
            <div className="form-input">
                <input type="text" placeholder="Price" ref={Price} />
            </div>
            <div className="form-input">
                <input type="text" placeholder="Author" ref={Author} />
            </div>
            <div>
                <select required ref={Category}>
                    <option selected disabled value="">Category...</option>

                    {categories && categories.map((data) => {
                        return <option key={data.id} value={data.id}>
                            {data.name}
                        </option>
                    })}
                </select>
            </div>
            <button className="btn" onClick={() => EditCategory(Name.current.value, Description.current.value, Price.current.value, Author.current.value, Category.current.value)}>Save</button>
        </form>
    </div>
}
export default EditProduct;