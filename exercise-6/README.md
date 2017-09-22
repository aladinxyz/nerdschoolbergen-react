# Exercise 6 - Completing the Todo app

## In this exercise you will learn to:

- Create more React components and modify Redux state

## Reminder: Todo app spec

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

## 6.1 - Remaining work

At this point we've made some React components, applied some styling, installed Redux, and applied all pieces of Redux with React. You should therefore have all the necessary tools to implement the remaining features.

Happy hacking!

:pencil2: Create the `AddTodo` React component. It should contain a textbox and a button. When the button is clicked, dispatch the `createTodo` action, sending in the text from the textbox as the description.  
:pencil2: Create an _action_ for _deleting an todo item_. In the `TodoItem` component, dispatch that action. Implement a new case in `todosReducer` that handles the delete action.  
:pencil2: Create a new `SummaryContainer` component and map the props `todosCount` and `completedTodosCount` to the Redux state. Use the new component in `App.jsx` instead of `<Summary />`.  
:pencil2: In `TodoItem`, apply styling so that checked items have a strikethrough effect. You probably need to expand the `Todo` model to make that work.  
