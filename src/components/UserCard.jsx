import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import {
  api,
  getErrorMessage,
  getImageUrl,
  handleImageError,
} from "../utils/api";
import { capitalize, toSkillList } from "../utils/format";

const SWIPE_THRESHOLD = 120;

// Swipeable profile card for the feed. With `preview` it is a static card
// (used on the edit profile page).
const UserCard = ({ user, preview = false }) => {
  const dispatch = useDispatch();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-250, 250], [-12, 12]);
  const likeOpacity = useTransform(x, [20, SWIPE_THRESHOLD], [0, 1]);
  const nopeOpacity = useTransform(x, [-SWIPE_THRESHOLD, -20], [1, 0]);

  const { _id, firstName, lastName, age, gender, about, skills, profile } =
    user;
  const skillList = toSkillList(skills);
  const meta = [age && `${age} yrs`, capitalize(gender)]
    .filter(Boolean)
    .join(" · ");

  const sendRequest = async (status) => {
    if (preview || busy) return;
    setBusy(true);
    setError("");
    try {
      await api.post(`/request/send/${status}/${_id}`);
      dispatch(removeUserFromFeed(_id));
    } catch (err) {
      // 409 means we already interacted with this user; just move on.
      if (err.response?.status === 409) {
        dispatch(removeUserFromFeed(_id));
      } else {
        setError(getErrorMessage(err));
        setBusy(false);
      }
    }
  };

  const handleDragEnd = (event, info) => {
    if (info.offset.x < -SWIPE_THRESHOLD) sendRequest("ignored");
    else if (info.offset.x > SWIPE_THRESHOLD) sendRequest("intrested");
  };

  return (
    <motion.div
      className={`card w-full max-w-sm bg-base-100 shadow-xl border border-base-300 overflow-hidden select-none ${
        preview ? "" : "cursor-grab active:cursor-grabbing"
      }`}
      style={preview ? undefined : { x, rotate }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      drag={preview || busy ? false : "x"}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
    >
      <figure className="relative h-80 bg-base-200">
        <img
          className="h-full w-full object-cover pointer-events-none"
          src={getImageUrl(profile)}
          onError={handleImageError}
          alt={`${firstName || "User"}'s profile`}
          draggable={false}
        />
        {!preview && (
          <>
            <motion.span
              style={{ opacity: likeOpacity }}
              className="absolute top-6 left-6 -rotate-12 border-4 border-success text-success font-extrabold text-2xl px-3 rounded-lg bg-base-100/80"
            >
              CONNECT
            </motion.span>
            <motion.span
              style={{ opacity: nopeOpacity }}
              className="absolute top-6 right-6 rotate-12 border-4 border-error text-error font-extrabold text-2xl px-3 rounded-lg bg-base-100/80"
            >
              SKIP
            </motion.span>
          </>
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-5 pt-16 text-white">
          <h2 className="text-2xl font-bold leading-tight">
            {firstName} {lastName}
          </h2>
          {meta && <p className="text-sm opacity-90">{meta}</p>}
        </div>
      </figure>

      <div className="card-body gap-3 p-5">
        {about && <p className="text-base-content/80">{about}</p>}
        {skillList.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {skillList.map((skill) => (
              <span key={skill} className="badge badge-primary badge-outline">
                {skill}
              </span>
            ))}
          </div>
        )}
        {error && <p className="text-error text-sm">{error}</p>}

        {!preview && (
          <div className="grid grid-cols-2 gap-3 mt-2">
            <button
              className="btn btn-outline btn-error"
              disabled={busy}
              onClick={() => sendRequest("ignored")}
            >
              Skip
            </button>
            <button
              className="btn btn-success"
              disabled={busy}
              onClick={() => sendRequest("intrested")}
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default UserCard;
