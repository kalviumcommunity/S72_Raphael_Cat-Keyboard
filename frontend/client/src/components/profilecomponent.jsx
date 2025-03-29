//eslint-disable-next-line
import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfileComponent = () => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editedUser, setEditedUser] = useState({ name: "", email: "", image: "" });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newUser, setNewUser] = useState({ name: "", email: "", password: "", image: "" });

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/profile");
                setUsers(res.data);
                if (res.data.length > 0) {
                    setEditedUser(res.data[0]);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching users:", error);
                setLoading(false);
            }
        };
        fetchAllUsers();
    }, []);

    // Handle input changes for editing profile
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    // Handle input changes for adding a new user
    const handleNewUserChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prev) => ({ ...prev, [name]: value }));
    };

    // Handle adding a new user
    const handleAddUser = async (e) => {
        e.preventDefault();
        if (!newUser.name || !newUser.email || !newUser.password) {
            alert("Please fill in all required fields.");
            return;
        }

        try {
            await axios.post("http://localhost:3000/api/profile", newUser);
            alert("User added successfully!");
            setIsModalOpen(false);
            window.location.reload();
        } catch (error) {
            console.error("Error adding user:", error);
            alert(error.response?.data?.error || "Failed to add user.");
        }
    };

    // Save edited profile
    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:3000/api/profile/${editedUser._id}`, editedUser);
            setEditMode(false);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    // Delete profile
    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this profile?")) return;
        try {
            await axios.delete(`http://localhost:3000/api/profile/${editedUser._id}`);
            alert("Profile deleted successfully!");
            window.location.reload();
        } catch (error) {
            console.error("Error deleting profile:", error);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div 
            className="h-screen flex items-center justify-center w-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1720358553488-d332927ce65b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW91bnRhaW4lMjBhZXN0aGV0aWN8ZW58MHx8MHx8fDA%3D')" }}
        >
            <div className="w-full max-w-2xl mx-auto px-4 flex justify-center items-center min-h-screen">
                {users.length > 0 && (
                    <div 
                        onClick={() => !editMode && setEditMode(true)}
                        className="relative min-w-[800px] min-h-[400px] bg-white/40 rounded-xl shadow-lg backdrop-blur-lg hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out p-6 flex flex-col items-center justify-center"
                    >
                        {editMode ? (
                            <>
                                <div className="w-full space-y-3">
                                    <div className="flex justify-center mb-4">
                                        <img 
                                            src={editedUser.image || "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"} 
                                            alt="Profile"
                                            className="w-32 h-32 rounded-full object-cover shadow-lg"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-white font-semibold mb-1" htmlFor="name">Name:</label>
                                        <input 
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={editedUser.name}
                                            onChange={handleInputChange}
                                            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-white font-semibold mb-1" htmlFor="email">Email:</label>
                                        <input 
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={editedUser.email}
                                            onChange={handleInputChange}
                                            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-white font-semibold mb-1" htmlFor="image">Profile Image URL:</label>
                                        <input 
                                            type="text"
                                            id="image"
                                            name="image"
                                            value={editedUser.image}
                                            onChange={handleInputChange}
                                            placeholder="Image URL"
                                            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-white font-semibold mb-1" htmlFor="password">New Password:</label>
                                        <input 
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={editedUser.password || ''}
                                            onChange={handleInputChange}
                                            placeholder="Enter new password"
                                            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="flex space-x-4 mt-6">
                                    <button 
                                        className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
                                        onClick={handleSave}
                                    >
                                        Save
                                    </button>
                                    <button 
                                        className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition"
                                        onClick={() => setEditMode(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
                                        onClick={handleDelete}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <img 
                                    src={users[0].image || "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"} 
                                    alt="Profile" 
                                    className="w-40 h-40 rounded-full object-cover shadow-lg mb-6"
                                />
                                <div className="text-center">
                                    <h3 className="text-4xl font-semibold text-gray-700 mb-2">{users[0].name}</h3>
                                    <p className="text-2xl text-gray-600">{users[0].email}</p>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
            {/* Modal for Adding New User */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Add New User</h2>
                        <form onSubmit={handleAddUser} className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={newUser.name}
                                onChange={handleNewUserChange}
                                className="w-full p-2 border rounded"
                                required
                            />  
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={newUser.email}
                                onChange={handleNewUserChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={newUser.password}
                                onChange={handleNewUserChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                            <input
                                type="text"
                                name="image"
                                placeholder="Profile Image URL (optional)"
                                value={newUser.image}
                                onChange={handleNewUserChange}
                                className="w-full p-2 border rounded"
                            />
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Add User
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileComponent;
