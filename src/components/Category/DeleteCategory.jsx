export default function Delete(id) {
    const DeleteCategory = async () => {
        await fetch(import.meta.env.VITE_URL + "/Categories/" + id, {

        })
    }
    
}