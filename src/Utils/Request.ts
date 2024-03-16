import axios from "axios";

const api_url = "https://search.imdbot.workers.dev";

export default axios.create({
    baseURL: api_url,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});
