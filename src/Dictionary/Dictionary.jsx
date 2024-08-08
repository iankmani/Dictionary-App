import React from 'react'
import './Dictionary.css'

const Dictionary = () => {
  return (
    <div className='Dictionary-page'>
        <div className="dictionary-header">
            <h1>Dictionary</h1>
        </div>
        <div className="content-place">
            <p>Search for any word you want</p>
        </div>
        <div className="dictionary-view">
            <label>Word:</label>
            <input type="text" />
            <button>Search</button>
        </div>
        <div className="defionitions">
            <p>meanings</p>
        </div>
    </div>
  )
}

export default Dictionary