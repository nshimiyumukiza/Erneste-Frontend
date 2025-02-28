import axios from "axios";
import { useState } from "react";
import { notification } from "antd";

const Login = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        email: "", password: ""
    })

    const HandleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const HandleFinish = async (e) => {
        e.preventDefault()

        const response = await axios.post("https://erneste-backend.onrender.com/users/login", formData)
        const token = response.data.token
        if (token) {
            localStorage.setItem("token", token)
            notification.success({message:'success login',
                placement:'topRight'
            })
            window.location.href = "/image";
            
        }
    }
    return (
        <div>
            <div>
                <h1 className="text-3xl text-center font-bold pt-6 pb-4">Login</h1>
            </div>
            <form className="space-y-3 mb-6" action="submit" onSubmit={HandleFinish}>
                <div>
                    <label htmlFor="email">Email</label><br />
                    <input
                        id="email"
                        onChange={HandleChange}
                        value={formData.email}
                        name="email"
                        className="border border-1 outline-none rounded-md bg-gray-50 px-2 py-1"
                        type="email"
                        placeholder="Enter your email"
                        required
                    /><br />
                </div>
                <div>
                    <label htmlFor="password">Password</label><br />
                    <input
                        id="password"
                        onChange={HandleChange}
                        value={formData.password}
                        name="password"
                        className="border border-1 outline-none rounded-md bg-gray-50 px-2 py-1"
                        type="password"
                        placeholder="Enter password"
                        required
                    /><br />
                </div>
                <button type="submit" onClick={HandleFinish} className="border px-4 py-2 bg-black text-white hover:text-black hover:bg-white rounded-md text-center">
                    Login

                </button>
            </form>

            <div className="flex justify-center mt-4 pb-4">
                <p>
                    If you don't have an account,{" "}
                    <button onClick={onLogin} className="text-xl font-bold text-blue-400 px-4">
                        Sign Up
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
