//eslint-disable-next-line
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProfileComponent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editedUser, setEditedUser] = useState({ name: "", email: "", image: "" });
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
    const [newUser, setNewUser] = useState({ name: "", email: "", password: "", image: "" });

    useEffect(() => {
        if (id) {
            const fetchUserProfile = async () => {
                try {
                    const res = await axios.get(`http://localhost:3000/api/profile/${id}`);
                    setUser(res.data);
                    setEditedUser(res.data);
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching user profile:", error);
                    setLoading(false);
                }
            };
            fetchUserProfile();
        } else {
            const fetchAllUsers = async () => {
                try {
                    const res = await axios.get("http://localhost:3000/api/profile");
                    setUsers(res.data);
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching users:", error);
                    setLoading(false);
                }
            };
            fetchAllUsers();
        }
    }, [id]);

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
            const response = await axios.post("http://localhost:3000/api/profile", newUser);
            alert("User added successfully!");
            setIsModalOpen(false); // Close modal on success
            navigate(`/profile/${response.data._id}`);
        } catch (error) {
            console.error("Error adding user:", error);
            alert(error.response?.data?.error || "Failed to add user.");
        }
    };

    // Save edited profile
    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:3000/api/profile/${id}`, editedUser);
            setUser(editedUser);
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
            await axios.delete(`http://localhost:3000/api/profile/${id}`);
            alert("Profile deleted successfully!");
            navigate("/profile");
        } catch (error) {
            console.error("Error deleting profile:", error);
        }
    };

    if (loading) return <p>Loading...</p>;

    if (!id) {
        return (
            <div 
                className="p-6 min-h-[500px] max-w-[800px] flex flex-col items-center space-y-6 bg-contain bg-center bg-no-repeat w-screen rounded-xl overflow-hidden"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1720358553488-d332927ce65b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW91bnRhaW4lMjBhZXN0aGV0aWN8ZW58MHx8MHx8fDA%3D')", backgroundSize: "cover" }}
            >
                <div className="w-full max-w-[700px] flex flex-col items-center">
                    {/* Add Button */}
                    <button 
                        onClick={() => setIsModalOpen(true)} 
                        className="relative w-full mb-6 md:w-3/5 lg:w-2/3 bg-white/30 rounded-xl shadow-lg backdrop-blur-md hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out flex justify-center items-center cursor-pointer p-6"
                    >
                        <span className="text-3xl text-gray-700 font-bold">+</span>
                    </button>

                    <ul className="w-full flex flex-col items-center space-y-6">
                        {users.map((user) => (
                            <li 
                                key={user._id} 
                                onClick={() => navigate(`/profile/${user._id}`)}
                                className="relative w-full md:w-3/5 lg:w-2/3 bg-white/30 rounded-xl shadow-lg backdrop-blur-md hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out flex items-center space-x-4 cursor-pointer p-6"
                            >
                                <img 
                                    src={user.image || "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"} 
                                    alt="Profile" 
                                    className="w-24 h-24 rounded-full object-cover shadow-md"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                                    <p className="text-gray-700">{user.email}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
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
    }
    return (
        <div 
                className="p-6 min-h-[500px] max-w-[800px] flex flex-col justify-center items-center space-y-6 bg-contain bg-center bg-no-repeat w-screen rounded-xl overflow-hidden transition-all duration-300 ease-in-out"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1720358553488-d332927ce65b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW91bnRhaW4lMjBhZXN0aGV0aWN8ZW58MHx8MHx8fDA%3D')", backgroundSize: "cover" }}
            >
            <div className="relative w-full md:w-3/5 lg:w-2/3 bg-white/30 rounded-xl shadow-lg backdrop-blur-lg hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out p-6 flex flex-col items-center">
            <img 
                src={user?.image || "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"} 
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover shadow-lg"
                />
    
            {editMode ? (
                <>
                    <input 
                        type="text"
                        name="name"
                        value={editedUser.name}
                        onChange={handleInputChange}
                        className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none"
                    />
                    <input 
                        type="email"
                        name="email"
                        value={editedUser.email}
                        onChange={handleInputChange}
                        className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none"
                    />
                    <input 
                        type="text"
                        name="image"
                        value={editedUser.image}
                        onChange={handleInputChange}
                        placeholder="Image URL"
                        className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none"
                    />
                    <div className="flex space-x-4 mt-4">
                        <button 
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                        <button 
                            className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                            onClick={() => setEditMode(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <h2 className="text-2xl font-semibold text-white">{user?.name}</h2>
                    <p className="text-lg text-gray-200">{user?.email}</p>
                    <div className="mt-4 flex space-x-4">
                        <button 
                            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                            onClick={() => setEditMode(true)}
                            >
                            Edit
                        </button>
                        <button 
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                            onClick={handleDelete}
                            >
                            Delete
                        </button>
                        <button 
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                            onClick={() => navigate("/profile")}
                            >
                            Back to Profiles
                        </button>
                    </div>
                </>
            )}
            </div>
        </div>
    );
};

export default ProfileComponent;
