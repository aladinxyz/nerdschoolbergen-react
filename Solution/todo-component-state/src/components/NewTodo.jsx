import React from 'react';
import PropTypes from 'prop-types';

class NewTodo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      todoName: ''
    }
    this.onTodoNameChanged = this.onTodoNameChanged.bind(this);
  }

  onTodoNameChanged(e) {
    this.setState({ todoName: e.target.value });
  }

  render() {
    return (
      <div>
        <input type="text" onChange={this.onTodoNameChanged} value={this.state.todoName} />
        <button onClick={() => this.props.onAddTodo(this.state.todoName)}>Add todo</button>
      </div>
    );
  }
}

NewTodo.propTypes = {
  onAddTodo: PropTypes.func.isRequired
};

export default NewTodo;