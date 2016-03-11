import React from 'react'
import { createSelectable, SelectAllButton, DeselectAllButton } from 'react-selectable-extended'
import Album from './Album'

const SelectableAlbum = createSelectable(Album)

class List extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.items !== this.props.items
  }

  render() {
    return (
      <div>
        <p>omg</p>
        <SelectAllButton>
          <button>Select all</button>
        </SelectAllButton>
        <DeselectAllButton>
          <button>Clear selection</button>
        </DeselectAllButton>
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
