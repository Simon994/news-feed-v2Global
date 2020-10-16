import React from 'react'

class NewsCard extends React.Component {

  state = {
    hover: false
  }
  
  goToLink = () => {
    window.open(this.props.url, '_blank')
  }

  hoverAnimate = state => {
    this.setState({ hover: state })
  }

  render() {
    const { title, image, source, author } = this.props

    return (
      <div className={`${image ? 'news-card' : 'news-card-text-only'}`}
        onMouseEnter={() => this.hoverAnimate(true)} onMouseLeave={() => this.hoverAnimate(false)}>
        
        {image && <img src={image} alt="article" />}
        
        <h4>{title}</h4>
        {author && author.length < 20 && <p className='article-info'>Author: {author}</p>}
        <p className='article-info'>Source: {source.name}</p>
        <a className="read-more" onClick={this.goToLink}>Read more</a>
        <div className="shadows">
          <div className={`shadow-1 ${this.state.hover ? 'card-hover' : ''}`}></div>
          <div className={`shadow-2 ${this.state.hover ? 'card-hover' : ''}`}></div>
        </div>
      </div>
    )
  }
}

export default NewsCard