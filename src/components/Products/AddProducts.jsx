import { useEffect, useRef, useState } from "react";
import "./style/index.css";
import { Add } from "./CrudProducts";

const AddProducts = () => {

    const Name = useRef();
    const Description = useRef();
    const Price = useRef();
    const Author = useRef();
    const Category = useRef();
    const getItem = localStorage.getItem("Token");
    const [error, setError] = useState(null);

    const AddProduct = async (name,description,precio,author,idCategory) => {
        await Add(name,description,precio,author,idCategory)
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

    return <div>
        <h2>Add Product</h2>

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
            <button className="btn" onClick={()=>AddProduct(Name.current.value,Description.current.value,Price.current.value,Author.current.value,Category.current.value)}>Save</button>
        </form>
    </div>
}

export default AddProducts;