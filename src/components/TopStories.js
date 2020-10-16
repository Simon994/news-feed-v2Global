import React from 'react'

import NewsCard from './NewsCard'
import SubNavBtns from './SubNavBtns'
import { getTopStories } from '../lib/api'

class TopStories extends React.Component{
  state= {
    stories: null,
    subselected: 'Breaking-news',
    loading: true
  }

  async componentDidMount() {
    const response = await getTopStories('breaking-news')
    
    this.setState({
      stories: response.data,
      loading: false
    })
  }

  handleClick = event =>{
    const subselected = event.target.textContent
    
    this.setState({
      subselected: subselected
    })
    
    this.handleLoad(event)
  }

  handleLoad = async event =>{
    const response = await getTopStories(event.target.textContent)
    
    this.setState({
      stories: response.data,
      loading: false
    })
  }

  render(){
    
    return (
      <>
        <section id={!this.state.loading ? 'topstories-loading' : ''}>
          <div className="header"></div>
          <div className="top-categories" aria-label="sub navigation">
            <div className="sub-navbar">
              <SubNavBtns isSubSelected={this.state.subselected} onClick={this.handleClick} className="button is-large"/>
            </div>
            <h2>top stories</h2>
            <h3>from around the world</h3>
          </div>
          <div className='outer-top-stories'>
            <div className="loading" id={this.state.loading ? 'is-loading' : ''}>LOADING</div>
            <div className="news-grid">
              {this.state.stories && this.state.stories.articles.map((article, i) => <NewsCard key={i} {...article} />)}
            </div>
          </div> 
        </section>
      </>
    )
  }


}

export default TopStories