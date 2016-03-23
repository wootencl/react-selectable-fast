import React from 'react'
import autobind from 'autobind-decorator'
import { SelectableGroup } from 'react-selectable-extended'
import List from './List'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedItems: [],
      selectingItems: [],
      tolerance: 0,
      distance: 0,
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

  handleSelectionStart() {
    console.log(`Started selection`)
  }

  handleSelectionClear() {
    console.log('Cancel selection')
  }

  handleSelectionClick(selectedItems, clickedItem) {
    console.log(`Clicked: ${clickedItem} in ${selectedItems.length}`)
  }

  render() {
    return (
      <div>
        <h1>React Selectable Fast Demo</h1>
        <p>Selecting: <span className="counter">{this.state.selectingItems.length}</span></p>
        <p>Selected: <span className="counter">{this.state.selectedItems.length}</span></p>
        <SelectableGroup
          className="main"
          clickClassName="tick"
          onSelectionClick={this.handleSelectionClick}
          onSelectionStart={this.handleSelectionStart}
          duringSelection={this.handleSelecting}
          onSelectionFinish={this.handleSelectionFinish}
          onSelectionClear={this.handleSelectionClear}
          tolerance={this.state.tolerance}
          globalMouse={this.state.isGlobal}
          distance={this.state.distance}
          whiteList={['.not-selectable']}
          allowClickWithoutSelected={false}
          dontClearSelection
        >
          <List items={this.props.items} />
        </SelectableGroup>
      </div>
    )
  }
}

export default App
