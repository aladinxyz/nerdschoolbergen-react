# Exercise 3 -

Show me the code already!

Yes, sir! Coming right up, sir!

## In this exercise you will learn to:

- Create React components using classes that extends a React base class.
- Implement the various lifecycle hooks React exposes
- Create React components using pure functions
- Use Prop Types to be explicit about what data types and shape your component is expecting as _props_.

## Todo app references

Here's the spec for our todo app as discussed in the previous exercise, for reference.

![](../images/todo-app.png)

**Header**

* There will be an `h1` header for the name of this glorious app
* There will be a sub-header with slightly emphasized text stating how many total tasks there are and how many of those are completed.

**Adding a task**

* There will be a textbox where a user can enter the description of a task
* There will be an "Add" button which will add the task to the list of existing tasks/todos.

**Listing todos**

* There will be a list of todo items. Each todo item will consist of:
  * A checkbox with the description of the todo
  * An delete button which will remove the todo item permanently

![](../images/todo-app-components.png)

1. `App`. Will contain the header text and the sub-components.
1. `Summary`. Will contain the total number of tasks and show how many of those are completed.
1. `AddTodo`. Will contain the textbox and Add-button.
1. `TodoList`. Will contain the list for all todo items.
1. `TodoItem`. Will contain a checkbox that marks a task as In Progress or Done, and a Delete button.

## 3.1 - The `App` component

Now that we have a basic understanding of what we want to make, let's dive right in and get started on the `App` component.

:pencil2: Open `App.js` and remove all of its content.  
:pencil2: All React components must import React in order to run, so start by adding the line `import React from 'react'`.  
:pencil2: Let's assume we only need App as a pure component and add the following:  

```jsx
const App = () => (
  <div>
    <h1>My Todo App</h1>
  </div>
);
```

:pencil2: Then we need to finish up by exporting the component out of the module: `export default App`;

The header should now render to the screen.

Next, let's start on the list itself. For now, we'll work with dummy data.

## 3.2 - The `TodoList` component

:pencil2: For simplicity, start by copying all content in `App.js` and make a new file `TodoList.jsx` and paste the content in.  
:pencil2: Change the name of the component inside of `TodoList.jsx` from _App_ to _TodoList_.  
:pencil2: We know we'll need a list of todo items, so change the `TodoList` function to take in a `todoItems` props, using the _destruct_ syntax:

```jsx
const TodoList = ({ todoItems }) => (
  /* ... */
);
```

Next, we know we need to iterate over the items and write some details about each item.

:pencil2: Write a `map` function that iterates over the todo items:

```jsx
const TodoList = ({ todoItems }) => (
  <div>
    {todoItems.map(todoItem => (
      <TodoItem />
    ))}
  </div>
);
```

We'll worry about what to do with `todoItem` later.

:pencil2: The `TodoItem` component is not defined in this file yet, so add an import at the top: `import TodoItem from './TodoItem'`.  
:pencil2: While we're here, add the import-statement `import PropTypes from 'prop-types'` aswell.  

Next, we need to add `todoItems` to prop types.

:pencil2: After the TodoList component, add this block:  

```jsx
TodoList.propTypes = {
  todoItems: PropTypes.arrayOf(PropTypes.instanceOf(Todo)),
};
```

The above claims that the `todoItems` prop should always be an array of `Todo`-instances. What is an `Todo`-instance? It's not defined yet, but it'll be a data model representing an todo item. We could use `PropTypes.shape({ foo: 'foo' })` and defined the todo item as a plain object, but it's better to explore what PropTypes can do for us.

As you might've noticed, we didn't specify `.isRequired` at the end of the prop types declaration. After all, we could have no todo items in the list. Since we omitted `isRequired`, we must declare a `Component.defaultProps`-object.

:pencil2: Add the following:

```jsx
TodoList.defaultProps = {
  todoItems: [],
};
```

Now we are guaranteed to always have at least an empty array provided as `todoItems`.

We still need to declare what the `Todo` model is.

:pencil2: Add the import `import Todo from './Todo'`.  
:pencil2: Then create the file `Todo.js` with the content:

```jsx
class Todo {
  constructor(id, description) {
    this.id = id;
    this.description = description;
  }
}

export default Todo;
```

The content in `TodoList.js` should now look like this:

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';
import Todo from './Todo';

const TodoList = ({ todoItems }) => (
  <div>
    {todoItems.map(todoItem => (
      <TodoItem />
    ))}
  </div>
);

TodoList.defaultProps = {
  todoItems: [],
};

TodoList.propTypes = {
  todoItems: PropTypes.arrayOf(PropTypes.instanceOf(Todo)),
};

export default TodoList;
```
