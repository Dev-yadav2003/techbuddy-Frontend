import { useSelector } from "react-redux";
import { Api_Url } from "../utils/constants";

const Navbar = () => {
  const user = useSelector((store) => store.user);

  return (
    <nav className="bg-blue-900 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">TechBuddy</div>

      {user && (
        <div className="flex items-center gap-3">
          <img
            src={
              user.profileImageUrl
                ? `${Api_Url}${user.profileImageUrl}`
                : "/default-profile.jpg"
            }
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
