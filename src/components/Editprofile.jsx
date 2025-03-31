import React, { useState, useEffect } from "react";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [skills, setSkills] = useState(user?.skills || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [profile, setProfile] = useState(user?.profile || "");
  const [about, setAbout] = useState(user?.about || "");

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setSkills(user.skills || "");
      setAge(user.age || "");
      setGender(user.gender || "");
      setProfile(user.profile || "");
      setAbout(user.about || "");
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="text-4xl md:text-5xl font-extrabold text-blue-900">
        Edit Your Profile
      </div>
      <div className="flex flex-col gap-6 mt-10 border-2 w-4/5 lg:w-2/5 border-blue-500 p-6 rounded-lg shadow-lg">
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
          <label className="text-lg font-semibold text-blue-900">Skills</label>
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
            type="number"
            placeholder="Enter age"
            className="input w-full bg-blue-700 text-white p-3 rounded-lg"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold text-blue-900">Gender</label>
          <input
            type="text"
            placeholder="Enter gender"
            className="input w-full bg-blue-700 text-white p-3 rounded-lg"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold text-blue-900">Profile</label>
          <input
            type="text"
            placeholder="Enter profile info"
            className="input w-full bg-blue-700 text-white p-3 rounded-lg"
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold text-blue-900">About</label>
          <textarea
            placeholder="Tell us about yourself"
            className="textarea w-full bg-blue-700 text-white p-3 rounded-lg h-24"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
        </div>

        <button className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
