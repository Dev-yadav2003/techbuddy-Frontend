import { useSelector } from "react-redux";
import Editprofile from "./Editprofile";

const Profile = () => {
  const user = useSelector((store) => store.user);

  return <Editprofile user={user} />;
};

export default Profile;
