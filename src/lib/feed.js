export const saveKeyword = (keyword) => {
  let list = localStorage.getItem('savedKeywords')
  if (!list) list = keyword
  else if (!list.split(',').includes(keyword)) {
    list = `${list},${keyword}`
  }
  localStorage.setItem('savedKeywords', list)
}

export const getKeywords = () => {
  const list = localStorage.getItem('savedKeywords')
  if (list) return list.split(',')
  return null
}

export const saveSource = (q, source) => {
  let list = localStorage.getItem('savedSources')
  const re = new RegExp(`${q}, ${source}`)
  
  if (!list) list = `${q}, ${source}`
  else if (!list.match(re)) {
    list = `${list}//${q}, ${source}`
  }
  localStorage.setItem('savedSources', list)
}

export const getSources = () => {
  const list = localStorage.getItem('savedSources')
  if (list){
    return list.split('//')
  } 
  return null
}

export const removeSubscription = (type, query) => {
  let itemName
  switch (type) {
    case 'keyword':
      itemName = 'savedKeywords'
      break
    case 'source':
      itemName = 'savedSources'
      break
    default: break
  }
  
  localStorage.setItem(itemName,
    localStorage.getItem(itemName)
      .split('//')
      .filter(item => item !== query)
      .join('//')
  )
}