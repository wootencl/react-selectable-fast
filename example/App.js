import React from 'react'
import { SelectableGroup, createSelectable } from 'react-selectable-extended'
import Album from './Album'
import List from './List'

const isNodeInRoot = (node, root) => {
  while (node) {
    if (node === root) {
      return true
    }
    node = node.parentNode
  }

  return false
}

const SelectableAlbum = createSelectable(Album)

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedItems: [],
      selectingItems: [],
      tolerance: 0,
      distance: 0,
    }

    this.handleSelection = this.handleSelection.bind(this)
    this.handleSelecting = this.handleSelecting.bind(this)
    this.handleToleranceChange = this.handleToleranceChange.bind(this)
  }

  handleSelecting(keys) {
    this.setState({
      selectingItems: keys,
    })
    // this.setState({
    //   selectingItems: keys,
    //   selectedItems: this.state.selectedItems,
    // })
  }

  handleSelection(keys) {
    this.setState({
      selectedItems: keys,
      selectingItems: this.state.selectingItems,
    })
  }

  handleToleranceChange(e) {
    this.setState({
      tolerance: parseInt(e.target.value, 10),
    })
  }

  render() {
    return (
      <div>
        <h1 style={{ height: '300px' }}>React Selectable Extended Demo</h1>
        <p>Selecting: {this.state.selectingItems.length}</p>
        <SelectableGroup
          className="main"
          // onSelection={this.handleSelection}
          duringSelection={this.handleSelecting}
          tolerance={this.state.tolerance}
          globalMouse={this.state.isGlobal}
          distance={this.state.distance}
          dontClearSelection={Boolean(true)}
        >
          <List items={this.props.items} />
        </SelectableGroup>
      </div>

    );
  }
}

export default App

        // <div className="sidebar">
        //  <div className="info">
        //    <strong>Tolerance</strong>: <span>{this.state.tolerance}</span><br/>
        //    <em>The number of pixels that must be in the bounding box in order for an item to be selected.</em>
        //    <p><input type="range" min="0" max="50" step="1" onChange={this.handleToleranceChange} value={this.state.tolerance} /></p>
        //
        //    {this.state.selectedItems.length > 0 &&
        //      <h3>You have selected the following items:</h3>
        //    }
        //    {this.state.selectedItems.length === 0 &&
        //      <p>Please select some items from the right by clicking and dragging a box around them.</p>
        //    }
        //    <ul>
        //    {this.state.selectedItems.map(function (key,i) {
        //      return <li key={i}>{this.props.items[key].title}</li>
        //    }.bind(this))}
        //    </ul>
        //  </div>
        // </div>
        //
