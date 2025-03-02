import axios from "axios";

const usAddLike = (id) =>{
    
    const handleLike = async () => {
        const token = localStorage.getItem("token");
        const response = await axios.put(`https://erneste-backend.onrender.com/image/like/${id}`, {}, {
            headers: {
                "Content-Type": "application/json",
                "auth": token
            }
        });
        console.log(response.data.message);
        notification.success({message:response.data.message})
    };
    return {handleLike}
}

export default usAddLike