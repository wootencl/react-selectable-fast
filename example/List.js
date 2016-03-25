import React from 'react'
import { createSelectable, SelectAllButton, DeselectAllButton } from '../src'
import Album from './Album'

const SelectableAlbum = createSelectable(Album)

class List extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.items !== this.props.items
  }

  render() {
    return (
      <div>
        <p className="not-selectable">Not selectable text</p>
        <div>
          <SelectAllButton className="selectable-button">
            <button>Select all</button>
          </SelectAllButton>
          <DeselectAllButton className="selectable-button">
            <button>Clear selection</button>
          </DeselectAllButton>
        </div>
        {this.props.items.map((item, i) => (
          <SelectableAlbum
            key={i}
            selectableKey={i}
            title={item.title}
            year={item.year}
          />
        ))}
      </div>
    )
  }
}

export default List
