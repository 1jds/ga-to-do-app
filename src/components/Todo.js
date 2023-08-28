import { Component } from 'react'
import check_box_box from '../assets/check_box_box.svg'
import check_box_checked from '../assets/check_box_checked.svg'

class Todo extends Component {
  render() {
    // console.log("Hey!:", this.props)
    let styling = this.props.completed
      ? {
          textDecoration: 'line-through',
        }
      : {}
    let colorStyling = this.props.completed
      ? {
          backgroundColor: '#278300',
        }
      : this.props.urgent
      ? {
          backgroundColor: '#FF4800',
        }
      : {
          backgroundColor: '#797654',
        }
    return (
      <div className="todo-item">
        <img
          src={this.props.completed ? check_box_checked : check_box_box}
          className="check-box-svg"
          alt="mark as completed"
          onClick={() => this.props.handleCompleted(this.props.id)}
        />
        <p style={styling}>{this.props.message}</p>
        <div className="status-div" style={colorStyling}>
          {this.props.completed
            ? 'Resolved'
            : this.props.urgent
            ? 'Urgent'
            : 'Non-Urgent'}
        </div>
      </div>
    )
  }
}

export default Todo
