import axios from 'axios'

const baseUrl = 'https://gnews.io/api/v4'
const apiKey = process.env.REACT_APP_MY_API_KEY

export const getEverything = params => {
  
  const { q, source } = params

  const newParams = { 
    q: q,
    country: source
  }

  let queryString = ''
  Object.keys(newParams).forEach(key => {
    if (newParams[key]) {
      queryString += `${newParams[key] ? key + '=' + newParams[key] + '&' : ''}`
    }
  })
  console.log(`${baseUrl}/search?${queryString}token=${apiKey}`)
  return axios.get(`${baseUrl}/search?${queryString}token=${apiKey}`)
}

export const getSources = () => {
  return axios.get(`${baseUrl}/sources?apiKey=${apiKey}`)
}

export const getTopStories = (category) => {
  return axios.get(`${baseUrl}/top-headlines?topic=${category.toLowerCase()}&token=${apiKey}`)
}
