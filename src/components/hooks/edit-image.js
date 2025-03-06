import { useState,useEffect } from "react"
import axios from "axios";

const useEditImage = (id) =>{
    const [title,setTitle] = useState('')
  
   useEffect(()=>{
    const fetchImageData =async () =>{
        const response = await axios.get(`https://erneste-backend.onrender.com/image/${id}`)
        const currentTitle = response.data.title ?? ""
        setTitle(currentTitle)
    }
    if(id) fetchImageData()
   },[id])




    const onFinishEdit = async (e) =>{
        
        e.preventDefault()

    
         const response = await axios.put(`https://erneste-backend.onrender.com/image/${id}`,{title})
         console.log(response.data)
         alert(response.data.message)

    }

    return {onFinishEdit,setTitle,title}

}
export default useEditImage