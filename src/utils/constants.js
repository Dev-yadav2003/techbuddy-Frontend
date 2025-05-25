export const Api_Url = import.meta.env.VITE_REACT_APP_API_URL;

fetch(`${Api_Url}/api/users`)
  .then((res) => res.json())
  .then((data) => console.log(data));
