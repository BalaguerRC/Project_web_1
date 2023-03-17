const getItem = localStorage.getItem("Token");

export const Get = async () => {
    /** */
}
export const Add = async (name, email, password,date) => {
    await fetch(import.meta.env.VITE_URL + "/Users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getItem
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            date: date
        })
    }).then(res => res.json()).then(data => {
        console.log(data)
    }).catch(err => console.log("Error: " + err))
}
export const Edit = async (id, name, email, password) => {
    await fetch(import.meta.env.VITE_URL + "/Users/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getItem
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        })
    }).then(res => res.json()).then(data => {
        console.log(data)
    }).catch(err => console.log("Error: " + err))
}
export const Delete = async (id) => {
    await fetch(import.meta.env.VITE_URL + "/Users/" + id, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + getItem
        },
    }).then(res => res.json()).then(data => console.log(data)).catch(err => console.log(err))
}