import React, { Component } from 'react'
import autobind from 'autobind-decorator'
import { SelectableGroup } from '../src'
import List from './List'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedItems: [],
      selectingItems: [],
      tolerance: 0,
    }
  }

  @autobind
  handleSelecting(selectingItems) {
    this.setState({ selectingItems })
  }

  @autobind
  handleSelectionFinish(selectedItems) {
    this.setState({
      selectedItems,
      selectingItems: [],
    })
    console.log(`Finished selection ${selectedItems.length}`)
  }

  handleSelectionClear() {
    console.log('Cancel selection')
  }

  render() {
    return (
      <div>
        <p>
          Selecting: <span className="counter">{this.state.selectingItems.length}</span>
          <br />
          Selected: <span className="counter">{this.state.selectedItems.length}</span>
        </p>
        <SelectableGroup
          className="main"
          clickClassName="tick"
          enableDeselect
          dontClearSelection
          tolerance={this.state.tolerance}
          globalMouse={this.state.isGlobal}
          allowClickWithoutSelected={false}
          duringSelection={this.handleSelecting}
          onSelectionClear={this.handleSelectionClear}
          onSelectionFinish={this.handleSelectionFinish}
          whiteList={['.not-selectable', '.item:nth-child(10)', '.item:nth-child(27)']}
        >
          <List items={this.props.items} />
        </SelectableGroup>
      </div>
    )
  }
}

export default App
