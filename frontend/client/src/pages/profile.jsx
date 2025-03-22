//eslint-disable-next-line
import React from "react";
import ProfileComponent from "../components/profilecomponent";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1720358553488-d332927ce65b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW91bnRhaW4lMjBhZXN0aGV0aWN8ZW58MHx8MHx8fDA%3D')", backgroundSize: "cover" }}>
            <div className="absolute top-0 left-0 m-5 max-w-2xl bg-white p-4 rounded-2xl shadow-lg mb-12 hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out ">
      <button onClick={()=>navigate("/")} className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
        Home
      </button>
            </div>
            <h1 className="text-3xl font-bold mb-6">User Profile</h1>
            <ProfileComponent />
        </div>
    );
};

export default Profile;
