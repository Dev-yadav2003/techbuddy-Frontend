import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import UserCard from "./UserCard";
import { api, getErrorMessage } from "../utils/api";
import { addUser } from "../utils/appSlice";

const ABOUT_MAX = 300;

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [skills, setSkills] = useState(
    Array.isArray(user.skills) ? user.skills.join(", ") : "",
  );
  const [age, setAge] = useState(user.age ?? "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!imageFile) {
      setImagePreview("");
      return;
    }
    const url = URL.createObjectURL(imageFile);
    setImagePreview(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(false), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const saveProfile = async (e) => {
    e.preventDefault();
    setError("");
    if (firstName.trim().length < 2) {
      setError("First name must be at least 2 characters");
      return;
    }
    if (imageFile && imageFile.size > 5 * 1024 * 1024) {
      setError("Profile image must be smaller than 5 MB");
      return;
    }

    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("skills", skills);
      formData.append("age", age);
      formData.append("gender", gender);
      formData.append("about", about);
      if (imageFile) {
        formData.append("profileImage", imageFile);
      }

      const res = await api.patch("/profile/edit", formData);
      dispatch(addUser(res.data.data));
      setImageFile(null);
      setToast(true);
    } catch (err) {
      setError(getErrorMessage(err, "Could not save your profile"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold">Edit your profile</h1>
        <p className="text-base-content/60 mt-1">
          This is how other developers see you on their feed.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-start">
        <form
          onSubmit={saveProfile}
          className="card bg-base-100 border border-base-300 shadow-sm"
        >
          <div className="card-body gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="form-control">
                <span className="label-text font-medium mb-1">First name</span>
                <input
                  type="text"
                  className="input input-bordered"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <label className="form-control">
                <span className="label-text font-medium mb-1">Last name</span>
                <input
                  type="text"
                  className="input input-bordered"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
              <label className="form-control">
                <span className="label-text font-medium mb-1">Age</span>
                <input
                  type="number"
                  min="13"
                  max="150"
                  className="input input-bordered"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>
              <label className="form-control">
                <span className="label-text font-medium mb-1">Gender</span>
                <select
                  className="select select-bordered"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Prefer not to say</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </label>
            </div>

            <label className="form-control">
              <span className="label-text font-medium mb-1">Skills</span>
              <input
                type="text"
                className="input input-bordered"
                placeholder="React, Node.js, MongoDB"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
              <span className="label-text-alt text-base-content/60 mt-1">
                Separate skills with commas (max 10)
              </span>
            </label>

            <label className="form-control">
              <span className="label-text font-medium mb-1">About</span>
              <textarea
                className="textarea textarea-bordered h-28"
                placeholder="Tell other developers about yourself"
                maxLength={ABOUT_MAX}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>
              <span className="label-text-alt text-base-content/60 mt-1 text-right">
                {about.length}/{ABOUT_MAX}
              </span>
            </label>

            <label className="form-control">
              <span className="label-text font-medium mb-1">Profile photo</span>
              <input
                type="file"
                accept="image/png, image/jpeg, image/webp, image/gif"
                className="file-input file-input-bordered w-full"
                onChange={(e) => setImageFile(e.target.files[0] || null)}
              />
              <span className="label-text-alt text-base-content/60 mt-1">
                JPG, PNG, WEBP or GIF, up to 5 MB
              </span>
            </label>

            {error && (
              <div role="alert" className="alert alert-error py-2 text-sm">
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary mt-2"
              disabled={saving}
            >
              {saving && <span className="loading loading-spinner"></span>}
              Save changes
            </button>
          </div>
        </form>

        <div className="lg:sticky lg:top-24 flex flex-col items-center gap-2">
          <span className="text-sm font-medium text-base-content/60">
            Preview
          </span>
          <UserCard
            preview
            user={{
              firstName,
              lastName,
              gender,
              age,
              about,
              skills,
              profile: imagePreview || user.profile,
            }}
          />
        </div>
      </div>

      {toast && (
        <div className="toast toast-top toast-center z-[70]">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
