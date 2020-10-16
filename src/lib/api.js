import axios from 'axios'

const baseUrl = 'https://newsapi.org/v2'
const apiKey = process.env.REACT_APP_MY_API_KEY

export const getEverything = params => {
  
  let queryString = ''
  Object.keys(params).forEach(key => {
    if (params[key]) {
      queryString += `${params[key] ? key + '=' + params[key] + '&' : ''}`
    }
  })
  
  return axios.get(`${baseUrl}/everything?${queryString}apiKey=${apiKey}`)
}

export const getSources = () => {
  return axios.get(`${baseUrl}/sources?apiKey=${apiKey}`)
}

export const getTopStories = (category) => {
  return axios.get(`${baseUrl}/top-headlines?category=${category.toLowerCase()}&pageSize=15&apiKey=${apiKey}`)
}
