import React, { useState, useEffect } from "react";
import ProfileCard from "./ProfileCard";
import axios from "axios";
import { Api_Url } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/appSlice";

const EditProfile = ({ user }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    skills: "",
    age: "",
    gender: "",
    about: "",
  });
  const [profileFile, setProfileFile] = useState(null);
  const [profileImage, setProfileImage] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        skills: user.skills || "",
        age: user.age || "",
        gender: user.gender || "",
        about: user.about || "",
      });

      const imageUrl = user.profile
        ? `${Api_Url}/uploads/${user.profile.replace(/\\/g, "/")}`
        : "";
      setProfileImage(imageUrl);
    }
  }, [user]);

  const saveProfile = async () => {
    setError("");
    try {
      const formDataToSend = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      if (profileFile) {
        formDataToSend.append("profile", profileFile);
      }

      const res = await axios.patch(`${Api_Url}/profile/edit`, formDataToSend, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updatedUser = res.data.user;

      dispatch(addUser(updatedUser));

      const newImageUrl = updatedUser.profile
        ? `${Api_Url}/uploads/${updatedUser.profile.replace(/\\/g, "/")}`
        : "";
      setProfileImage(newImageUrl);
      setProfileFile(null);
      setToast(true);
      setTimeout(() => setToast(false), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update profile");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match(/image\/(jpeg|jpg|png)/i)) {
      setError("Only JPEG/JPG and PNG images are allowed");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be smaller than 5MB");
      return;
    }

    setError("");
    setProfileFile(file);
    setProfileImage(URL.createObjectURL(file));
  };

  return (
    <>
      <div className="text-4xl text-center font-extrabold text-blue-900">
        Edit Your Profile
      </div>
      <div className="flex justify-center gap-10 w-full">
        <div className="flex flex-col items-center w-full">
          <div className="flex flex-col md:w-full w-3/4 gap-6 mt-10 border-2 border-blue-500 p-6 rounded-lg shadow-lg">
            <Input
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <Input
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
            <Input
              label="Skills"
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
            />
            <Input
              label="Age"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
            />
            <Input
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
            />

            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold text-blue-900">
                Profile Image
              </label>
              <label className="flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-dashed border-blue-300 cursor-pointer hover:bg-blue-50">
                <div className="flex flex-col items-center justify-center">
                  <p className="mt-2 text-sm text-gray-600">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                </div>
                <input
                  type="file"
                  accept="image/jpeg, image/jpg, image/png"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
              {profileFile && (
                <p className="text-sm text-green-600">
                  {profileFile.name} selected
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold text-blue-900">
                About
              </label>
              <textarea
                name="about"
                className="textarea bg-blue-700 text-white p-3 rounded-lg h-24"
                value={formData.about}
                onChange={handleInputChange}
              />
            </div>
            <p className="text-red-500">{error}</p>
            <button
              className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
              onClick={saveProfile}
            >
              Save Changes
            </button>
          </div>
        </div>
        <div className="mt-[6vh] hidden md:block w-full">
          <ProfileCard
            user={{
              ...formData,
              profile: profileImage,
            }}
          />
        </div>
      </div>
      {toast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

const Input = ({ label, name, value, onChange }) => (
  <div className="flex flex-col gap-2">
    <label className="text-lg font-semibold text-blue-900">{label}</label>
    <input
      type="text"
      name={name}
      className="input w-full bg-blue-700 text-white p-3 rounded-lg"
      value={value}
      onChange={onChange}
    />
  </div>
);

export default EditProfile;
