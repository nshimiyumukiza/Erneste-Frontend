
import axios from "axios";
const useDeleteImage = (id) =>{
    const handleDelete = async () => {
        const response = await axios.delete(`https://erneste-backend.onrender.com/image/${id}`);
        notification.success({message:response.data.message})
    };

    return {handleDelete}
}
export default useDeleteImage