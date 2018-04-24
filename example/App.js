import React, { Component, createRef } from 'react'
import { SelectableGroup } from '../src'
import Counters from './Counters'
import List from './List'

class App extends Component {
  state = {
    disableFirstRow: false,
  }

  countersRef = createRef()

  handleSelecting = selectingItems => {
    this.countersRef.current.handleSelecting(selectingItems)
  }

  handleSelectionFinish = selectedItems => {
    this.countersRef.current.handleSelectionFinish(selectedItems)
  }

  handleSelectionClear() {
    console.log('Cancel selection') // eslint-disable-line no-console
  }

  toggleFirstRow = () => {
    this.setState({ disableFirstRow: !this.state.disableFirstRow })
  }

  render() {
    const { items } = this.props
    const { disableFirstRow } = this.state

    const itemsToRender = disableFirstRow ? items.slice(5) : items

    return (
      <div>
        <Counters ref={this.countersRef} />
        <SelectableGroup
          ref={ref => (window.selectableGroup = ref)}
          className="main"
          clickClassName="tick"
          enableDeselect
          tolerance={0}
          deselectOnEsc={false}
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
