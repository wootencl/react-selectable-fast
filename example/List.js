import React, { Component, PropTypes } from 'react'
import { createSelectable, SelectAll, DeselectAll } from '../src'
import Album from './Album'

const SelectableAlbum = createSelectable(Album)

class List extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.items !== this.props.items
  }

  render() {
    return (
      <div>
        <p className="not-selectable">Not selectable text</p>
        <div>
          <SelectAll className="selectable-button">
            <button>Select all</button>
          </SelectAll>
          <DeselectAll className="selectable-button">
            <button>Clear selection</button>
          </DeselectAll>
        </div>
        {this.props.items.map((item, i) => (
          <SelectableAlbum
            key={i}
            title={item.title}
            year={item.year}
          />
        ))}
      </div>
    )
  }
}

export default List
