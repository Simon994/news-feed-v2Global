import React from 'react'
import { getEverything, getSources } from '../lib/api'
import { saveKeyword, saveSource } from '../lib/feed'
import { popupNotification } from '../lib/notifications'
import { countryCodes } from '../lib/countryCodes'

import NewsCard from './NewsCard'
import Filter from './Filter'

class Browse extends React.Component {
  
  state = {
    params: {
      q: '',
      source: '',
      sourceName: '' 
    },
    sources: null,
    articles: null,
    suggestions: '',
    formActive: true
  }

  componentDidMount() {
    // const response = await getSources()
    this.setState({ 
      sources: countryCodes
    })
  }
  
  findMatchingSources(wordSearched) {
    
    return this.state.sources.filter(source => {
      // Remove illegal regex characters
      // const illegalChars = ['(', ')', '[', ']']
      // illegalChars.map(char => wordSearched = wordSearched.replaceAll(char, ''))
      
      return wordSearched.split(' ').every(word => source.id.match(new RegExp(word, 'i')))
    }).map(source => source.id)
  }
  
  handleSubmit = async (event) => {
    event.preventDefault()
    
    
    
    
    // Show error message to user if invalid source
    if (this.state.params.sourceName !== '' && this.state.params.source === '') {
      popupNotification('No source matching that name')
      return
    }
    this.toggleForm(false)

    const response = await getEverything({ ...this.state.params })
    this.setState({ 
      articles: response.data.articles
    })
  }

  toggleForm = (state) => {
    this.setState({ formActive: state })
  }

  handleChange = event => {

    const params = {
      ...this.state.params,
      [event.target.name]: event.target.value
    }

    console.log('PARAMS:', params)
    
    let suggestions = this.state.suggestions
    if (event.target.name === 'sourceName' && this.state.sources) {
      // Remove matched source if user edits the input field
      params.source = ''
      suggestions = this.findMatchingSources(event.target.value)

      if (!event.target.value){
        suggestions = ''
      }
    }
    
    this.setState({ params, suggestions })
  }

  handleAutocomplete = event => {
    let source, sourceName
    // Find matching object in sources and save id and name to params
    for (let i = 0; i < this.state.sources.length; i++) {
      if (this.state.sources[i].id === event.target.innerHTML) {
        source = this.state.sources[i].name
        sourceName = this.state.sources[i].id
      }
    }

    this.setState({
      params: { ...this.state.params, source, sourceName } })
  }

  // Hide autocomplete when input loses focus
  handleBlur = () => {
    // On delay timer so that it doesnt prevent onClick from firing on the item
    setTimeout(() => this.setState({ suggestions: null }), 150)
  }

  addToFeed = param => {
    if (param === 'q') saveKeyword(this.state.params.q)
    if (param === 'source') saveSource(this.state.params.source)
    
    popupNotification('Added in Feed')
  }

  render() {
    return (
      <>
        <div className="header"></div>

        <Filter params={this.state.params}
          suggestions={this.state.suggestions}
          formActive={this.state.formActive}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleAutocomplete={this.handleAutocomplete}
          handleBlur={this.handleBlur}
          toggleForm={this.toggleForm}
          addToFeed={this.addToFeed} />
          
        <div className="news-grid">
          {this.state.articles && this.state.articles.map((article, i) => <NewsCard key={i} {...article}/> )}
        </div>

      </>
    )
  }
}

export default Browse