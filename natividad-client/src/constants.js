const apiURL = import.meta.env.VITE_API_URL;
export const HOST = (apiURL && apiURL !== "undefined")
  ? apiURL
  : "https://natividad-webprog-server.vercel.app/api";

export default {
  HOST,
};
