import React from 'react'

import NewsCard from './NewsCard'
import { countryCodes } from '../lib/countryCodes'

class SectionScroll extends React.Component {

  state = {
    collapsed: false
  }

  collapseSection = () => {
    this.setState({ collapsed: true })
  }

  render() {
    const { query, type, removeSub } = this.props
    console.log('COMING INTO RENDER HERE, here is the query:', query)

    let source = 'global'
    let keyword = query.q

    if (type === 'source'){
      const keywordSourcePair = query.q.split(', ')
      keyword = keywordSourcePair[0]
      source = keywordSourcePair[1]
    
      console.log('RENDER THE SOURCE AND KEYWORD for SectionSCROLL', source, keyword) 
      const countryObjToFind = countryCodes.filter(country => country.name === source)
      console.log('FOUND THIS MATCHING COUNTRY', countryObjToFind[0].id)
      source = countryObjToFind[0].id
    }
    
    

    return (
      <div className={`section-container ${this.state.collapsed ? 'collapsed' : ''}`}>
        <div className="keyword-heading">
          {keyword.toUpperCase()} from {source.toUpperCase()}
          <span onClick={() => {
            this.collapseSection()
            removeSub(type, query.q)
          }}>remove</span></div>
        <div className="section-scroll">
          <div className='news-scroll'>
            {query.articles.map((article, i) => <NewsCard key={i} {...article} />)}
          </div>
        </div>
      </div>
    )
  }
}

export default SectionScroll