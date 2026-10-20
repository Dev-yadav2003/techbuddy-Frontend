// Skills come back from the API as an array, but the edit form keeps them
// as a comma-separated string.
export const toSkillList = (skills) =>
  (Array.isArray(skills) ? skills : String(skills || "").split(","))
    .map((s) => s.trim())
    .filter(Boolean);

export const capitalize = (text) =>
  text ? text.charAt(0).toUpperCase() + text.slice(1) : "";
