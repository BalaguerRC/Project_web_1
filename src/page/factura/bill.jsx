import { useEffect, useState } from "react"

const Bill = () => {

    const [bill, setBill] = useState([]);
    const [Id, setId]=useState(0);
    const [detailse, setDetails] = useState([]);
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

    const details = async (id) => {
        setId(id);
        await fetch(import.meta.env.VITE_URL + "/Compra/" + id, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + getToken
            }
        }).then(res => res.json()).then(data => setDetails(data.data)).catch(err => console.log(err))
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

        {/**Modal */}
        <div className="modal" id="detalles">
            <div className="modal-box w-11/12 max-w-4xl">
                <a href="#" className="btn btn-sm btn-circle absolute right-2 top-2">✕</a>
                <h3 className="text-lg font-bold">Detalles</h3>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Codigo de compra: {Id!=0 ? Id:null}</span>
                    </label>
                    <div className="overflow-x-auto">
                        <table className="table table-compact my-5 table-zebra w-full">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>$ - Precio</th>
                                    <th>Cantidad</th>
                                    <th>Total</th>
                                    <th>Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {detailse != [] ? detailse.map((item, index) => (
                                    <tr key={index}>
                                        <th>{item.id_product}</th>
                                        <td>{item.productName}</td>
                                        <td>{item.price}</td>
                                        <td>{item.amount}</td>
                                        <td>{item.total}</td>
                                        <td>{item.date.slice(0, 10)}</td>
                                    </tr>
                                )) : (<div>Token Expired</div>)}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="modal-action">
                    <a href="#" className="btn btn-outline btn-success">Cancelar</a>
                </div>
            </div>
        </div>

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
                    {bill != 0 ? bill.map((item) => (
                        <tr key={item.id_compra}>
                            <th>{item.id_compra}</th>
                            <td>{item.total_price}</td>
                            <td>{item.date.slice(0, 10)}</td>
                            <td>{item.date.slice(11, 16)} {item.date.slice(11, 13) >= 12 ? "pm" : "am"}</td>
                            <th>
                                <a href="#detalles" className="btn btn-outline btn-info btn-xs" onClick={() => details(item.id_compra)}>
                                    Detalles
                                </a>
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