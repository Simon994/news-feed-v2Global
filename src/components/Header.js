import React from 'react'
import logo from '../images/feed-large-3page.png'

const Header = ({ feedActive, loading }) => {
  return (
    <>
      <div className="header"></div>
      <div className='heroe' id={loading ? 'hero-loading' : ''}>
        <div className="title">
          <em>News Feed v2-Global</em>
          <img src={logo} alt='Newsfeed logo'/>
        </div>
        <p className="subtitle">browse - create - curate<br /> your own personalised news</p>
        {feedActive
          ? <div className="loading" id={loading ? 'is-loading' : ''}>LOADING</div>
          : <div className="feed-empty">
            <h3>Your feed is empty right now <br /> Browse to add</h3>
          </div>}
      </div>
    </>
  )
}

export default Header