import React from "react";
import PropTypes from "prop-types";
import'./todoItem.css';

const TodoItem = ({ description, id, onDeleteClicked }) => (
  <div className="todo-item__container">
      <div>
        <input type="checkbox" id={`todoItemCheckbox-${id}`}  />
        <label htmlFor={`todoItemCheckbox-${id}`}>{description}</label>
        <input type="button" value="Delete" onClick={() => onDeleteClicked(id)}/>
      </div>
  </div>
);

TodoItem.propTypes = {
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    onDeleteClicked: PropTypes.func.isRequired
};

export default TodoItem;