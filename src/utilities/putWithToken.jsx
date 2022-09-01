import axios from 'axios'

const putWithToken = (endpoint, accessToken, cancelSource, data, method = 'PUT') => {
  const request = async () => {
    const cancelToken = cancelSource.token
    const options = {
      url: endpoint,
      method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json' },
      data,
      cancelToken
    }

    console.log(options)

    let result
    try {
      result = await axios(options)
    } catch (err) {
      if (axios.isCancel(err)) return err
    }
    return result
  }

  return request
}

export default putWithToken
