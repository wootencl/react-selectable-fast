import React from 'react'
import Label from './Label.js'

class Album extends React.Component {
  render() {
    const {
      selected,
      selecting,
      title,
      year
    } = this.props

    let classes

    if (selecting) {
      classes = selected ? 'item selected selecting' : 'item selecting'
    } else {
      classes = selected ? 'item selected' : 'item'
    }

    // console.log(`render ${selected} ${selecting}`)
    // console.log(`render Album`)
    if (this.props.selected)
      console.log(JSON.stringify(this.props))

    return (
      <div className={classes}>
        <h2>{title}</h2>
        <small>{year}</small>
        <Label {...this.props} />
      </div>
    )
  }
}

export default Album
