import axios from 'axios'
import React, { useState } from 'react'
import { notification } from 'antd'

const Singup = ({ onSignup }) => {
    const [formData, setFormData] = useState({
        name: "", email: "", password: "", confirmPassword: ""
    })
    const Hanlechange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const HandleFinish = async (e) => {
        e.preventDefault()

        const response = await axios.post("https://erneste-backend.onrender.com/users", formData)
        notification.success({message:response.data.message})
        console(response.data)
    }
    return (
        <div>
            <div>

                <div className='flex justify-center mt-12'>
                    <div>
                        <h3 className='text-2xl mb-6 ml-10 font-bold'>Signup</h3>
                        <form className='space-y-3 mb-6' action="submit" onSubmit={HandleFinish}>
                            <div>
                                <label htmlFor="name">Name</label><br />
                                <input name='name' onChange={Hanlechange} value={formData.name} className='border border-1 outline-none rounded-md bg-gray-50 px-2 py-1' type="text" placeholder='enter your name' /><br />
                            </div>
                            <div>
                                <label htmlFor="email">Email</label><br />
                                <input name='email' onChange={Hanlechange} value={formData.email} className='border border-1 outline-none rounded-md bg-gray-50 px-2 py-1' type="email" placeholder='enter your email' /><br />
                            </div>
                            <div>
                                <label htmlFor="password">Password</label><br />
                                <input name='password' onChange={Hanlechange} value={formData.password} className='border border-1 outline-none rounded-md bg-gray-50 px-2 py-1' type="password" placeholder='enter password' /><br />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword">Connfirm</label><br />
                                <input name='confirmPassword' onChange={Hanlechange} value={formData.confirmPassword} className='border border-1 outline-none rounded-md bg-gray-50 px-2 py-1' type="password" placeholder='enter confirm password' /><br />
                            </div>

                            <button type='submit' onClick={HandleFinish} className='border px-4 py-2 bg-black text-white hover:text-black hover:bg-white rounded-md text-center'>SingUp</button>
                        </form>
                    </div>
                </div>
                <div className='flex justify-center mt-4 pb-4'>
                    <p>if you have acount <button onClick={onSignup} className='text-xl font-bold text-blue-400'>login</button></p>
                </div>

            </div>
        </div>
    )
}

export default Singup