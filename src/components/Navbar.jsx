import { useSelector } from "react-redux";
import { Api_Url } from "../utils/constants";
import { useEffect, useState } from "react";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const [profileImageUrl, setProfileImageUrl] = useState("");

  useEffect(() => {
    if (user) {
      const imageUrl = user.profileImage
        ? user.profileImage.startsWith("http")
          ? user.profileImage
          : `${Api_Url}/uploads/${user.profileImage}`
        : "/download.png";

      setProfileImageUrl(`${imageUrl}?t=${new Date().getTime()}`);
    }
  }, [user]);

  return (
    <nav className="bg-blue-900 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">TechBuddy</div>

      {user && (
        <div className="flex items-center gap-3">
          <img
            src={profileImageUrl || "/default-profile.jpg"}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-white"
            onError={(e) => {
              e.target.src = "/default-profile.jpg";
            }}
          />
          <span>{user.firstName}</span>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
