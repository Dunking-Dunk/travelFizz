import axios from "axios";

export default axios.create({
    baseURL: "https://0b2e-49-249-229-42.ngrok-free.app/api",
    withCredentials: true
});