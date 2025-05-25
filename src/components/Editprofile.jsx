import React, { useState, useEffect } from "react";
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
  const [loading, setLoading] = useState(false);
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

      const imageUrl = user.profileImageUrl
        ? `${Api_Url}${user.profileImageUrl}`
        : "";
      setProfileImage(imageUrl);
    }
  }, [user]);

  const saveProfile = async () => {
    setError("");
    setLoading(true);

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
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        const updatedUser = res.data.user;
        dispatch(addUser(updatedUser));

        const newImageUrl = updatedUser.profileImageUrl
          ? `${Api_Url}${updatedUser.profileImageUrl}`
          : "";
        setProfileImage(newImageUrl);

        setProfileFile(null);
        setToast(true);
        setTimeout(() => setToast(false), 3000);
      } else {
        setError(res.data.error || "Failed to update profile");
      }
    } catch (err) {
      console.error("Profile update error:", err);
      setError(err.response?.data?.error || "Failed to update profile");
    } finally {
      setLoading(false);
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
      <div className="flex flex-col md:flex-row justify-center gap-10 w-full p-4">
        <div className="flex flex-col items-center w-full md:w-1/2">
          <div className="flex flex-col w-full gap-6 mt-10 border-2 border-blue-500 p-6 rounded-lg shadow-lg">
            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold text-blue-900">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                className="input w-full bg-blue-700 text-white p-3 rounded-lg"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold text-blue-900">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                className="input w-full bg-blue-700 text-white p-3 rounded-lg"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold text-blue-900">
                Skills
              </label>
              <input
                type="text"
                name="skills"
                className="input w-full bg-blue-700 text-white p-3 rounded-lg"
                value={formData.skills}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold text-blue-900">Age</label>
              <input
                type="text"
                name="age"
                className="input w-full bg-blue-700 text-white p-3 rounded-lg"
                value={formData.age}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold text-blue-900">
                Gender
              </label>
              <input
                type="text"
                name="gender"
                className="input w-full bg-blue-700 text-white p-3 rounded-lg"
                value={formData.gender}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold text-blue-900">
                Profile Image
              </label>
              <div className="flex items-center gap-4">
                {profileImage && (
                  <img
                    src={profileImage}
                    alt="Profile Preview"
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-300"
                  />
                )}
                <label className="flex flex-col items-center px-4 py-3 bg-white rounded-lg border-2 border-dashed border-blue-300 cursor-pointer hover:bg-blue-50">
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
              </div>
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

            {error && <p className="text-red-500">{error}</p>}

            <button
              className={`w-full bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={saveProfile}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        <div className="mt-10 w-full md:w-1/3">
          <div className="border-2 border-blue-500 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-blue-900 mb-4">
              Profile Preview
            </h3>
            <div className="flex flex-col items-center">
              {profileImage && (
                <img
                  src={profileImage}
                  alt="Profile Preview"
                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-300 mb-4"
                />
              )}
              <h2 className="text-2xl font-bold">
                {formData.firstName} {formData.lastName}
              </h2>
              <p className="text-gray-600">{formData.skills}</p>
              <div className="mt-4 text-left w-full">
                <p>
                  <span className="font-semibold">Age:</span> {formData.age}
                </p>
                <p>
                  <span className="font-semibold">Gender:</span>{" "}
                  {formData.gender}
                </p>
                <p className="mt-2">
                  <span className="font-semibold">About:</span>
                </p>
                <p className="whitespace-pre-line">{formData.about}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-out">
          Profile saved successfully!
        </div>
      )}
    </>
  );
};

export default EditProfile;
