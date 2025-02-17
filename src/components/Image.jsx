import { useEffect, useState } from "react";
import axios from "axios";



const Image = () => {
    const [Images,setImages]=useState([])

    useEffect(()=>{
     const FectImage = async ()=>{
        const response = await axios.get("https://erneste-backend.onrender.com/image")
        const data = response.data
        setImages(data)
     }
     FectImage()
    },[])
    

    const HandleDelete = async (id)=>{
       const response = await axios.delete(`https://erneste-backend.onrender.com/image/${id}`)
       console.log(response.data.message)
    }
  return (
    <div className="grid grid-cols-5 mt-4">
        {Images.data && Images.data.map(image =>(
            <div className="border rounded-md shadow-md" >
            <img className="w-full" src={image.image.url}/>
            <div className="flex justify-center gap-2">
            <p>{image.like.length}</p>
            {/* <p>{image.disLike.length}</p> */}
            <p>{image.comment.length}</p>
            <button onClick={() => HandleDelete(image._id)}>Delete</button>
            </div>

        </div>
        ))}
    </div>
  )
}

export default Image 