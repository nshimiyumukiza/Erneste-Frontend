import { useState } from "react";
import axios from "axios";

const useAddImage = () =>{
    const [addImage,setAddImage]=useState(null)
    const [title,setTitle]=useState("")

    const HandleAddImageChange = (e)=>{
        const file = e.target.files[0]
        setAddImage(file)
    }
   const HandleTitleCange=(e)=>{
        setTitle(e.target.value)
    }

    const formAddImage = new FormData()
    formAddImage.append("image",addImage)
    formAddImage.append("title",title)

    const HandleAddImage = async (e)=>{
        e.preventDefault()

        const response = await axios.post('https://erneste-backend.onrender.com/image',formAddImage)
        console.log(response)
        alert({message:response.message})

    }

    return {HandleAddImage,HandleAddImageChange,HandleTitleCange}
    
}
export default useAddImage