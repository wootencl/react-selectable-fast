import React, { Component } from 'react'
import { SelectableGroup } from '../src'
import List from './List'

class App extends Component {
  state = {
    selectedItems: [],
    selectingItems: [],
    tolerance: 0,
    disableFirstRow: false,
  }

  handleSelecting = selectingItems => {
    this.setState({ selectingItems })
  }

  handleSelectionFinish = selectedItems => {
    this.setState({
      selectedItems,
      selectingItems: [],
    })
    console.log(`Finished selection ${selectedItems.length}`)
  }

  handleSelectionClear() {
    console.log('Cancel selection')
  }

  toggleFirstRow = () => {
    this.setState({ disableFirstRow: !this.state.disableFirstRow })
  }

  render() {
    const { items } = this.props

    const {
      selectedItems,
      selectingItems,
      tolerance,
      isGlobal,
      disableFirstRow,
    } = this.state

    const itemsToRender = disableFirstRow ? items.slice(5) : items

    return (
      <div>
        <p>
          Selecting: <span className="counter">{selectingItems.length}</span>
          <br />
          Selected: <span className="counter">{selectedItems.length}</span>
          <br />
          <br />
          <button onClick={this.toggleFirstRow}>Toggle first row</button>
        </p>
        <SelectableGroup
          ref={ref => window.selectableGroup = ref}
          className="main"
          clickClassName="tick"
          enableDeselect
          deselectOnEsc={false}
          tolerance={tolerance}
          globalMouse={isGlobal}
          allowClickWithoutSelected={false}
          duringSelection={this.handleSelecting}
          onSelectionClear={this.handleSelectionClear}
          onSelectionFinish={this.handleSelectionFinish}
          ignoreList={['.not-selectable']}
        >
          <List items={itemsToRender} />
        </SelectableGroup>
      </div>
    )
  }
}

export default App
