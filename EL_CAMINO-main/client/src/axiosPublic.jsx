import axios from "axios";

export const axiosPublic = axios.create({
    baseURL: "https://elcaminobackend-production.up.railway.app/" || "localhost:3000/"
    //baseURL: "http://localhost:3000/"

})
