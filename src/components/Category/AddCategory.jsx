import { useRef } from "react";
import "./style/index.css";
import { Add } from "./CrudCategory";

const AddCategory=()=>{
    const Name = useRef();
    //const getItem = localStorage.getItem("Token");

    const AddCategory=async(name)=>{
        //await console.log("Name: " +name)
        //await Add(name)

        if(name!=null){
            //console.log("Name: " +name)
            await Add(name)
        }
    }

    return <div>
        <h2>Add Category</h2>
        <form className="Product-Form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-input">
                <input type="text" placeholder="Name" ref={Name} />
            </div>
            <button className="btn" onClick={()=>AddCategory(Name.current.value)}>Save</button>
        </form>
    </div>
}

export default AddCategory;