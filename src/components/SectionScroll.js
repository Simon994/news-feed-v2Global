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

    let source = 'global'
    let keyword = query.q

    if (type === 'source'){
      const keywordSourcePair = query.q.split(', ')
      keyword = keywordSourcePair[0]
      source = keywordSourcePair[1]
    
      const countryObjToFind = countryCodes.filter(country => country.name === source)

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