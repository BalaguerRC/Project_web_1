const getItem = localStorage.getItem("Token");

export default async function Dashboard() {
    await fetch(import.meta.env.VITE_URL + "/Dashboard", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + getItem
        }
    }).then(res => res.json()).then(data => console.log(data))
}
