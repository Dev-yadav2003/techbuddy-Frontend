import React, { useState, useEffect } from "react";
import ProfileCard from "./ProfileCard";
import axios from "axios";
import { Api_Url } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/appSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [skills, setSkills] = useState(user?.skills || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [profile, setProfile] = useState(null);
  const [about, setAbout] = useState(user?.about || "");
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("skills", skills);
      formData.append("age", age);
      formData.append("gender", gender);
      formData.append("about", about);
      if (profile) {
        formData.append("profileImage", profile);
      }

      const res = await axios.patch(`${Api_Url}/profile/edit`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch(addUser(res?.data?.data));
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  useEffect(() => {
    if (user) {
      setFirstName(user?.firstName || "");
      setLastName(user?.lastName || "");
      setSkills(user?.skills || "");
      setAge(user?.age || "");
      setGender(user?.gender || "");
      setAbout(user?.about || "");
    }
  }, [user]);

  return (
    <>
      <div className="text-4xl md:text-5xl font-extrabold text-blue-900 text-center">
        Edit Your Profile
      </div>
      <div className="flex w-full justify-center gap-10">
        <div className="flex flex-col items-center w-full ">
          <div className="flex flex-col md:w-full w-3/4 gap-6 mt-10 border-2 border-blue-500 p-6 rounded-lg shadow-lg">
            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold text-blue-900">
                First Name
              </label>
              <input
                type="text"
                placeholder="Enter first name"
                className="input w-full bg-blue-700 text-white p-3 rounded-lg"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold text-blue-900">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Enter last name"
                className="input w-full bg-blue-700 text-white p-3 rounded-lg"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold text-blue-900">
                Skills
              </label>
              <input
                type="text"
                placeholder="Enter skills"
                className="input w-full bg-blue-700 text-white p-3 rounded-lg"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold text-blue-900">Age</label>
              <input
                type="text"
                placeholder="Enter age"
                className="input bg-blue-700 text-white p-3 rounded-lg"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold text-blue-900">
                Gender
              </label>
              <input
                type="text"
                placeholder="Enter gender"
                className="input w-full bg-blue-700 text-white p-3 rounded-lg"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold text-blue-900">
                Profile Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setProfile(file);
                }}
                className="bg-white text-black p-2 rounded-lg"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold text-blue-900">
                About
              </label>
              <textarea
                placeholder="Tell us about yourself"
                className="textarea w-full bg-blue-700 text-white p-3 rounded-lg h-24"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>
            </div>
            <p className=" text-red-500">{error}</p>
            <button
              className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
              onClick={saveProfile}
            >
              Save Changes
            </button>
          </div>
        </div>
        <div className="mt-[6vh] hidden md:block w-full">
          <ProfileCard
            user={{
              firstName,
              lastName,
              gender,
              age,
              about,
              skills,
              profile: user?.profile,
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

export default EditProfile;
