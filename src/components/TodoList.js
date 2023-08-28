import React, { Component } from 'react'
import Todo from './Todo'
import AddTodo from './AddTodo'

class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showOnlyUrgent: false,
      idCount: 0,
      todosList: [],
      todosToRender: [],
      newTodo: {
        message: '',
        id: 0,
        urgent: false,
        completed: false,
      },
      searchStr: '',
    }
  }

  handleAdd = (e) => {
    // e.preventDefault() //Prevents page refresh on auto form submission; not needed because I deleted the form field, but good to remember
    if (this.state.newTodo.message) {
      if (this.state.newTodo.urgent) {
        this.setState({
          todosList: [this.state.newTodo, ...this.state.todosList],
        })
        this.setState({
          newTodo: {
            message: '',
            id: this.state.idCount + 1,
            urgent: false,
            completed: false,
          },
        })
      } else {
        this.setState({
          todosList: [...this.state.todosList, this.state.newTodo],
        })
        this.setState({
          newTodo: {
            message: '',
            id: this.state.idCount + 1,
            urgent: false,
            completed: false,
          },
        })
      }
    }
    this.setState({
      idCount: this.state.idCount + 1,
    })
  }

  handleEnter = (e) => {
    // console.log(e.key)
    if (e.key === 'Enter') {
      this.handleAdd()
    }
  }

  handleTextInput = (e) => {
    let { value } = e.target
    this.setState({
      newTodo: {
        ...this.state.newTodo,
        message: value,
      },
    })
  }

  handleCheck = (e) => {
    this.setState({
      newTodo: {
        ...this.state.newTodo,
        urgent: !this.state.newTodo.urgent,
      },
    })
  }

  handleClearAll = (e) => {
    let filterIDs = this.state.todosToRender.map((item) => {
      return item.props.id
    })
    // console.log(filterIDs)
    this.setState({
      todosList: this.state.todosList.filter((item) => {
        if (!filterIDs.includes(item.id)) {
          return item
        }
      }),
    })
    this.setState({
      searchStr: '',
    })
  }

  handleClearFirst = (e) => {
    let filterID = [this.state.todosToRender[0].props.id]
    // console.log(this.state.todosToRender[0].props.id);
    this.setState({
      todosList: this.state.todosList.filter((item) => {
        if (!filterID.includes(item.id)) {
          return item
        }
      }),
    })
    this.setState({
      searchStr: '',
    })
  }

  handleShowOnlyUrgent = (e) => {
    this.setState({
      showOnlyUrgent: !this.state.showOnlyUrgent,
    })
  }

  handleSearch = (e) => {
    let { value: searchString } = e.target
    this.setState({
      searchStr: searchString,
    })
  }

  handleCompleted = (idParam) => {
    this.setState({
      todosList: this.state.todosList.map((item) => {
        if (item.id === idParam) {
          item.completed = !item.completed
          return item
        } else {
          return item
        }
      }),
    })
  }

  handleClearCompleted = () => {
    this.setState({
      todosList: this.state.todosList.filter((item) => !item.completed),
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.showOnlyUrgent !== this.state.showOnlyUrgent ||
      prevState.todosList.length !== this.state.todosList.length ||
      prevState.todosList !== this.state.todosList
    ) {
      if (this.state.showOnlyUrgent) {
        this.setState({
          todosToRender: this.state.todosList
            .filter((item) => item.urgent && !item.completed)
            .map((item, index) => {
              return (
                <Todo
                  key={`${item}${index}`}
                  message={item.message}
                  urgent={item.urgent}
                  id={item.id}
                  completed={item.completed}
                  handleCompleted={this.handleCompleted}
                />
              )
            }),
        })
      } else {
        this.setState({
          todosToRender: this.state.todosList.map((item, index) => {
            return (
              <Todo
                key={`${item}${index}`}
                message={item.message}
                urgent={item.urgent}
                id={item.id}
                completed={item.completed}
                handleCompleted={this.handleCompleted}
              />
            )
          }),
        })
      }
    } else if (prevState.searchStr !== this.state.searchStr) {
      this.setState({
        todosToRender: this.state.todosList
          .filter((item) =>
            item.message
              .toLowerCase()
              .includes(this.state.searchStr.toLowerCase())
          )
          .map((item, index) => {
            return (
              <Todo
                key={`${item}${index}`}
                message={item.message}
                urgent={item.urgent}
                id={item.id}
                completed={item.completed}
                handleCompleted={this.handleCompleted}
              />
            )
          }),
      })
    }
  }

  render() {
    return (
      <main className="page-wrapper">
        <h1>TO DO LIST</h1>
        <section className="controls-section">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <AddTodo
              message={this.state.newTodo.message}
              handleTextInput={this.handleTextInput}
              urgent={this.state.newTodo.urgent}
              handleEnter={this.handleEnter}
              handleCheck={this.handleCheck}
              handleAdd={this.handleAdd}
            />
          </div>
          <div>
            <button onClick={this.handleClearAll}>Clear All</button>
            <button onClick={this.handleClearFirst}>Clear First</button>
            <button onClick={this.handleClearCompleted}>Clear Completed</button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button
              className={this.state.showOnlyUrgent && 'urgent-button'}
              onClick={this.handleShowOnlyUrgent}
            >
              {this.state.showOnlyUrgent ? 'Show All' : 'Show only Urgent'}
            </button>
            <input
              className='search-input'
              value={this.state.searchStr}
              onChange={this.handleSearch}
              type="text"
              placeholder="Search"
            />
          </div>
        </section>
        {this.state.todosList.length === 0 ? (
          <p style={{ marginLeft: '10px' }}>Add a task...</p>
        ) : (
          this.state.todosToRender
        )}
      </main>
    )
  }
}

export default TodoList
