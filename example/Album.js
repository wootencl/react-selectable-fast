import React from 'react'
import Label from './Label.js'

const Album = ({ selected, selecting, title, year }) => (
  <div className={`item ${selecting && 'selecting'} ${selected && 'selected'}`}>
    <div className="tick">V</div>
    <h2>{title}</h2>
    <small>{year}</small>
    <Label selected={selected} selecting={selecting} />
  </div>
)

export default Album
