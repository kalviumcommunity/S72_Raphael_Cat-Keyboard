import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        image: ""
    });

    const [errors, setErrors] = useState({});

    // Validation functions
    const validateName = (name) => {
        if (name.length < 2) {
            return "Name must be at least 2 characters long";
        }
        if (name.length > 50) {
            return "Name cannot exceed 50 characters";
        }
        if (!/^[a-zA-Z\s]+$/.test(name)) {
            return "Name can only contain letters and spaces";
        }
        return null;
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            return "Email is required";
        }
        if (!emailRegex.test(email)) {
            return "Invalid email address";
        }
        if (email.length > 100) {
            return "Email is too long";
        }
        return null;
    };

    const validatePassword = (password) => {
        if (password.length < 8) {
            return "Password must be at least 8 characters long";
        }
        if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&\[\]{}()])[A-Za-z\d@$!%*#?&\[\]{}()]{8,}$/.test(password.trim())) {
            return "Password must include letters, numbers, and special characters";
        }        
        return null;
    };

    const validateImageUrl = (url) => {
        // Optional validation for image URL
        if (url && url.trim() !== "") {
            try {
                new URL(url);
                return null;
            } catch {
                return "Invalid image URL";
            }
        }
        return null;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Clear individual field error when user starts typing
        if (errors[name]) {
            const newErrors = {...errors};
            delete newErrors[name];
            setErrors(newErrors);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        // Validate each field
        const nameError = validateName(formData.name);
        const emailError = validateEmail(formData.email);
        const passwordError = validatePassword(formData.password);
        const imageError = validateImageUrl(formData.image);

        // Collect errors
        if (nameError) newErrors.name = nameError;
        if (emailError) newErrors.email = emailError;
        if (passwordError) newErrors.password = passwordError;
        if (imageError) newErrors.image = imageError;

        // Check if there are any errors
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            await axios.post("http://localhost:3000/api/profile", formData);
            alert("Account created successfully!");
            navigate("/profile");
        } catch (error) {
            alert(error.response?.data?.error || "Failed to create account");
        }
    };

    return (
        <div 
            className="h-screen flex items-center justify-center w-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1720358553488-d332927ce65b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW91bnRhaW4lMjBhZXN0aGV0aWN8ZW58MHx8MHx8fDA%3D')" }}
        >
            <div className="w-full max-w-md mx-auto px-4">
                <div className="bg-white/30 backdrop-blur-lg rounded-xl shadow-lg p-6">
                    <h2 className="text-3xl font-bold text-white mb-6 text-center">Sign Up</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-white font-semibold mb-1" htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full p-2 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>
                        <div>
                            <label className="block text-white font-semibold mb-1" htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full p-2 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>
                        <div>
                            <label className="block text-white font-semibold mb-1" htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`w-full p-2 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>
                        <div>
                            <label className="block text-white font-semibold mb-1" htmlFor="image">Profile Image URL (optional)</label>
                            <input
                                type="text"
                                id="image"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                className={`w-full p-2 rounded-lg border ${errors.image ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                            />
                            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition duration-200"
                        >
                            Create Account
                        </button>
                        <p className="text-white text-center mt-4">
                            Already have an account?{" "}
                            <button
                                type="button"
                                onClick={() => navigate("/login")}
                                className="text-purple-300 hover:text-purple-400 underline"
                            >
                                Log in
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;