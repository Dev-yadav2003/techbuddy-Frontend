import { getImageUrl, handleImageError } from "../utils/api";
import { capitalize, toSkillList } from "../utils/format";

// One row in the Connections / Requests lists. Action buttons go in children.
const UserListItem = ({ user, children }) => {
  const { firstName, lastName, age, gender, about, skills, profile } = user;
  const meta = [age && `${age} yrs`, capitalize(gender)]
    .filter(Boolean)
    .join(" · ");
  const skillList = toSkillList(skills);

  return (
    <div className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition-shadow">
      <div className="card-body p-4 sm:p-5 flex-col sm:flex-row items-center gap-4">
        <div className="avatar shrink-0">
          <div className="w-20 rounded-full ring ring-base-300 ring-offset-2 ring-offset-base-100">
            <img
              src={getImageUrl(profile)}
              onError={handleImageError}
              alt={`${firstName}'s profile`}
            />
          </div>
        </div>

        <div className="flex-1 min-w-0 text-center sm:text-left">
          <h2 className="text-lg font-semibold">
            {firstName} {lastName}
          </h2>
          {meta && <p className="text-sm text-base-content/60">{meta}</p>}
          {about && (
            <p className="text-sm text-base-content/80 mt-1 line-clamp-2">
              {about}
            </p>
          )}
          {skillList.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2 justify-center sm:justify-start">
              {skillList.map((skill) => (
                <span key={skill} className="badge badge-ghost badge-sm">
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        {children && <div className="flex gap-2 shrink-0">{children}</div>}
      </div>
    </div>
  );
};

export default UserListItem;
