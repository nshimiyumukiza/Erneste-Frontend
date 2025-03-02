import { useState } from "react";
import axios from "axios";

const useAddComment = (selectedImageId) =>{
    const [formData, setFormData] = useState({commentMessgae:""})
    

    const HandleChange = (e)=>{
        const {name,value} = e.target
        setFormData({
            ...formData,
            [name]:value
        })
    }

    const HandleAddComment = async (e) =>{
        e.preventDefault()
       const response = await axios.post(`https://erneste-backend.onrender.com/comment/${selectedImageId}`,formData)
       console.log(response.data.message)
       alert({message:response.data.message})
    }

    return {HandleAddComment,HandleChange,formData}
}

export default useAddComment