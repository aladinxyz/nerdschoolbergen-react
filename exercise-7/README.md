# Exercise 7 - Completing the Todo app

## In this exercise you will learn to:

- Create more React components and modify Redux state

## 6.1 - Remaining work

At this point we've made some React components, applied some styl
![](../images/todo-app-components.png)

1. `App`. Will contain the header text and the sub-components.
1. `Summary`. Will contain the total number of tasks and show how many of those are completed.
1. `AddTodo`. Will contain the textbox and Add-button.
1. `TodoList`. Will contain the list for all todo items.
1. `TodoItem`. Will contain a checkbox that marks a task as In Progress or Done, and a Delete button.

Happy hacking!

:pencil2: Edit you `AddTodo` React component. When the button is clicked, dispatch the `createTodo` action, sending in the text from the textbox as the description - replacing the callback function you passed to the component in exercise 4.

:pencil2: Create an _action_ for _deleting an todo item_. In the `TodoItem` component, dispatch that action. Implement a new case in `todosReducer` that handles the delete action. Replace the callback function that you passed in exercise 4 with the new action.

:pencil2: Create a new `SummaryContainer` component and map the props `todosCount` and `completedTodosCount` to the Redux state. Use the new component in `App.jsx` instead of `<Summary />`.  