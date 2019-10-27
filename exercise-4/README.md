# Exercise 4 - State
In the previous exercise, we setup the UI components of our React application - however it does not yet do much. We need some kind of way to handle the state of the application. 

## In this exercise you will learn:
- Adding and using component state
- Passing callback functions to components
- Modifying state

## Reminder: Todo app spec

Here's the spec for our todo app as discussed in the previous exercise, for reference.

![](../images/todo-app.png)


## 4.1 - Adding state to our application
We are going to keep track of our todo items in the application state. For now, we are going to keep the state of our todos in the `App`-component (`App.jsx`).

We will start by moving our `Todo`'s from the render method in `App.jsx` to the component state. In order to enable initial state, we need a `constructor` in our `App` component. In order to add a constructor, we need to convert the component from a pure component to a class component. 

:pencil2: Rewrite the pure component to a class component. 

Your class based component may look something like this:

```jsx

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div className="app">
        <h1>My Todo App</h1>
        <Summary todosCount={5} completedTodosCount={3} />
        <TodoList todoItems={[
          new Todo(1, 'Wake up'),
          new Todo(2, 'Do the dishes'),
          new Todo(3, 'Fold clothes'),
          new Todo(4, 'Browse Reddit')
        ]} />
    </div>);
  }
}
```

We will initialize our state in the constructor of the component. 

:pencil2: In the constructor of the component, add the following lines of code:
```js

constructor(props) {
  super(props);
  this.state = {
    todos: [
      new Todo(1, 'Wake up'),
      new Todo(2, 'Do the dishes'),
      new Todo(3, 'Fold clothes'),
      new Todo(4, 'Browse Reddit')
    ]
  }
}

```

We now have our `Todo` items stored in the `App` components state. The next step is to use these `Todo`s in our render method. 

:pencil2: Pass the `Todo`s in your `App` component state into the `TodoList` component. Check that the application still works. Try to change the text of the todos in your state.

## 4.2 - Changing state

We are going to implement the delete function for a todo. 
We want to have a callback function, which takes the ID of a todo, and removes it from our list of todos currently in our state. 

:bulb: Just as we are passing the `todoList` as props, we can send callback functions, which can modify our component state.

:pencil2: Create a function in the `App` component that takes the ID of a todo as the parameter, and removes it from the list currently in the state.

:bulb: As mention in the first assignment, we never assign component state directly. Instead, we replace the existing state with new state, using the `setState(..)` function. 

A delete function may look like this:

```jsx
onDeleteClicked(todoId) {
  const filteredTodos = this.state.todos.filter(x => x.id !== todoId);
  this.setState({ todos: filteredTodos });
}
```

:pencil2: Pass the function for deleting a `Todo` to the `TodoList` component. Remember to update the `PropTypes`.

Pass the function again (from your `props` inside the `TodoList` component), to a specific `TodoItem`. Assign the function to the delete button in the `TodoItem` 

Hint: You can create a new arrow function inside the `onClick`, which executes the delete function with the specific ID.
```jsx
<input type="button" value="Delete" onClick={() => onDeleteClicked(id)}/>
```

---

Hurray! You have added component state to your application, passed functions and data as props and used prop-types. Well done! 

For the next exercises, you will stand on your own two legs! If you have successfully implemented the delete functionality, then you should be well equipped to solve the next tasks, where we will continue with adding todos, toggling them and updating the status text. If you are unsure on how to move forward, ask an instructor.

## 4.3 - Adding new todos

:pencil2: Add functionality for adding todos. Add a text input field and a button for adding the todos to your component state. Create a separate component for the input field and the button (You can for instance call it `AddTodo.jsx`)


## 4.4 - Toggling todos

:pencil2: Add functionality for setting the finished status of a todo in your state. You will have to create an extra field in the `Todo` class to do so. Can you add some styling to the text of a todo if it is finished?

## 4.5 - Updating 

:pencil2: Update the summary component. Using the state in your application, show how many of the total todos are finished.

## 4.6 - Final touches

### Header

- There will be an `h1` header for the name of this glorious app
- There will be a sub-header with slightly emphasized text stating how many total tasks there are and how many of those are completed.
