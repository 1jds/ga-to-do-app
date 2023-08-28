import { Component } from 'react'
import add_symbol from '../assets/add_symbol.svg'

class AddTodo extends Component {
  render() {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          value={this.props.message}
          onChange={this.props.handleTextInput}
          placeholder="Add a todo"
          type="text"
          onKeyDown={this.props.handleEnter}
        />
        <input
          style={{ margin: '0rem 0.5rem 0rem 1rem', height: '1.25rem', width: '1.25rem' }}
          checked={this.props.urgent}
          type="checkbox"
          id="urgent"
          name="importance"
          value="isUrgent"
          onChange={this.props.handleCheck}
        />
        <label style={{ cursor: 'pointer' }} htmlFor="urgent">
          Urgent
        </label>
        <button
          className="add-btn"
          onClick={this.props.handleAdd}
        >
          <img
            src={add_symbol}
            alt={'add task symbol'}
            style={{ height: '20px', margin: '0px' }}
          />
          <p style={{ margin: 0 }}>Add task</p>
        </button>
      </div>
    )
  }
}

export default AddTodo

//Icons taken from the Google icons library: https://fonts.google.com/icons
