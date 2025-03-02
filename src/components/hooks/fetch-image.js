import { useEffect, useState } from "react";
import axios from "axios";

const useFetchImage = () =>{
    const [Images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            const response = await axios.get("https://erneste-backend.onrender.com/image");
            const data = response.data;
            setImages(data);
        };
        fetchImages();
    }, []);

    return {Images}
}

export default useFetchImage