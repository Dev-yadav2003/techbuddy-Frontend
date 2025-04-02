import React from "react";

const ProfileCard = ({ user }) => {
  return (
    <div className="bg-white shadow-xl w-full max-w-xs  rounded-2xl border-2 overflow-hidden transition-transform duration-200 hover:scale-101 hover:shadow-[0_10px_40px_rgba(255,20,147,0.3),0_10px_40px_rgba(30,144,255,0.3)] z-10">
      <div className=" w-full  ">
        <img
          className="w-full h-80 object-fill"
          src={user?.profile}
          alt="User"
        />
        <div className=" inset-0 bg-black bg-opacity-20"></div>
      </div>

      <div className="p-5 text-gray-900">
        <h2 className="text-2xl font-bold text-gray-800">
          {user?.firstName} {user?.lastName}
        </h2>
        <p className="text-gray-600 mt-2 italic truncate">{user?.about}</p>
        <p className="text-gray-600 mt-2 italic truncate">{user?.skills}</p>
        <p className="text-gray-600 mt-2 italic truncate">{user?.age}</p>
        <p className="text-gray-600 mt-2 italic truncate">{user?.gender}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
