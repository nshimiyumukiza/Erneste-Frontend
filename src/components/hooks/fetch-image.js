
import axios from "axios";

const useFetchImage = (setImages) =>{

        const fetchImages = async () => {
            const response = await axios.get("https://erneste-backend.onrender.com/image");
            const data = response.data;
            setImages(data);
        };
    
    return {fetchImages}
}

export default useFetchImage