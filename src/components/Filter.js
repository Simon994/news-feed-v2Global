import React from 'react'
import image from '../images/feed.jpg'

const Filter = ({ params, suggestions, formActive, 
  handleChange, handleSubmit, handleAutocomplete,
  handleBlur, toggleForm, addToFeed }) => {
  
  const style = {
    position: 'absolute',
    top: '11.25em',
    left: '30px',
    width: 'calc(100% - 60px)',
    zIndex: '1',
    border: !suggestions ? '' : '1px solid lightblue',
    backgroundColor: '#eee',
    margin: '5px auto'
  }
  
  
  return (
    <div className='autocomplete-container'>
      <div className="form-container">
        <form onSubmit={handleSubmit}
          className="query-form"
          autoComplete="off"
          style={{ height: formActive ? '500px' : '0px' }} >
          <div className="field">
            <label className="label">Keyword</label>
            <div className="control">
              <input
                className="input"
                placeholder="Keyword"
                name='q'
                value={params.q}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="field autocomplete-container">
            <label className="label">Country</label>
            <div className="control">
              <input
                className="input"
                placeholder="Start typing to see matching available countries"
                name="sourceName"
                value={params.sourceName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>

          <div className="field">
            <button type="submit" className="button is-fullwidth">SEARCH NEWS</button>
          </div>
        </form>
        {/* ONLY DISPLAY THIS DIV WHEN FORM REDUCES TO 0 HEIGHT */}
        <div className="column is-full query-form">
          <button onClick={() => toggleForm(true)} 
            className="button is-fullwidth">
              BACK TO FILTERS
          </button>
          <div className="current-filters">
            <h2>Current filters</h2>
            {params.q &&
              <button className="sub-btn" onClick={() => addToFeed('q')}>
                <div className="filter-label">{params.q}</div>
                <span>sub<img src={image} alt='subscribe to search'/></span>
              </button>}
            {params.q && params.source &&
              <button className="sub-btn" onClick={() => addToFeed('source')}>
                <div className="filter-label">{params.q} + {params.sourceName}</div>
                <span>sub<img src={image} alt='subscribe to search'/></span>
              </button>}
          </div>
        </div>
        

      </div>
      {suggestions &&
      <div style={style}>
        {suggestions.map((item, i) => {
          return <div className="autocomplete-item" key={i} onClick={handleAutocomplete}>{item}</div>
        })}
      </div>}
    </div>
  )
}

export default Filter