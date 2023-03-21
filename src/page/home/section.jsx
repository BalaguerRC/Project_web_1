import { list } from "postcss";
import { useEffect, useState } from "react";

const Section = () => {

    const [pageNumber, setPageNumber] = useState(0);
    const [pageNumber2, setPageNumber2] = useState([]);
    const [pageSize, setPageSize] = useState([]);
    const [data, setData] = useState([]);
    const getItem = localStorage.getItem("Token");

    const GetProductsWithPag = async () => {
        await fetch(import.meta.env.VITE_URL + "/ProductsPag", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + getItem
            }
        })
            .then(resp => resp.json())
            .then(data => {
                setPageNumber(data.totalPages);
            })
            .catch(err => console.log(err))
    }

    const pageNumbers= [...Array(pageNumber+1).keys()].slice(1)
    console.log(pageNumbers)

    useEffect(() => {
        //console.log("Products: "+products);
        GetProductsWithPag();
    }, [])


    console.log("Products: " + pageNumber);
    return <div>
        <section>
            <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
                <p className="text-3xl text-gray-700 font-bold mb-5">
                    Example!
                </p>
                <h5 className="text-gray-500 text-lg">
                    Example
                </h5>
                <div className="text-center">
                    <div className="btn-group">
                        {pageNumbers != 0 ? pageNumbers.map(element => {
                           // console.log("Cantidad: " + element)
                            return <button className="btn btn-md">{element}</button>
                        }) : (<div>Token Expired</div>)
                        }
                    </div>
                </div>
            </div>
        </section>
        <footer>

        </footer>
    </div>
}
export default Section;