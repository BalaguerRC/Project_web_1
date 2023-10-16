const getItem = localStorage.getItem("Token");

export const Get = async () => {
  await fetch(import.meta.env.VITE_URL + "/Products", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + getItem,
    },
  })
    .then((resp) => resp.json())
    .then((data) => console.log(data));
};
export const Add = (
  name,
  description,
  precio,
  author,
  idCategory,
  quantity,
  image
) => {
  console.log(
    "Desde Crud",
    name,
    description,
    precio,
    author,
    idCategory,
    quantity,
    image
  );
  fetch(import.meta.env.VITE_URL + "/Products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + getItem
    },
    body: JSON.stringify({
      name: name,
      description: description,
      precio: precio,
      author: author,
      idCategory: idCategory,
      quantity: quantity,
      image: image,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.succes === true) {
        console.log(data);
      }
    })
    .catch((err) => console.log("Error: " + err));
};
export const Edit = async (
  id,
  name,
  description,
  precio,
  author,
  idCategory,
  quantity,
  image
) => {
  console.log(
    id,
    name,
    description,
    precio,
    author,
    idCategory,
    quantity,
    image
  );
  await fetch(import.meta.env.VITE_URL + "/Products/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getItem,
    },
    body: JSON.stringify({
      name: name,
      description: description,
      precio: precio,
      author: author,
      idCategory: idCategory,
      quantity: quantity,
      image: image,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.succes === true) {
        console.log("data es: " + data);
      }
    })
    .catch((err) => console.log("Error: " + err));
};
export const Delete = async (id) => {
  await fetch(import.meta.env.VITE_URL + "/Products/" + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + getItem,
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};
