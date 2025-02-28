import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { AiTwotoneDelete } from "react-icons/ai";
import { FaCommentDots } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import {Modal} from "antd";
import { notification } from "antd";
import {Button} from "antd";

const Image = () => {
    const [Images, setImages] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalAddOpen, setIsModaAddlOpen] = useState(false);
    const [formData, setFormData] = useState({commentMessgae:""})
    const [selectedImageId, setSelectedImageId] = useState(null);
    const [addImage,setAddImage]=useState(null)
    const [title,setTitle]=useState("")

    const openModal = (id) => {
        setSelectedImageId(id)
        setIsModalOpen(true);
    };

    const openAddModal = ()=>{
        setIsModaAddlOpen(true)
    }
    const cancelAddModal = ()=>{
        setIsModaAddlOpen(false)
    }
    
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImageId(null)
    };

    useEffect(() => {
        const fetchImages = async () => {
            const response = await axios.get("https://erneste-backend.onrender.com/image");
            const data = response.data;
            setImages(data);
        };
        fetchImages();
    }, []);

    const handleDelete = async (id) => {
        const response = await axios.delete(`https://erneste-backend.onrender.com/image/${id}`);
        notification.success({message:response.data.message})
    };

    const handleLike = async (id) => {
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

    const HandleChange = (e)=>{
        const {name,value} = e.target
        setFormData({
            ...formData,
            [name]:value
        })
    }

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

    const HandleAddComment = async (e) =>{
        e.preventDefault()
       const response = await axios.post(`https://erneste-backend.onrender.com/comment/${selectedImageId}`,formData)
       console.log(response.data.message)
       alert({message:response.data.message})
    }

    const HandleAddImage = async (e)=>{
        e.preventDefault()

        const response = await axios.post('https://erneste-backend.onrender.com/image',formAddImage)
        console.log(response)
        alert({message:response.message})

    }

    return (
        <>
          <div className="flex justify-center items-end gap-5 p-6">
            <h1 className='text-3xl text-center font-bold '>Well COme To My App</h1>
            <Button onClick={openAddModal}>Add New Image</Button>
          </div>
            <div className="grid grid-cols-5 mt-4">
                {Images.data && Images.data.map(image => (
                    <div key={image._id} className="border rounded-md shadow-md">
                        <img className="w-full" src={image.image.url} alt="image" />
                        <div className="flex justify-center gap-2 space-x-3">
                            <div className="flex space-x-2">
                                <div onClick={() => handleLike(image._id)}>
                                    {image.like.length === 0 ? (
                                        <AiOutlineLike className="text-md text-blue-500" />
                                    ) : (
                                        <AiFillLike className="text-md" />
                                    )}
                                </div>
                                <p>{image.like.length}</p>
                            </div>
                            <div className="flex space-x-3">
                                <FaCommentDots
                                    className="text-lg text-blue-500"
                                    onClick={()=>openModal(image._id)}
                                />
                                <p>{image.comment.length}</p>
                            </div>
                            <button
                                className="text-lg text-red-500"
                                onClick={() => handleDelete(image._id)}
                            >
                                <AiTwotoneDelete />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for Comments */}
            <Modal
                open={isModalOpen}
                onOk={closeModal}
                onCancel={closeModal}
                footer={null}
            >
                <div >
                    <form action="submit" onSubmit={HandleAddComment}>
                    
                     <label htmlFor="commentMessgae">Write a Comment
                     <textarea name="commentMessgae" onChange={HandleChange} value={formData.commentMessgae} rows="4" cols="50" placeholder="Your comment here..." className="w-full border-2 border-gray-300 p-3 outline-none rounded-md"/>
                     </label>
                    <button type="submit" onClick={HandleAddComment}>Submit</button>
                    </form>
                </div>
            </Modal>

            <Modal
             open={isModalAddOpen}
             onCancel={cancelAddModal}
             onOk={cancelAddModal}
             footer={null}
             title="Add New Image"
            >
              <form action="submit" onSubmit={HandleAddImage}>
                <label htmlFor="title">Title 
                    <input type="text" name="title" onChange={HandleTitleCange} placeholder="Image title" className="w-full"/>
                </label>
                <label htmlFor="image">Image 
                    <input type="file" name="image" accept="image/*" onChange={HandleAddImageChange} className="w-full"/>
                </label>

                <button type="submit" onClick={HandleAddImage}>Submit</button>
              </form>
            </Modal>
        </>
    );
};

export default Image;
