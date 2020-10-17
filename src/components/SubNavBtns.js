import React from 'react'

const SubNavBtns = (props) => {

  const btnCategories = ['Breaking-news', 'Business', 'Technology', 'Entertainment', 'Health', 'Sports']

  return (
    btnCategories.map((category, i) => {
      return <button key={i} onClick={props.onClick}
        className={'button is-large subnav-btn'} 
        id={`${props.isSubSelected === category ? 'is-subselected' : ''}`}
      >
        {category}
      </button>
    })
  )  
}

export default SubNavBtns

