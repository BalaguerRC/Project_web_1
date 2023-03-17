import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Edit } from "./CrudCategory";

const EditCategory = () => {
    let { id } = useParams();

    console.log(id);

    const Name = useRef();
    const getItem = localStorage.getItem("Token");
    const navigate= useNavigate();

    const EditCategory = async (name) => {
        if(name!=null){
            await Edit(id,name)
        }
        //.catch(err=>console.log(err))
        //navigate("/category")
    }

    fetch(import.meta.env.VITE_URL + "/Categories/" + id, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + getItem
        }
    })
        .then(resp => resp.json())
        .then(data => Name.current.value = data.name)
        .catch(err => console.log(err))
    //console.log(Name)
    //Name.current.value= categories;

    return <div>
        <h2>Edit Category: {id}</h2>
        <form className="Product-Form">
            <div className="form-input">
                <input type="text" placeholder="Name" ref={Name} />
            </div>
            <button className="btn" type="submit" onClick={() => EditCategory(Name.current.value)}>Save</button>
        </form>
    </div>
}

export default EditCategory;