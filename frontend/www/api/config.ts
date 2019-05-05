import axios from "axios"

// const BASE_URL = "http://api.dev.trialsearch.net/v1"
export const BASE_URL = "http://api.trialsearch.net/v1"

axios.defaults.baseURL = `proxy?url=${BASE_URL}`
