//eslint-disable-next-line
import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfileComponent = () => {
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({
        name: "",
        email:""
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/profile/67ca8cc74e43b267c6341949");
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching profile:", error);
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const saveProfile = async () => {
        try {
            await axios.put("http://localhost:3000/api/profile/67ca8cc74e43b267c6341949", user);
            setEditMode(false);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    if (loading) return <p>Loading profile...</p>;

    return (
        <div 
    className="relative w-full md:w-3/5 lg:w-1/2 h-96 bg-cover bg-center rounded-2xl shadow-lg mb-12 transition-all duration-300 ease-in-out"
    style={{ backgroundImage: "url('https://scontent.fpnq9-1.fna.fbcdn.net/v/t1.6435-9/128874819_2477033569268704_4848110062013308569_n.jpg?stp=dst-jpg_p843x403_tt6&_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=a4NBtMY9BSYQ7kNvgESK-TC&_nc_oc=AdjZfP9E3mtPYDzKUNxNJjq7_B_u4SPpI2LlUHVnCYqIuqCoHZ8XvH9ESE1CR7ObZUQ&_nc_zt=23&_nc_ht=scontent.fpnq9-1.fna&_nc_gid=A4-mDEqw2oYiPCv9pZEd8Jd&oh=00_AYFmBjGB9C-8gyR6qq8tNbx0O13d_cj4ZFBPOqkUznAQCg&oe=67F22A83')" }}
>
    {/* Profile Image Positioned at the Top Right */}

    {editMode ? (
        <div className="space-y-3 mt-4 p-4 bg-white/30 rounded-lg shadow-md backdrop-blur-md h-60 flex flex-col justify-between">
        <div className="space-y-3">
            <input 
                type="text" 
                name="name" 
                value={user.name} 
                onChange={handleChange} 
                className="w-7/12 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <input 
                type="text" 
                name="email" 
                value={user.email} 
                onChange={handleChange} 
                className="w-7/12 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <input 
                type="text" 
                name="password" 
                value={user.password} 
                onChange={handleChange} 
                className="w-7/12 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <button 
            onClick={saveProfile} 
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 self-start">
            Save
        </button>
    </div>
    
    ) : (
        <div className="absolute top-4 left-7 p-4 w-11/12 h-40 bg-white/30 rounded-lg shadow-lg backdrop-blur-md hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out">
            <img src="https://i.pinimg.com/236x/a5/45/f4/a545f4048dbdb9f35804d986e8cf8fcd.jpg" 
                 alt="Profile"
                 className="absolute top-2 right-2 w-24 h-24 rounded-full shadow-lg"/>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <button 
                onClick={() => setEditMode(true)} 
                className="mt-4 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-200"
            >
                Edit Profile
            </button>
        </div>
    )}
</div>
    );
};

export default ProfileComponent;
