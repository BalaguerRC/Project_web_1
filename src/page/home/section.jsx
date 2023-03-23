import { list } from "postcss";
import { useEffect, useRef, useState } from "react";

const Section = () => {
    const ImagenFile = useRef();
    const [Imagen, setImagen] = useState();

    const getItem = localStorage.getItem("Token");

    const uri = "https://api.imgur.com/3/image/";

    //const file = document.getElementById("file");
    const img = document.getElementById("showImagen");
    /*const ImgurSave = () => {
        file.addEventListener("change", ev => {
            //const formdata = new FormData()
            formdata.append("image", ev.target.files[0])
            fetch(uri, {
                method: "POST",
                headers: {
                    Authorization: `Client-ID ${clientID}`
                },
                body: formdata
            }).then(data => data.json()).then(res => {
                img.src = res.data.link
                setImagen(res.data.link)
                console.log("Exito")
            }).catch(err=>console.log("error: "+err))
        })
    }*/

    const [file, setFile] = useState(); 
    const [LinkImagen, setLinkImagen] = useState();

    const clientID = "6f0ddd1e3abc3e4";
    const auth = "Client-ID " + clientID

    const onFileChange = (event) => {
        //setFile(event.target.files[0])

        const file=event.target.files[0]

        console.log("agregado...")
        const formdata = new FormData();
        //
        formdata.append("image", file);

        fetch("https://api.imgur.com/3/image/", {
            method: "POST",
            body: formdata,
            headers: {
                Authorization: auth,
                //Accept: "application/json",
            },
            mimeType: 'multipart/form-data',
        }).then(data => data.json())
            .then(res => setLinkImagen(res.data.link))
            .catch(err => console.log("error: " + err))
        console.log(file)
    };
   

    /*
    const onFileUpload = async () => {

        const clientID = "6f0ddd1e3abc3e4";
        const auth = "Client-ID " + clientID
        //
        const formdata = new FormData();
        //
        formdata.append("image", file);
        //
        await fetch("https://api.imgur.com/3/image/", {
            method: "POST",
            body: formdata,
            headers: {
                Authorization: auth,
                //Accept: "application/json",
            },
            mimeType: 'multipart/form-data',
        }).then(data => data.json())
            .then(res => setLinkImagen(res.data.link))
            .catch(err => console.log("error: " + err))
        console.log(file)
        console.log("form es :" + formdata)
    };
*/
    return <div>
        <section>
            <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
                <p className="text-3xl text-gray-700 font-bold mb-5">
                    Example!
                </p>
                <h5 className="text-gray-500 text-lg">
                    Example
                </h5>
            </div>
        </section>
        <div>
            <label className="label">
                <span className="label-text">Imagen</span>
            </label>
            <img id="showImagen" />
            <input name="file" type="file" className="file-input w-full max-w-xs" onChange={(e) => onFileChange(e)} />
            <h3>URL: {LinkImagen}</h3>
        </div>
    </div>
}
export default Section;