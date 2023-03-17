const getItem = localStorage.getItem("Token");

export const Get = async () => {
    await fetch(import.meta.env.VITE_URL + "/Categories", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + getItem
        }
    })
        .then(resp => resp.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
}
export const Add = async (name) => {

    //await console.log("Name2: " + name)
    await fetch(import.meta.env.VITE_URL + "/Categories", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getItem
        },
        body: JSON.stringify({
            name: name
        })
    }).then(res => res.json()).then(data => console.log(data)).catch(err => console.log(err))
}
export const Edit = async (id,name) => {
    await fetch(import.meta.env.VITE_URL + "/Categories/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getItem
        },
        body: JSON.stringify({
            name: name,
        })
    }).then(res => res.json()).then(data => console.log(data))
}
export const Delete = async (id) => {
    await fetch(import.meta.env.VITE_URL + "/Categories/" + id, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + getItem
        },
    }).then(res => res.json()).then(data => console.log(data)).catch(err => console.log(err))
}