import axios from 'axios'

export default function makeAxiosRequest(endpoint) {
  const source = axios.CancelToken.source()

  const makeRequest = async () => {
    const cancelToken = source.token
    const config = {
      method: 'POST',
      url: process.env.SPOTIFY_CLIENT_ID,
      data: { endpoint },
      withCredentials: true,
      cancelToken
    }
    try {
      // eslint-disable-next-line no-unused-vars
      const result = await axios(config)
    } catch (error) {
      if (axios.isCancel(error)) return error
    }
    // eslint-disable-next-line no-undef
    return result.data
  }

  return [source, makeRequest]
}
