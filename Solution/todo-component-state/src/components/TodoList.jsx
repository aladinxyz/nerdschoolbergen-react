import React from 'react';
import Todo from "../models/Todo";
import TodoItem from "./TodoItem";
import PropTypes from 'prop-types';

class TodoList extends React.Component {
  render() {
    const { todoItems } = this.props;

    return (
      <div>
        {
          todoItems.map(todoItem => (
            <TodoItem
              key={todoItem.id}
              id={todoItem.id}
              description={todoItem.description}
              onDeleteClicked={this.props.onDeleteClicked}
            />
          ))
        }
      </div>
    );
  }
}

TodoList.propTypes = {
  todoItems: PropTypes.arrayOf(PropTypes.instanceOf(Todo)),
  onDeleteClicked: PropTypes.func
};

TodoList.defaultProps = {
  todoItems: []
};

export default TodoList;