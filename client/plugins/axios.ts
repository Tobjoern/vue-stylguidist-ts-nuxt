
export default function ({ $axios }) {
  if (process.client) {
    // $axios.defaults.baseURL = Env.getFullApiUrl()
  }
}
