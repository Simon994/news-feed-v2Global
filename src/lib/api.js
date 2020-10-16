import axios from 'axios'

const baseUrl = 'https://gnews.io/api/v4'
const apiKey = process.env.REACT_APP_MY_API_KEY

export const getEverything = params => {
  
  let queryString = ''
  Object.keys(params).forEach(key => {
    if (params[key]) {
      queryString += `${params[key] ? key + '=' + params[key] + '&' : ''}`
    }
  })
  console.log(`${baseUrl}/everything?${queryString}apiKey=${apiKey}`)
  return axios.get(`${baseUrl}/everything?${queryString}apiKey=${apiKey}`)
}

export const getSources = () => {
  return axios.get(`${baseUrl}/sources?apiKey=${apiKey}`)
}

export const getTopStories = (category) => {
  return axios.get(`${baseUrl}/top-headlines?topic=${category.toLowerCase()}&token=${apiKey}`)
}
