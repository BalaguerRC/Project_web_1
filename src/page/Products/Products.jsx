import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EditProduct from "../../components/Products/EditProduct";
import { Add, Edit, Delete } from "../../components/Products/CrudProducts";
import "./style/index.css";

const Products = () => {
  const Name = useRef();
  const Description = useRef();
  const Price = useRef();
  const Author = useRef();
  const Category = useRef();
  const Category2 = useRef();
  //const Image = useRef();
  const Quantity = useRef();
  const getItem = localStorage.getItem("Token");
  const [products, setProducts] = useState([]);
  const [editar, setEditar] = useState(false);
  const [LinkImagen, setLinkImagen] = useState(null);
  const [ID, setID] = useState(0);
  const [error, setError] = useState(false);

  /**
     * GetProductswithpage
     
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(0);*/

  //page
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [currentNumberPage, setCurrentNumberPage] = useState(null);
  //page

  const GetProductsWithPag = async () => {
    await fetch(import.meta.env.VITE_URL + "/ProductsPag", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + getItem,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        //setPageNumber(data.totalPages);
        setNextPage(data.nextPage);
        setCurrentNumberPage(data.pageNumber);
        setProducts(data.data);
        //setPageSize(data.pageSize);
      })
      .catch((err) => {
        console.log(err);
        setError(!error);
      });
  };
  //toast
  let toas = (
    <div className="toast">
      <div className="alert alert-info">
        <div>
          <span>Token Expirado</span>
        </div>
      </div>
    </div>
  );

  //image
  const onFileChange = async (event) => {
    //setFile(event.target.files[0])
    const clientID = import.meta.env.VITE_CLIENT_ID;

    const file = event.target.files[0];

    //console.log("agregado...")
    const formdata = new FormData();
    //
    formdata.append("image", file);

    await fetch("https://api.imgur.com/3/image", {
      method: "POST",
      body: formdata,
      headers: {
        Authorization: "Client-ID " + clientID,
        //Accept: "application/json",
      },
      mimeType: "multipart/form-data",
    })
      .then((data) => data.json())
      .then((res) => {
        console.log(res);
        setLinkImagen(res.data.link);
      })
      .catch((err) => console.log("error: " + err));
    //console.log(file)
  };

  //const pageNumbers = [...Array(pageNumber + 1).keys()].slice(1)
  //console.log("Lista: ", products);

  useEffect(() => {
    //console.log("Products: "+products);
    //GetProducts();
    GetProductsWithPag();
  }, []);

  const navigate = useNavigate();

  const DeleteProduct = async (id) => {
    await Delete(id);
    GetProductsWithPag();
  };

  //categories
  const [categories, setCategories] = useState([]);

  const GetCategory = async () => {
    await fetch(import.meta.env.VITE_URL + "/Categories", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + getItem,
      },
    })
      .then((resp) => resp.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    GetCategory();
  }, []);

  //ADD
  const AddProduct = (
    name,
    description,
    precio,
    author,
    idCategory,
    quantity,
    image
  ) => {
    Add(name, description, precio, author, idCategory, quantity, image);
    Clear();
    GetProductsWithPag();
  };

  //edit

  const ShowEdit = async (
    id,
    name,
    description,
    precio,
    author,
    quantity,
    image
  ) => {
    //await setEditar(true)
    setID(id);
    //await Edit(id,name, description, precio, author, idCategory)
    Name.current.value = name;
    Description.current.value = description;
    Price.current.value = precio;
    Author.current.value = author;
    Quantity.current.value = quantity;
    setLinkImagen(image);

    console.log(id, editar);
  };

  const EditProduct = async (
    name,
    description,
    precio,
    author,
    idCategory,
    quantity,
    image
  ) => {
    await Edit(
      ID,
      name,
      description,
      precio,
      author,
      idCategory,
      quantity,
      image
    );
    //console.log(ID, name, description, precio, author, idCategory, quantity,image)
    Clear();
    await GetProductsWithPag();
  };

  //filter

  const Filter = async (idcategory) => {
    //console.log("IDCategory: " + idcategory)
    if (idcategory == "") {
      await GetProductsWithPag();
    } else
      await fetch(
        import.meta.env.VITE_URL + "/ProductsByIdPage/" + idcategory,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + getItem,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          //console.log("data: "+data.data)
          if (JSON.stringify(data.data) == undefined) {
            console.log("Not Found");
            GetProductsWithPag();
          } else {
            //console.log("data: " + JSON.stringify(data.data));
            setProducts(data.data);
            setNextPage(data.nextPage);
            setCurrentNumberPage(data.pageNumber);
          }
        })
        .catch((err) => console.log("Error: " + err));
  };

  //pagination
  //const active=0

  const currentPage = async (pag) => {
    await fetch(pag, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + getItem,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        //setPageNumber(data.totalPages);
        setProducts(data.data);
        setNextPage(data.nextPage);
        setCurrentNumberPage(data.pageNumber);
        setPreviousPage(data.previousPage);
        //setPageSize(data.pageSize);
      })
      .catch((err) => console.log(err));
  };

  const Clear = () => {
    setEditar(false);
    Name.current.value = "";
    Description.current.value = "";
    Price.current.value = "";
    Author.current.value = "";
    Quantity.current.value = "";
    setLinkImagen(null);
  };
  return (
    <div className="">
      <div className="container-Products ">
        <h1 className="text-2xl font-bold">Productos</h1>

        <div className="text-sm breadcrumbs my-5">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>Productos</li>
          </ul>
        </div>

        <div className="divider"></div>

        <div className="flex" style={{ justifyContent: "space-between" }}>
          <div className=" justify-start">
            <a className="btn btn-ghost bg-accent-focus" href="#add">
              Agregar
            </a>
          </div>
          <div className="overflow-x-auto" style={{ marginLeft: "6px" }}>
            <div className="form-control">
              <div className="input-group">
                <select
                  required
                  className="select select-bordered max-w-xs "
                  ref={Category2}
                >
                  <option selected value="">
                    Category...
                  </option>

                  {categories &&
                    categories.map((data) => {
                      return (
                        <option key={data.id} value={data.id}>
                          {data.name}
                        </option>
                      );
                    })}
                </select>
                <a
                  className="btn btn-primary"
                  onClick={() => Filter(Category2.current.value)}
                >
                  Filtrar
                </a>
              </div>
            </div>
          </div>
        </div>
        {/**Modal */}
        <div className="modal" id={editar ? "edit" : "add"}>
          <div className="modal-box">
            <a
              href="#"
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={
                editar
                  ? () => {
                      Clear();
                    }
                  : () => {
                      Clear();
                    }
              }
            >
              ✕
            </a>
            <h3 className="text-lg font-bold">
              {editar ? "Editar Producto" : "Agregar Producto"}
            </h3>
            <div className="form-control">
              {editar ? (
                <label className="label">
                  <span className="label-text">ID: {ID}</span>
                </label>
              ) : null}
              <label className="label">
                <span className="label-text">Nombre</span>
              </label>
              <input
                type="text"
                placeholder="nombre..."
                className="input input-bordered w-full max-w-xs w-11/12 max-w-5xl width-product"
                ref={Name}
              />
              <label className="label">
                <span className="label-text">Descripcion</span>
              </label>
              <input
                type="text"
                placeholder="descripcion..."
                className="input input-bordered w-full max-w-xs w-11/12 max-w-5xl width-product"
                ref={Description}
              />
              <label className="label">
                <span className="label-text">Precio</span>
              </label>
              <input
                type="number"
                placeholder="precio..."
                className="input input-bordered w-full max-w-xs w-11/12 max-w-5xl width-product"
                ref={Price}
              />
              <label className="label">
                <span className="label-text">Autor</span>
              </label>
              <input
                type="text"
                placeholder="autor..."
                className="input input-bordered w-full max-w-xs w-11/12 max-w-5xl width-product"
                ref={Author}
              />
              <label className="label">
                <span className="label-text">Categoria</span>
              </label>
              <select
                required
                className="select select-bordered max-w-xs w-11/12 max-w-5xl width-product"
                ref={Category}
              >
                <option selected disabled value="">
                  Category...
                </option>

                {categories &&
                  categories.map((data) => {
                    return (
                      <option key={data.id} value={data.id}>
                        {data.name}
                      </option>
                    );
                  })}
              </select>
              <label className="label">
                <span className="label-text">Cantidad</span>
              </label>
              <input
                type="number"
                placeholder="cantidad..."
                className="input input-bordered w-full max-w-xs w-11/12 max-w-5xl width-product"
                max={10}
                ref={Quantity}
              />
              <label className="label">
                <span className="label-text">Imagen</span>
              </label>
              <div className="flex w-full p-1">
                <input
                  type="file"
                  className="file-input w-full max-w-xs"
                  onChange={(e) => onFileChange(e)}
                  id="inputFile"
                />
                {LinkImagen != null ? (
                  <div className="avatar">
                    <div className="w-16 rounded">
                      <img
                        src={LinkImagen}
                        alt="Tailwind-CSS-Avatar-component"
                      />
                    </div>
                  </div>
                ) : null}
              </div>

              {LinkImagen != null ? (
                <div className="flex w-full p-1">
                  <label className="">
                    <span className="label-text">URL imagen: {LinkImagen}</span>
                  </label>
                </div>
              ) : null}
            </div>
            <div className="modal-action">
              {editar ? (
                <a
                  href="#"
                  className="btn btn-outline btn-warning"
                  onClick={() =>
                    EditProduct(
                      Name.current.value,
                      Description.current.value,
                      Price.current.value,
                      Author.current.value,
                      Category.current.value,
                      Quantity.current.value,
                      LinkImagen
                    )
                  }
                >
                  Editar
                </a>
              ) : (
                <a
                  href="#"
                  className="btn btn-outline btn-success"
                  onClick={() =>
                    AddProduct(
                      Name.current.value,
                      Description.current.value,
                      Price.current.value,
                      Author.current.value,
                      Category.current.value,
                      Quantity.current.value,
                      LinkImagen
                    )
                  }
                >
                  Guardar
                </a>
              )}
            </div>
          </div>
        </div>

        {/**END */}
        <div className="overflow-x-auto">
          <table className="table table-compact table-zebra my-5 w-full md:border-collapse">
            <thead>
              <tr className="active">
                <th>ID</th>
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
              {products != 0 ? (
                products.map((data) => {
                  return (
                    <tr key={data.id}>
                      <th>{data.id}</th>
                      <td>{data.name}</td>
                      <td>{data.description}</td>
                      <td>{data.precio}</td>
                      <td>{data.author}</td>
                      <td>{data.category}</td>
                      <td>{data.quantity}</td>
                      <td className="overflow-x-auto">{data.image}</td>
                      <td>{data.date.substr(0, 10)}</td>
                      <th>
                        {/*<Link to={"/product/" + data.id} className="btn btn-outline btn-warning btn-xs">
                                        Edit
                                    </Link>*/}
                        <a
                          href="#edit"
                          className="btn btn-outline btn-warning btn-xs"
                          onClick={() => {
                            setEditar(true);
                            ShowEdit(
                              data.id,
                              data.name,
                              data.description,
                              data.precio,
                              data.author,
                              data.quantity,
                              data.image
                            );
                          }}
                        >
                          Edit
                        </a>

                        <button
                          className="btn btn-outline btn-error btn-xs"
                          onClick={() => DeleteProduct(data.id)}
                        >
                          Delete
                        </button>
                      </th>
                    </tr>
                  );
                })
              ) : (
                <div>Token Expired</div>
              )}
            </tbody>
          </table>
        </div>
        <div className="divider"></div>

        <div className="text-center">
          <div className="btn-group ">
            {currentNumberPage != null ? (
              <div>
                <button
                  className={previousPage == null ? "btn btn-disabled" : "btn "}
                  onClick={() => currentPage(previousPage)}
                >
                  «
                </button>
                <button className="btn bg-blue-700 btn-active">
                  {currentNumberPage}
                </button>
                {/*btn-disabled*/}
                <button
                  className={nextPage == null ? "btn btn-disabled" : "btn "}
                  onClick={() => currentPage(nextPage)}
                >
                  »
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      {error ? toas : null}
    </div>
  );
};

export default Products;
