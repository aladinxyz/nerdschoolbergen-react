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
