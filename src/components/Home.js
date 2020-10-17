import React from 'react'

import { getKeywords, getSources, removeSubscription } from '../lib/feed'
import { getEverything } from '../lib/api'
import Header from './Header'
import SectionScroll from './SectionScroll'

class Home extends React.Component {

  state = {
    keywords: null,
    sources: null,
    loading: true,
    feedActive: false
  }

  async componentDidMount() {
    this.getSubs()
    this.setState({ feedActive: getKeywords() || getSources() })
  }

  getSubs = async () => {

    const keywords = getKeywords()
    if (keywords) {
      const keywordsObj = await this.getArticlesByKeyword(keywords, 'q')
      this.setState({ keywords: keywordsObj })
    } else {
      this.setState({ keywords: null })
    }
    
    const sources = getSources()
    if (sources) {
      const sourcesObj = await this.getArticlesBySource(sources, 'source')
      this.setState({ sources: sourcesObj, loading: false })
    } else {
      this.setState({ sources: null, loading: false })
    }
  }


  async getArticlesByKeyword(keywords){
    const queryObj = []

    for (let i = 0; i < keywords.length; i++) {
      const keyword = keywords[i]
      const response = await getEverything({ q: keyword, source: '' })
      queryObj.push({ q: keyword, articles: response.data.articles })
    }

    return queryObj
  }

  async getArticlesBySource(sources){
    const queryObj = []

    for (let i = 0; i < sources.length; i++) {
      const keywordSourcePair = sources[i].split(', ')
      const keyword = keywordSourcePair[0]
      const source = keywordSourcePair[1]

      const response = await getEverything({ q: keyword, source: source })
      queryObj.push({ q: `${keyword}, ${source}`, articles: response.data.articles })
    }

    return queryObj
  }


  removeSub = (type, query) => {
    removeSubscription(type, query)
    this.setState({ feedActive: getKeywords() || getSources() })
  }


  render() {
    return (
      <>
        <Header feedActive={this.state.feedActive} loading={this.state.loading} />
        {this.state.sources &&
          this.state.sources.map((source, i) => <SectionScroll key={i} query={source} type="source" removeSub={this.removeSub} />)}
        {this.state.keywords &&
          this.state.keywords.map((keyword, i) => <SectionScroll key={i} query={keyword} type="keyword" removeSub={this.removeSub} />)}
      </>
    )
  }
}

export default Home