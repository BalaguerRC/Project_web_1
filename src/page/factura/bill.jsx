import { useEffect, useState } from "react"

const Bill = () => {

    const [bill, setBill] = useState([]);
    //page
    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);
    const [currentNumberPage, setCurrentNumberPage] = useState(null);

    const getToken = localStorage.getItem("Token")

    const response = async () => {
        await fetch(import.meta.env.VITE_URL + "/Report", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + getToken
            }
        }).then(resp => resp.json()).then(data => {
            setNextPage(data.nextPage);
            setCurrentNumberPage(data.pageNumber);
            setBill(data.data)
        }).catch(err => console.log(err))
    }

    const currentPage = async (pag) => {
        await fetch(pag, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + getToken
            }
        }).then(resp => resp.json()).then(data => {
            setBill(data.data)
            setNextPage(data.nextPage);
            setCurrentNumberPage(data.pageNumber);
            setPreviousPage(data.previousPage);
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        response()
    }, [])
    return <div className="container-Products">
        <div className="text-2xl font-bold">Facturas</div>
        <div className="text-sm breadcrumbs my-5">
            <ul>
                <li><a href="/">Home</a></li>
                <li>Facturas</li>
            </ul>
        </div>
        <div className="divider"></div>

        <div className="overflow-x-auto">
            <table className="table table-compact my-5 table-zebra w-full">
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>$ - Precio Total</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bill != null ? bill.map((item) => (
                        <tr key={item.id_compra}>
                            <th>{item.id_compra}</th>
                            <td>{item.total_price}</td>
                            <td>{item.date.slice(0, 10)}</td>
                            <td>{item.date.slice(11, 16)} {item.date.slice(11, 13) >= 12 ? "pm" : "am"}</td>
                            <th>
                                <button className="btn btn-outline btn-info btn-xs">
                                    Detalles
                                </button>
                            </th>
                        </tr>
                    )) : (<div>Token Expired</div>)}
                </tbody>
            </table>
        </div>
        <div className="divider"></div>

        <div className="text-center">
            <div className="btn-group ">
                {
                    currentNumberPage != null ? (
                        <div>
                            <button className={previousPage == null ? "btn btn-disabled" : "btn "} onClick={() => currentPage(previousPage)}>«</button>
                            <button className="btn bg-blue-700 btn-active">{currentNumberPage}</button>
                            {/*btn-disabled*/}
                            <button className={nextPage == null ? "btn btn-disabled" : "btn "} onClick={() => currentPage(nextPage)}>»</button>
                        </div>
                    ) : null
                }
            </div>
        </div>
    </div>
}

export default Bill;