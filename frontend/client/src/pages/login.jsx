import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/profile/login", formData);
            if (response.data) {
                navigate("/profile");
            }
        } catch (error) {
            alert("Invalid email or password");
        }
    };

    return (
        <div 
            className="h-screen flex items-center justify-center w-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1720358553488-d332927ce65b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW91bnRhaW4lMjBhZXN0aGV0aWN8ZW58MHx8MHx8fDA%3D')" }}
        >
            <div className="w-full max-w-md mx-auto px-4">
                <div className="bg-white/30 backdrop-blur-lg rounded-xl shadow-lg p-6">
                    <h2 className="text-3xl font-bold text-white mb-6 text-center">Login</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-white font-semibold mb-1" htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-white font-semibold mb-1" htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition duration-200"
                        >
                            Log In
                        </button>
                        <p className="text-white text-center mt-4">
                            Don't have an account?{" "}
                            <button
                                type="button"
                                onClick={() => navigate("/signup")}
                                className="text-purple-300 hover:text-purple-400 underline"
                            >
                                Sign up
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login; 