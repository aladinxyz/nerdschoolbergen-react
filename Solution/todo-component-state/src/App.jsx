import React from 'react';
import Summary from './components/Summary';
import Todo from "./models/Todo";
import TodoList from './components/TodoList';
import './app.css';
import NewTodo from './components/NewTodo';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.onDeleteClicked = this.onDeleteClicked.bind(this);
    this.onTodoAdded = this.onTodoAdded.bind(this);

    this.state = {
      todos: [
        new Todo(1, "Wake up"),
        new Todo(2, "Do the dishes"),
        new Todo(3, "Fold clothes"),
        new Todo(4, "Browse Reddit")
      ]
    }
  }

  onDeleteClicked(todoId) {
    const filteredTodos = this.state.todos.filter(x => x.id !== todoId);
    this.setState({ todos: filteredTodos });
  }

  onTodoAdded(todoName) {
    // The following lines are just to get a new ID for the todo based
    // on the number of todos currently in the component state

    var ids = this.state.todos.map(x => x.id);
    const todoId = ids.length === 0 ? 0 : Math.max(...ids) + 1;
    const todo = new Todo(todoId, todoName);
    this.setState({ todos: [todo, ...this.state.todos] });
  }

  render() {
    return (
      <div className="app">
        <h1>My Todo App</h1>
        <NewTodo onAddTodo={this.onTodoAdded} />
        <Summary todosCount={5} completedTodosCount={2} />
        <TodoList todoItems={this.state.todos} onDeleteClicked={this.onDeleteClicked} />
      </div>
    );
  }
}

export default App;