import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { AiTwotoneDelete } from "react-icons/ai";
import { FaCommentDots } from "react-icons/fa";
import { useState } from "react";
import {Modal} from "antd";
import {Button} from "antd";
import useAddImage from "./hooks/add-image";
import useAddComment from "./hooks/add-comment";
import useDeleteImage from "./hooks/delete-image";
import usAddLike from "./hooks/add-like-image";
import useFetchImage from "./hooks/fetch-image";

const Image = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalAddOpen, setIsModaAddlOpen] = useState(false);
    const [selectedImageId, setSelectedImageId] = useState(null);

    const {HandleAddImage,HandleAddImageChange,HandleTitleCange} = useAddImage()

    const {HandleAddComment,HandleChange,formData} = useAddComment(selectedImageId)
    const {handleDelete} = useDeleteImage(selectedImageId)
    const {handleLike} = usAddLike(selectedImageId)
    const {Images} = useFetchImage()
    
    
    const onFinishDelete = (id) =>{
        setSelectedImageId(id)
        handleDelete()
    }

    const onFinishLike = (id) =>{
        setSelectedImageId(id)
        handleLike()
    }

    // this openModal is used to open modal of comment modal
    const openModal = (id) => {
        setSelectedImageId(id)
        setIsModalOpen(true);
    };
    
    // this openModal is used to open modal of adding image
    const openAddModal = ()=>{
        setIsModaAddlOpen(true)
    }

    // this is fuction used to cancel modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImageId(null)
        setIsModaAddlOpen(false)
    };

   
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
                                <div onClick={() => onFinishLike(image._id)}>
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
                                onClick={() => onFinishDelete(image._id)}
                            >
                                <AiTwotoneDelete />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* mpodol for comment */}
            
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

             {/* model for apload image */}

            <Modal
             open={isModalAddOpen}
             onCancel={closeModal}
             onOk={closeModal}
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
